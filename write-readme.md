**Vai trò:** Bạn là Technical Writer + Senior Frontend Engineer.
**Mục tiêu:** Đọc **toàn bộ source** của dự án (đặc biệt: `src/index.html`, `assets/css/style.css`, `assets/js/main.js`) để **tự động tổng hợp** một file `README.md` hoàn chỉnh, chính xác với *chức năng, kiến trúc và cách dùng* hiện tại. Không suy diễn ngoài những thứ có trong code.

### 1) Những gì phải đọc & trích xuất

* **HTML:** cấu trúc các khu vực (Hero, Family, Gallery, Event + Calendar, Form RSVP Google Forms, Album, Thankyou, Door overlay). Tên class/id trọng yếu, thuộc tính `aria`, thứ tự script/link CDN.
* **CSS:** hệ biến (màu, spacing, typo), kiến trúc (base/reset → layout → components → utilities → media queries), các **keyframes** (marquee, reveal), **state classes** (`.visible`, `.open`, `.is-active`, `.wedding-day`, `.section--full`, …), quy tắc responsive, xử lý overflow, lightbox, gallery chạy ngang.
* **JS:** các hàm & luồng chính (door animation, `generateCalendar()` → `#calendar`, reveal on scroll/IntersectionObserver, gallery marquee/active nếu có, **lightbox** album (mở/đóng, prev/next, ESC, swipe), khởi tạo khi `DOMContentLoaded`), sự kiện bàn phím/chuột/chạm, nơi thêm/tắt animation (`prefers-reduced-motion`).
* **Phụ thuộc:** CDN (Bootstrap, Font Awesome, Google Fonts), không có build tool (static site), ảnh external/local, Google Form action/entry fields.
* **Ràng buộc & quyết định thiết kế:** gallery chạy ngang kiểu marquee (nhân đôi track để loop mượt), Event + Calendar hiển thị 2 cột desktop/1 cột mobile (canh **đáy**), giữ 2 cột Family ngay cả trên mobile (thu nhỏ padding/typo), chống scroll ngang, không nested scroll desktop, tôn trọng `prefers-reduced-motion`.

### 2) README.md phải có các mục sau (theo đúng dữ liệu lấy được từ code)

1. **Tiêu đề & mô tả ngắn** (1–2 câu).
2. **Ảnh chụp màn hình** (chèn placeholder và hướng dẫn cách cập nhật).
3. **Tính năng chính** (bullet rõ ràng, bám đúng code):

   * Door overlay mở cửa.
   * Hero + tên cặp đôi (script font).
   * Family 2 cột + hiệu ứng reveal trái/phải + `#coupleName` slide-in.
   * **Gallery chạy ngang** (marquee CSS, pause on hover, reduce-motion).
   * **Event + Calendar** 2 cột desktop / 1 cột mobile, canh đáy; `generateCalendar()` (Nov-2025, day 30 `.wedding-day`).
   * **Form RSVP** → Google Forms (liệt kê `action` và các `entry.xxxxx`).
   * **Album + Lightbox** (click ảnh mở fullscreen; close/ESC/overlay; Prev/Next; swipe mobile).
   * Responsive (breakpoints thực tế trong CSS).
   * A11y cơ bản (role/aria, keyboard nav trong lightbox).
4. **Cấu trúc thư mục** (tree thật, bám repo):

   ```
   src/
     index.html
   assets/
     css/style.css
     js/main.js
     images/ (nếu có)
   ```
5. **Công nghệ & phụ thuộc**: nêu rõ sử dụng CDN nào, font nào; không có bước build.
6. **Chạy dự án**:

   * Cách mở cục bộ (double-click `index.html` hoặc `npx serve`/`python -m http.server`).
   * Gợi ý deploy (Netlify/Vercel/GitHub Pages) – không cần build.
7. **Hướng dẫn tuỳ biến nội dung** (quan trọng – dựa đúng code):

   * **Đổi tên cặp đôi** (Hero & `#coupleName`).
   * **Sửa Event detail** (giờ, ngày, venue, map).
   * **Sửa/đổi tháng/calendar** (nếu code đang cố định Nov-2025 ⇒ ghi rõ; nếu có biến tháng, nêu cách đổi).
   * **Cập nhật Google Form** (`action` + `entry.*` – chỉ ra chính xác các name hiện dùng).
   * **Thay hình Gallery/Album**:

     * Gallery: thêm ảnh vào “track lần 1”, nhớ **nhân đôi** để loop mượt (hoặc bật ghi chú “tool sẽ tự nhân đôi” nếu code đang làm).
     * Album: thêm `<img>` trong `#album`.
   * **Thay màu thương hiệu**: liệt kê biến màu trong `:root` (accent, gold, bg, ink…), cách đổi.
   * **Typo scale**: mô tả biến `--fs-*`, `--lh-*`, vị trí áp dụng (Hero/section title/body).
8. **Chi tiết kỹ thuật** (điểm khác biệt cần hiểu):

   * Cách hoạt động **gallery marquee** (grid-auto-flow column, animation translateX -50%, mask gradient, pause hover).
   * **Lightbox**: DOM được inject, class `.open`, chặn scroll nền `body.lightbox-open`, phím tắt & swipe.
   * **Reveal**: cơ chế add/remove `.visible`; tiêu chí threshold nếu dùng IO.
   * **Chống giật/overflow**: vì sao không dùng scroll-snap bắt buộc; xử lý nested scroll (desktop off, mobile optional).
9. **A11y & Performance**:

   * `prefers-reduced-motion` → tắt animation marquee.
   * GPU hint (`will-change`, `translateZ(0)`), tối ưu ảnh (`loading="lazy"`).
10. **Troubleshooting** (các lỗi thường gặp từ lịch sử dự án):

    * Event/Calendar lệch đáy (cách canh `align-items: end`, flex column + `margin-top: auto`).
    * Gallery không loop mượt khi thiếu ảnh (cần nhân đôi).
    * Form không submit (sai `FORM_ID`/`entry.*`).
    * Lightbox không mở (thiếu selector `#album img`).
11. **Lộ trình/To-do** (nếu thấy hook trong code): đa ngôn ngữ, CMS nội dung, preload ảnh, PWA, tests nhẹ.
12. **Giấy phép** (nếu chưa có, để `UNLICENSED` hoặc `MIT` tuỳ bạn – đừng bịa).

### 3) Tiêu chí chất lượng README

* **Tuyệt đối chính xác** với code: không mô tả thứ **không có**.
* Ngắn gọn, cấu trúc rõ, có **mục lục** (TOC) và anchor.
* Dùng markdown chuẩn: code blocks, bảng nhỏ khi cần.
* Không chèn comment dài; câu chữ súc tích, dễ bảo trì.
* Nếu có biến/tên class/ID, **trích đúng chính tả** từ source.
* Dùng tiếng Việt chuyên nghiệp.

### 4) Đầu ra

* Tạo/ghi đè file **`README.md`** ở root dự án với nội dung theo các mục trên.
* Nếu cần ảnh minh hoạ trong README, đặt ghi chú: “(Thêm ảnh chụp màn hình tại đây)” và hướng dẫn đường dẫn đề xuất (`/docs/screenshots/`).

> Lưu ý: Nếu thấy các “tên biến CSS”/“class” trong `style.css` không thống nhất (ví dụ `--space-*` vs `--element-gap`), README **chỉ mô tả phần đang được dùng thực tế**, tránh gây nhầm lẫn.

---

**Hãy bắt đầu bằng việc quét code, liệt kê selector & hàm chính, rồi viết README.md theo khung trên.**
