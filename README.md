<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nguyen Van Minh — Portfolio (React + Vite)

Trang CV cá nhân. Production chạy trong Docker (nginx phục vụ bản build tĩnh) và public ra Internet qua Cloudflare Tunnel tại **https://cv.migor.site**.

```
Internet ──► Cloudflare ──► cloudflared (systemd, trên host)
                                 │  ingress: cv.migor.site
                                 ▼
                          127.0.0.1:8080  ──►  container cv-web (nginx :80)
```

Container chỉ bind vào `127.0.0.1`, nên ngoài tunnel ra không ai chạm tới được.

---

## 1. Chạy local (dev)

**Yêu cầu:** Node.js 20+

```bash
npm install
npm run dev          # http://localhost:3000
```

---

## 2. Deploy lên cv.migor.site

Trên máy chủ (nơi `cloudflared` đang chạy bằng systemd):

```bash
git clone https://github.com/minhminh191000/CV-react.git
cd CV-react
sudo ./deploy.sh --tunnel
```

Script làm tuần tự:

1. `docker compose up -d --build web` — build image, chạy container, chờ healthcheck xanh.
2. Backup `/etc/cloudflared/config.yml` thành `.bak.<timestamp>`.
3. Thêm/ghi đè **đúng một** rule `cv.migor.site → http://localhost:8080` vào `ingress`, **giữ nguyên các hostname khác** đang chạy trên cùng tunnel, và luôn đẩy `http_status:404` xuống cuối.
4. `cloudflared tunnel ingress validate` — sai thì tự khôi phục từ backup rồi dừng.
5. `cloudflared tunnel route dns <TUNNEL_ID> cv.migor.site` — tạo DNS record (bỏ qua nếu đã có).
6. `systemctl restart cloudflared` và kiểm tra service còn sống.
7. Poll `https://cv.migor.site/healthz` tới khi trả `200`.

Chạy không có `--tunnel` thì script chỉ build + chạy container rồi in ra đoạn config cần thêm, không đụng gì vào hệ thống.

**Tuỳ chọn:**

```bash
sudo ./deploy.sh --tunnel --port 9090            # đổi cổng trên host
sudo ./deploy.sh --tunnel --domain cv2.migor.site
sudo ./deploy.sh --tunnel --config /etc/cloudflared/cv.yml
```

### Cập nhật code về sau

```bash
git pull
sudo ./deploy.sh          # build lại container, không cần đụng cloudflared nữa
```

---

## 3. Làm tay (nếu không dùng script)

```bash
docker compose up -d --build web
curl http://127.0.0.1:8080/healthz          # -> ok
```

Sửa `/etc/cloudflared/config.yml`:

```yaml
ingress:
  # ... các hostname khác giữ nguyên ...
  - hostname: cv.migor.site
    service: http://localhost:8080
  - service: http_status:404      # luôn là rule cuối cùng
```

```bash
sudo cloudflared tunnel ingress validate
sudo cloudflared tunnel route dns <TUNNEL_NAME> cv.migor.site
sudo systemctl restart cloudflared
curl -I https://cv.migor.site/healthz       # -> 200
```

Mẫu config đầy đủ: [`cloudflared/config.example.yml`](cloudflared/config.example.yml).

---

## 4. Biến môi trường

Copy `.env.example` thành `.env` nếu cần đổi mặc định:

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `WEB_PORT` | `8080` | Cổng container bind trên `127.0.0.1` của host |
| `GEMINI_API_KEY` | — | Vite inline lúc build (hiện code chưa dùng, để trống được) |

---

## 5. Vận hành

```bash
docker compose ps                     # cv-web phải là healthy
docker compose logs -f web            # log nginx (đã lấy IP thật từ CF-Connecting-IP)
journalctl -u cloudflared -f          # log tunnel
docker compose down                   # tắt site
```

Lỗi hay gặp:

| Triệu chứng | Nguyên nhân |
|---|---|
| Cloudflare trả **502 / 1033** | Container chưa chạy hoặc sai cổng. Kiểm tra `curl http://127.0.0.1:8080/healthz` trên host. |
| **1016** hoặc không phân giải được DNS | Chưa có record `cv`. Chạy `cloudflared tunnel route dns <TUNNEL_NAME> cv.migor.site`. |
| Cloudflare trả **404** | Rule `cv.migor.site` nằm **sau** `http_status:404` trong `ingress`. Catch-all phải ở cuối. |
| Hostname khác trên tunnel chết theo | Khôi phục: `sudo cp /etc/cloudflared/config.yml.bak.<timestamp> /etc/cloudflared/config.yml && sudo systemctl restart cloudflared` |
| Sửa code nhưng web không đổi | Phải build lại image: `./deploy.sh` hoặc `docker compose up -d --build web`. |

---

## 6. Cấu trúc file deploy

```
deploy.sh                     # build container + nối vào cloudflared trên host
Dockerfile                    # multi-stage: node build -> nginx serve
nginx.conf                    # SPA fallback, gzip, cache, /healthz, real IP từ Cloudflare
docker-compose.yml            # service web, bind 127.0.0.1:8080
.env.example
cloudflared/config.example.yml
```

`.env` và credentials tunnel đã nằm trong `.gitignore` — **không commit token**.
