# Như Quỳnh — Graphic Design Portfolio

Portfolio cá nhân của **Phạm Vũ Như Quỳnh**, sinh viên Đại học Duy Tân. HTML/CSS/JavaScript thuần, không cần cài thư viện; chạy bằng Node.js 18 trở lên.

## Chạy và build

```sh
npm run dev
# http://localhost:5174
npm run check
npm run build
```

Upload nội dung `dist/` lên hosting tĩnh, cPanel, Netlify, Vercel hoặc Cloudflare Pages. Không cần backend. Đường dẫn tài nguyên tương đối, dùng được khi đặt trong thư mục con. Font Be Vietnam Pro tải từ Google Fonts, có Arial dự phòng.

## Ảnh tác phẩm trên Google Drive

- Toàn bộ **16 tác phẩm** được khai báo trong `projects.js`; không chép tệp tác phẩm vào repo.
- Hiển thị bằng `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200`; ảnh lớn dùng `w2000`.
- Nếu ảnh lỗi, thử nguồn ảnh Google `lh3.googleusercontent.com/d/FILE_ID=w1200`. Nếu vẫn lỗi, hiện thông báo và nút mở bản gốc trên Drive.
- Mỗi tệp phải cho phép **Bất kỳ ai có đường liên kết → Người xem**. Website không thay đổi quyền Drive và không dùng API key/token.
- Drive có thể giới hạn tải hoặc đổi cách phục vụ ảnh. Nút mở bản gốc luôn được giữ; thumbnail không bảo đảm độ phân giải nguyên gốc. Có thể đổi `imageUrl` sang CDN sau nếu cần.
- Danh sách là snapshot 16 tệp đã được cung cấp, không tự đồng bộ khi thêm/xóa tệp trong Drive. Thêm mục mới vào `projects` để cập nhật.
- Một số tên hiển thị được rút gọn từ tên tệp; các tệp không rõ thể loại nằm trong nhóm `Khác`. Có thể sửa `title`, `category`, `tone` ngay trong dữ liệu.
- Ảnh chân dung do người dùng tải lên, chưa có ID Drive, nên lưu bản WebP khoảng 116 KB tại `assets/nhu-quynh.webp`. Thay hai đường dẫn chân dung trong `index.html` nếu muốn dùng link Drive.

## Chỉnh sửa nội dung

- `projects.js`: tên, thể loại, ID ảnh, và thông tin liên hệ đã xác minh trong `contacts`. Email/Behance/Instagram chưa cung cấp nên không tạo liên kết giả.
- `index.html`: thông tin giới thiệu, SEO, cấu trúc các phần.
- `styles.css`: bảng màu than chì `#1e1e1c`, đỏ trầm `#ad4438`, vàng dịu `#c2a051`, chữ kem `#f0e9d9`.
- `app.js`: bộ lọc, xem ảnh lớn, phím trái/phải/Escape, menu mobile và chuyển động.

## Chuyển động theo video tham chiếu

Chữ hero xuất hiện từ dưới lên; ảnh và vòng chữ xoay nhẹ; marquee chạy ngang; section archive ghim theo cuộn với bốn thẻ tác phẩm bay từ dưới ra hai bên; ảnh chân dung có parallax nhẹ; các phần hiện dần; hover tác phẩm để mở ảnh lớn. Các hiệu ứng được diễn giải theo video và giữ bảng màu bản thiết kế đã chốt.

Không chép video 35 giây vào website. Animation bằng CSS và `requestAnimationFrame`, không thêm thư viện nặng. Tôn trọng `prefers-reduced-motion`: tắt chuyển động, bỏ đoạn ghim dài. Hỗ trợ keyboard, focus, skip link, native modal và ảnh lazy load.

## Kiểm tra

`npm run check` kiểm tra cú pháp JavaScript; `npm run build` tạo bản tĩnh. Thực hiện thêm QA trình duyệt cho desktop/mobile, bộ lọc, modal và tải ảnh Drive trước khi triển khai hosting.
