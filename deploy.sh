#!/usr/bin/env bash
#
# Deploy CV lên cv.migor.site: build container nginx rồi nối vào
# cloudflared đang chạy systemd trên host.
#
#   ./deploy.sh                 # build + chạy container, in ra cấu hình cần thêm
#   sudo ./deploy.sh --tunnel   # làm luôn cả phần cloudflared (ingress + DNS + restart)
#
set -euo pipefail

DOMAIN="${DOMAIN:-cv.migor.site}"
WEB_PORT="${WEB_PORT:-8080}"
CF_CONFIG="${CF_CONFIG:-/etc/cloudflared/config.yml}"
CF_SERVICE="${CF_SERVICE:-cloudflared}"
WRITE_TUNNEL=0

RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; BLD=$'\033[1m'; RST=$'\033[0m'
info() { printf '%s==>%s %s\n' "$BLD" "$RST" "$*"; }
ok()   { printf '%s  ok%s %s\n' "$GRN" "$RST" "$*"; }
warn() { printf '%s  !!%s %s\n' "$YEL" "$RST" "$*"; }
die()  { printf '%s  xx%s %s\n' "$RED" "$RST" "$*" >&2; exit 1; }

# Tìm origin cert (cert.pem) — `cloudflared tunnel route dns` bắt buộc phải có.
# Chạy qua sudo thì HOME là /root nên cloudflared không thấy cert nằm ở home user.
find_origin_cert() {
    local c
    for c in \
        "${TUNNEL_ORIGIN_CERT:-}" \
        "/etc/cloudflared/cert.pem" \
        "/root/.cloudflared/cert.pem" \
        "${SUDO_USER:+/home/${SUDO_USER}/.cloudflared/cert.pem}" \
        /home/*/.cloudflared/cert.pem
    do
        if [ -n "$c" ] && [ -f "$c" ]; then
            printf '%s' "$c"
            return 0
        fi
    done
    return 1
}

# In hướng dẫn tạo DNS record bằng tay khi cloudflared không tự làm được
dns_manual_hint() {
    cat <<EOF

  Tạo DNS record bằng tay: Cloudflare Dashboard > ${DOMAIN#*.} > DNS > Add record

      Type:   CNAME
      Name:   ${DOMAIN%%.*}
      Target: ${TUNNEL_REF:-<TUNNEL_ID>}.cfargotunnel.com
      Proxy:  Proxied (đám mây màu cam)

  Hoặc lấy origin cert rồi chạy lại script:

      cloudflared tunnel login          # KHÔNG dùng sudo, cert lưu vào ~/.cloudflared/cert.pem
      sudo ./deploy.sh --tunnel

EOF
}

usage() {
    sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'
    cat <<EOF

Tuỳ chọn:
  --tunnel            Ghi ingress vào $CF_CONFIG, tạo DNS record, restart $CF_SERVICE (cần sudo)
  --domain <host>     Domain cần public (mặc định: $DOMAIN)
  --port <port>       Cổng container listen trên host (mặc định: $WEB_PORT)
  --config <path>     Đường dẫn config cloudflared (mặc định: $CF_CONFIG)
  -h, --help          Hiện trợ giúp
EOF
}

while [ $# -gt 0 ]; do
    case "$1" in
        --tunnel)  WRITE_TUNNEL=1; shift ;;
        --domain)  DOMAIN="${2:?thiếu giá trị cho --domain}"; shift 2 ;;
        --port)    WEB_PORT="${2:?thiếu giá trị cho --port}"; shift 2 ;;
        --config)  CF_CONFIG="${2:?thiếu giá trị cho --config}"; shift 2 ;;
        -h|--help) usage; exit 0 ;;
        *)         die "tham số lạ: $1 (dùng --help)" ;;
    esac
done

cd "$(dirname "$0")"

# ---------------------------------------------------------------------
# 0. Kiểm tra điều kiện trước khi build (fail sớm, khỏi mất công)
# ---------------------------------------------------------------------
command -v docker >/dev/null || die "chưa cài docker"

if [ "$WRITE_TUNNEL" -eq 1 ]; then
    [ "$(id -u)" -eq 0 ] || die "--tunnel cần quyền root, chạy: sudo ./deploy.sh --tunnel"
    command -v cloudflared >/dev/null || die "không tìm thấy lệnh cloudflared trên host"
    command -v python3 >/dev/null || die "cần python3 để sửa config an toàn (hoặc sửa tay, xem README mục 3)"
    python3 -c 'import yaml' 2>/dev/null \
        || die "thiếu module pyyaml: apt install python3-yaml (hoặc sửa tay, xem README mục 3)"

    if [ ! -f "$CF_CONFIG" ]; then
        cat <<EOF >&2

Không thấy ${CF_CONFIG}.

Nếu service cloudflared đang chạy bằng TOKEN (tunnel quản lý trên dashboard)
thì ingress nằm trên Zero Trust > Networks > Tunnels > Public Hostname chứ
không có file config. Thêm public hostname ở đó:

  Subdomain: ${DOMAIN%%.*}   Domain: ${DOMAIN#*.}   Type: HTTP   URL: localhost:${WEB_PORT}

Xem service đang chạy kiểu gì:  systemctl cat ${CF_SERVICE}
Hoặc chỉ định config khác:      sudo ./deploy.sh --tunnel --config /duong/dan/config.yml
EOF
        exit 1
    fi
    ok "đủ điều kiện nối tunnel (root, cloudflared, $CF_CONFIG)"
fi

# ---------------------------------------------------------------------
# 1. Build và chạy container
# ---------------------------------------------------------------------
info "Build image và khởi động container (port $WEB_PORT)"
WEB_PORT="$WEB_PORT" docker compose up -d --build web

info "Chờ container healthy"
for i in $(seq 1 30); do
    if curl -fsS --max-time 2 "http://127.0.0.1:${WEB_PORT}/healthz" >/dev/null 2>&1; then
        ok "nginx trả lời tại http://127.0.0.1:${WEB_PORT}/healthz"
        break
    fi
    [ "$i" -eq 30 ] && {
        docker compose logs --tail 30 web || true
        die "container không lên sau 30s"
    }
    sleep 1
done

INGRESS_SNIPPET="ingress:
  - hostname: ${DOMAIN}
    service: http://localhost:${WEB_PORT}
  - service: http_status:404"

# ---------------------------------------------------------------------
# 2. Nối vào cloudflared
# ---------------------------------------------------------------------
if [ "$WRITE_TUNNEL" -eq 0 ]; then
    cat <<EOF

Container đã chạy. Phần cloudflared làm nốt bằng:

  sudo ./deploy.sh --tunnel

hoặc tự sửa ${CF_CONFIG}:

${INGRESS_SNIPPET}

rồi: sudo cloudflared tunnel route dns <TUNNEL_NAME> ${DOMAIN}
     sudo systemctl restart ${CF_SERVICE}
EOF
    exit 0
fi

info "Cập nhật ingress trong $CF_CONFIG"
BACKUP="${CF_CONFIG}.bak.$(date +%Y%m%d-%H%M%S)"
cp -a "$CF_CONFIG" "$BACKUP"
ok "đã backup -> $BACKUP"

DOMAIN="$DOMAIN" WEB_PORT="$WEB_PORT" CF_CONFIG="$CF_CONFIG" python3 <<'PY'
import os, sys
try:
    import yaml
except ImportError:
    sys.exit("thiếu module pyyaml: apt install python3-yaml (hoặc pip install pyyaml)")

path, domain, port = os.environ["CF_CONFIG"], os.environ["DOMAIN"], os.environ["WEB_PORT"]
cfg = yaml.safe_load(open(path)) or {}
if not isinstance(cfg, dict):
    sys.exit(f"{path} không phải YAML dạng mapping, không dám sửa tự động")

rule = {"hostname": domain, "service": f"http://localhost:{port}"}
# Giữ nguyên các hostname khác đang phục vụ, chỉ thay rule của domain này
ingress = [r for r in (cfg.get("ingress") or [])
           if isinstance(r, dict) and r.get("hostname") and r["hostname"] != domain]
ingress.append(rule)
ingress.append({"service": "http_status:404"})
cfg["ingress"] = ingress

with open(path, "w") as f:
    yaml.safe_dump(cfg, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
print(f"  ok ingress: {domain} -> http://localhost:{port}")
PY

info "Validate config"
if ! cloudflared tunnel --config "$CF_CONFIG" ingress validate; then
    cp -a "$BACKUP" "$CF_CONFIG"
    die "config không hợp lệ, đã khôi phục từ $BACKUP"
fi
ok "config hợp lệ"

info "Kiểm tra rule khớp domain"
cloudflared tunnel --config "$CF_CONFIG" ingress rule "https://${DOMAIN}" || true

TUNNEL_REF="$(CF_CONFIG="$CF_CONFIG" python3 -c "
import yaml, os
print((yaml.safe_load(open(os.environ['CF_CONFIG'])) or {}).get('tunnel', '') or '')
" 2>/dev/null || true)"

if [ -z "$TUNNEL_REF" ]; then
    warn "không đọc được tunnel id trong $CF_CONFIG, bỏ qua bước tạo DNS"
    DNS_READY=0
else
    info "Tạo DNS record cho $DOMAIN (tunnel: $TUNNEL_REF)"
    DNS_READY=0
    if ORIGIN_CERT="$(find_origin_cert)"; then
        ok "origin cert: $ORIGIN_CERT"
        if DNS_LOG="$(TUNNEL_ORIGIN_CERT="$ORIGIN_CERT" cloudflared tunnel route dns "$TUNNEL_REF" "$DOMAIN" 2>&1)"; then
            ok "DNS record đã sẵn sàng"
            DNS_READY=1
        elif printf '%s' "$DNS_LOG" | grep -qiE 'already exists|record with that host|already configured'; then
            ok "DNS record đã tồn tại từ trước"
            DNS_READY=1
        else
            printf '%s\n' "$DNS_LOG" | sed 's/^/     /'
            warn "cloudflared không tạo được DNS record"
            dns_manual_hint
        fi
    else
        warn "không tìm thấy cert.pem, cloudflared không tự tạo DNS record được"
        dns_manual_hint
    fi
fi

info "Restart $CF_SERVICE"
systemctl restart "$CF_SERVICE"
sleep 3
systemctl is-active --quiet "$CF_SERVICE" || {
    journalctl -u "$CF_SERVICE" -n 30 --no-pager || true
    die "$CF_SERVICE không chạy sau khi restart"
}
ok "$CF_SERVICE đang chạy"

# ---------------------------------------------------------------------
# 3. Kiểm tra đầu cuối
# ---------------------------------------------------------------------
info "Kiểm tra qua Cloudflare: https://${DOMAIN}/healthz"
for i in $(seq 1 12); do
    CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "https://${DOMAIN}/healthz" 2>/dev/null || true)"
    [ -n "$CODE" ] || CODE=000
    if [ "$CODE" = "200" ]; then
        printf '\n%s Xong. CV đã online tại https://%s%s\n' "$GRN$BLD" "$DOMAIN" "$RST"
        exit 0
    fi
    sleep 5
done

if [ "${DNS_READY:-0}" -eq 1 ]; then
    warn "https://${DOMAIN}/healthz trả về $CODE (DNS có thể cần vài phút để lan)"
    warn "xem log: journalctl -u ${CF_SERVICE} -f"
else
    warn "https://${DOMAIN}/healthz trả về $CODE — DNS record chưa được tạo (xem hướng dẫn bên trên)"
    dns_manual_hint
fi
exit 1
