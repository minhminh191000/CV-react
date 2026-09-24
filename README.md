<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nguyen Van Minh — Portfolio (React + Vite)

Trang CV cá nhân, build bằng Vite, chạy production bằng Docker (nginx) và public ra Internet qua Cloudflare Tunnel (`cloudflared`).

---

## 1. Chạy local (dev)

**Yêu cầu:** Node.js 20+

```bash
npm install
npm run dev          # http://localhost:3000
```

---

## 2. Chạy bằng Docker (production)

Image dùng multi-stage build: `node:22-alpine` build ra `dist/`, rồi `nginx:1.27-alpine` phục vụ file tĩnh.

```bash
cp .env.example .env     # chỉnh lại nếu cần
docker compose up -d --build web
curl http://localhost:8080/healthz    # -> ok
```

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `WEB_PORT` | `8080` | Cổng publish ra host (chỉ cần khi cloudflared chạy ngoài Docker) |
| `TUNNEL_TOKEN` | — | Token Cloudflare Tunnel, dùng cho profile `tunnel` |
| `GEMINI_API_KEY` | — | Vite inline lúc build (hiện code chưa dùng, để trống được) |

Build lại sau khi sửa code:

```bash
docker compose up -d --build web
```

---

## 3. Nối Docker với Cloudflare Tunnel

Có 3 cách, chọn **một** cách phù hợp với `cloudflared` đang có.

### Cách A — cloudflared chạy trong Docker, dùng token (khuyến nghị)

Tunnel được quản lý trên dashboard Zero Trust.

1. Vào **Cloudflare Zero Trust → Networks → Tunnels →** chọn tunnel → **Configure** → copy token.
2. Bỏ token vào `.env`:

   ```env
   TUNNEL_TOKEN=eyJhIjoi...
   ```

3. Trong tab **Public Hostname** của tunnel, trỏ:

   | Subdomain | Domain | Type | URL |
   |---|---|---|---|
   | *(trống)* | `migor.site` | HTTP | `web:80` |
   | `www` | `migor.site` | HTTP | `web:80` |

   `web` là **tên service** trong `docker-compose.yml`; Docker DNS trong network `cvnet` tự phân giải thành IP container, nên không cần mở port ra host.

4. Chạy cả 2 service:

   ```bash
   docker compose --profile tunnel up -d --build
   docker compose logs -f cloudflared
   ```

   Log báo `Registered tunnel connection` là đã nối xong.

> Khi dùng cách này có thể xoá block `ports:` của service `web` trong `docker-compose.yml` để container không lộ ra ngoài — traffic chỉ đi qua tunnel.

### Cách B — cloudflared chạy trong Docker, dùng file config

Dành cho tunnel quản lý bằng CLI (`cloudflared tunnel create`).

```bash
cp cloudflared/config.example.yml cloudflared/config.yml
# sửa <TUNNEL_ID> trong config.yml
cp ~/.cloudflared/<TUNNEL_ID>.json cloudflared/
docker compose --profile tunnel-config up -d --build
```

`config.yml` đã trỏ sẵn `migor.site` và `www.migor.site` về `http://web:80`.

### Cách C — cloudflared đã cài sẵn trên host (systemd)

Nếu `cloudflared` đang chạy như service trên máy chủ thì không cần đụng vào nó, chỉ cần đổi ingress từ vite dev server (`localhost:3000`) sang container nginx:

```yaml
# /etc/cloudflared/config.yml
ingress:
  - hostname: migor.site
    service: http://localhost:8080
  - hostname: www.migor.site
    service: http://localhost:8080
  - service: http_status:404
```

```bash
docker compose up -d --build web          # container listen 8080 trên host
sudo systemctl restart cloudflared
```

---

## 4. Kiểm tra sau khi nối

```bash
docker compose ps                       # web phải ở trạng thái healthy
curl -I http://localhost:8080/          # 200 OK (cách C, hoặc khi còn mở ports)
curl -I https://migor.site/healthz      # 200 OK qua Cloudflare
docker compose logs -f cloudflared
```

Lỗi hay gặp:

| Triệu chứng | Nguyên nhân |
|---|---|
| Cloudflare trả **502/1033** | Ingress trỏ sai. Trong Docker phải là `http://web:80`, không phải `localhost:8080` (localhost trong container cloudflared là chính nó). |
| Tunnel không lên, log `token is invalid` | `TUNNEL_TOKEN` trong `.env` sai hoặc chưa set. |
| Đổi code nhưng web không đổi | Phải build lại image: `docker compose up -d --build web`. |
| `cloudflared` không thấy `web` | Hai container không chung network `cvnet`. |

---

## 5. Cấu trúc file liên quan

```
Dockerfile                    # multi-stage build -> nginx
nginx.conf                    # SPA fallback, gzip, cache, /healthz, real IP từ Cloudflare
docker-compose.yml            # service web + cloudflared (profiles: tunnel, tunnel-config)
.dockerignore
.env.example
cloudflared/config.example.yml
```

`.env`, `cloudflared/config.yml`, `cloudflared/*.json` và `cert.pem` đã được đưa vào `.gitignore` — **không commit token hay credentials**.
