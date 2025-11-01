# Hướng Dẫn Deploy GitHub Pages

## Bước 1: Cấu hình GitHub Pages

1. Truy cập repository trên GitHub
2. Vào **Settings** → **Pages** (menu bên trái)
3. Trong phần **Build and deployment**:
   - **Source**: Chọn **GitHub Actions** (không chọn "Deploy from a branch")
4. Lưu lại

## Bước 2: Push Code lên GitHub

```bash
git add .
git commit -m "Setup GitHub Pages deployment with Actions"
git push origin main
```

## Bước 3: Kiểm tra Deployment

1. Vào tab **Actions** trên GitHub
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Đợi cả 2 jobs hoàn thành:
   - ✅ build
   - ✅ deploy

## Bước 4: Truy cập Website

- **Project site**: `https://thanhnguyen0901.github.io/Wedding-Invitation/`
- **User site** (nếu repo là `<username>.github.io`): `https://thanhnguyen0901.github.io/`

## Troubleshooting

### Workflow không chạy?
- Kiểm tra Settings → Pages → Source = **GitHub Actions**
- Đảm bảo branch là `main` (không phải `master`)

### CSS/JS không load?
- Mở DevTools (F12) → Console/Network tab
- Kiểm tra đường dẫn có đúng không
- Tất cả assets phải dùng đường dẫn tương đối `./assets/...`

### Cập nhật CSS/JS mới không hiển thị?
- Tăng version trong `src/index.html`:
  ```html
  <link rel="stylesheet" href="./assets/css/style.css?v=2">
  <script src="./assets/js/main.js?v=2"></script>
  ```

## Custom Domain (Optional)

Nếu muốn dùng domain riêng:

1. Tạo file `src/CNAME` với nội dung:
   ```
   your-domain.com
   ```

2. Cấu hình DNS tại nhà cung cấp domain:
   ```
   Type: CNAME
   Name: www (hoặc @)
   Value: thanhnguyen0901.github.io
   ```

3. Trong Settings → Pages → Custom domain: nhập domain và Save
