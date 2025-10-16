**Vai trò:** Bạn là Senior Frontend Engineer.
**Phạm vi dự án:**

* `src/index.html`
* `assets/css/style.css`
* `assets/js/main.js`

### 🎯 Mục tiêu

1. **Loại bỏ code không dùng** và **comment dư** (kể cả comment tiếng Việt quá dài).
2. **Giữ nguyên hành vi & giao diện hiện tại** (không regression).
3. **Chuẩn hoá cấu trúc & thứ tự CSS** (biến, reset, layout, components, utilities).
4. Sau cleanup, comment phải **ngắn – đủ ý** (1–2 dòng), tiếng Anh hoặc ký hiệu ngắn.

---

### ✅ Quy tắc chung

* **Không đổi HTML/JS** nếu không cần thiết để tránh ảnh hưởng tính năng.
* **Không xoá** các phần phục vụ hiệu ứng: door overlay, scroll reveal, gallery marquee, lightbox, calendar generate.
* **Không đổi tên class/id** hiện có.
* **Không thêm thư viện mới**.
* **Không minify** (giữ readable).
* Comment chỉ dạng: `/* section: family cards */`, `/* lightbox */`, `/* gallery marquee */`…

---

### 🔍 Bước 1 — Phân tích sử dụng selector (CSS)

* Parse `index.html` và `main.js` để lập **danh sách selector đang dùng**:

  * class, id, state classes (`.visible`, `.open`, `.is-active`, `.wedding-day`, `.section--full`, v.v.)
  * keyframes đang gán qua `animation`
  * media queries đang bao bọc các selector còn dùng.
* Trong `style.css` **đánh dấu** các selector:

  * **Used**: đang được HTML/JS dùng → giữ.
  * **Potentially unused**: không thấy trong DOM/JS → **xem kỹ**: nếu không dynamic → xoá.
  * **Dynamic by JS** (thêm/bớt runtime) → giữ.

> Ví dụ phải **GIỮ**:
> `.door-wrapper/left/right/center-icon`, `.visible`, `.is-active`, `.open`, `.lightbox-*`, `.gallery-section/.gallery-track`, `.event-layout`, `.calendar-grid/.calendar-day(.wedding-day)`, `.family-info-wrapper/.family-col(.left/.right)`, `.couple-name`, `.thankyou-section`, `.btn-submit`.

---

### ✂️ Bước 2 — Dọn `style.css` (ưu tiên cao)

1. **Xoá**:

   * Selector **không dùng** (không xuất hiện trong HTML/JS và không set runtime).
   * **Comment dài**, comment tiếng Việt; giữ/viết lại ngắn gọn.
   * **Thuộc tính trùng/ghi đè vô ích** (giữ bản cuối cùng có hiệu lực).
   * **Media query trùng lặp** hoặc định nghĩa lặp cùng selector.
   * Biến CSS **không được tham chiếu**.

2. **Gộp & sắp xếp**:

   * Gom các rule của cùng component vào gần nhau (gallery, event+calendar, family, form, album, lightbox, thankyou).
   * Quy ước thứ tự: **Variables → Base/Reset → Layout (grid/flex) → Components → Utilities → Media queries**.
   * Media queries đặt cuối file, nhóm theo breakpoint.

3. **Chuẩn hoá biến & đơn vị**:

   * Dùng hệ biến hiện tại (màu, spacing, typography).
   * Nếu thấy biến “mồ côi” (không dùng): xoá.
   * Ưu tiên `clamp()` cho font-size/spacing; `rem` cho kích thước; `svh`/`vh` cho cao nếu cần.

4. **Giữ đúng các phần quan trọng** (chỉ tối giản, không xoá):

   * **Gallery marquee**: `.gallery-section`, `.gallery-track`, `@keyframes marquee`.
   * **Lightbox**: `.lightbox-overlay`, `.lightbox-content`, `.lightbox-img`, `.lightbox-prev/next/close`, `body.lightbox-open`.
   * **Animations reveal**: `.family-col.left/right` với `.visible`, `#coupleName` transitions.
   * **Event + Calendar**: `.event-layout`, `.event-block`, `.calendar-pane`, `.calendar-grid/*`.
   * **Hero/Thankyou**: `.section--full` (nếu dùng), `.thankyou-section`, `.thankyou-text`.
   * **Form**: `.form-section`, `.form-container`, `.form-control`, `.btn-submit`.

5. **Tối ưu ảnh & overflow**:

   * Đảm bảo mọi ảnh dùng `max-width:100%; height:auto;` (không sinh scroll ngang).
   * Desktop: **không** nested scroll (`overflow: visible`).
   * Mobile: overflow nội bộ **chỉ** cho block cần (vd. calendar quá cao).

6. **A11y & motion**:

   * Giữ `@media (prefers-reduced-motion: reduce)`; comment ngắn: `/* reduce motion */`.

---

### 🧼 Bước 3 — Dọn `index.html`

* Xoá **comment dài**, comment tiếng Việt → viết lại ngắn.
* Xoá các **link/script trùng lặp** (CDN lặp, Google Fonts lặp).
* Bỏ thuộc tính dư thừa (duplicate `lang`, `meta viewport`, `charset` lặp).

---

### 🧹 Bước 4 — Dọn `main.js`

* Xoá comment dài/console.log không cần.
* Giữ các hàm: door animation, `generateCalendar()`, reveal (`checkAnimations`/`IntersectionObserver`), gallery active (nếu có), **lightbox**.
* Comment ngắn gọn từng khối: `// door`, `// calendar`, `// reveal`, `// gallery`, `// lightbox`.

---

### 🧪 Bước 5 — Kiểm thử không hồi quy

* Mở trang và kiểm tra:

  * Door mở đúng.
  * Hero, Family (reveal trái/phải), Gallery chạy ngang (pause hover), Event+Calendar **đáy thẳng hàng**, Form, Album, Thankyou.
  * Lightbox: click ảnh → full-screen, ESC/overlay/close → tắt, Prev/Next/Swipe hoạt động.
  * **Không có** scroll ngang; mobile không nested scroll ngoài nơi được phép.
  * **Không lỗi** console.

---

### 📝 Chuẩn comment sau cleanup

* Mỗi khối chỉ 1–2 dòng comment, ví dụ:

  ```css
  /* gallery marquee */
  /* event + calendar (2 cols desktop, 1 col mobile) */
  /* family reveal */
  /* lightbox overlay */
  ```
* Không để lại block comment dài hay mô tả tiếng Việt chi tiết.

---

### 📦 Đầu ra yêu cầu

* `assets/css/style.css` đã **rút gọn**:

  * Không còn selector/biến/media query thừa.
  * Các phần quan trọng vẫn hoạt động.
  * Comment ngắn gọn.
* `src/index.html` & `assets/js/main.js` đã bỏ comment dư; không đổi hành vi.

> Nếu cần loại bỏ thêm rule, **ưu tiên an toàn**: chỉ xoá khi chắc chắn **không** được dùng trong HTML/JS và **không** là state class động.
