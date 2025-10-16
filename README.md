# Thiệp Cưới Online - Việt Thanh & Hoài Phương

Website thiệp cưới hiện đại với hiệu ứng động, gallery chạy ngang và lightbox tương tác.

*(Thêm ảnh chụp màn hình tại đây - đề xuất: `/docs/screenshots/`)*

## 📋 Mục Lục

- [Tính Năng Chính](#-tính-năng-chính)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Công Nghệ & Phụ Thuộc](#-công-nghệ--phụ-thuộc)
- [Chạy Dự Án](#-chạy-dự-án)
- [Hướng Dẫn Tuỳ Biến](#-hướng-dẫn-tuỳ-biến)
- [Chi Tiết Kỹ Thuật](#-chi-tiết-kỹ-thuật)
- [Accessibility & Performance](#-accessibility--performance)
- [Troubleshooting](#-troubleshooting)

## ✨ Tính Năng Chính

### 🚪 Door Opening Animation
- Hiệu ứng mở cửa khi tải trang (2s delay)
- Transform: `translateX(-100%)` (trái) và `translateX(100%)` (phải)
- Icon trung tâm: "囍" với gradient vàng

### 🎊 Hero Section 
- Tên cặp đôi với font `Great Vibes` (script)
- Thông tin sự kiện: 30/11/2025, 19:00
- Ảnh chính với aspect-ratio 4:3

### 👨‍👩‍👧‍👦 Family Information
- Layout 2 cột (giữ nguyên trên mobile)
- Hiệu ứng reveal: trái slide từ `translateX(-36px)`, phải từ `translateX(36px)`
- Class state: `.visible` khi scroll vào viewport
- Element `#coupleName` với slide-in animation

### 🎠 Gallery Marquee 
- CSS-only horizontal scrolling với `animation: marquee 24s linear infinite`
- Ảnh được **nhân đôi** trong HTML để tạo loop mượt mà
- Tự động pause khi hover (`:hover` và `:focus-within`)
- Mask gradient để fade edges: `linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)`
- Responsive với `--tile: clamp(16rem, 32vw, 22rem)`

### 📅 Event + Calendar
- Layout: 2 cột desktop (≥992px) / 1 cột mobile
- **Canh đáy**: `align-items: end` để đều nhau
- `generateCalendar()`: tạo November 2025, ngày 30 có class `.wedding-day`
- Tổng 42 cells (6 rows × 7 days) với previous/next month overflow

### 📝 RSVP Form
- Submit đến Google Forms với action: `https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse`
- Entry fields:
  - `entry.123456`: Tên khách
  - `entry.123457`: Mối quan hệ
  - `entry.123458`: Lời chúc
  - `entry.123459`: Người đi cùng

### 🖼️ Album + Lightbox
- Click ảnh trong `#album` mở fullscreen overlay
- Navigation: Prev/Next buttons, keyboard (←/→/Esc), touch swipe
- Class states: `.lightbox-overlay.open`, `body.lightbox-open` (chặn scroll)
- Responsive controls: thu nhỏ buttons trên mobile (≤767px)

### 📱 Responsive Design
- **Breakpoints**: 767px (mobile), 992px (desktop), 1200px (large)
- Mobile-first với `clamp()` typography scaling
- Overflow-x hidden toàn bộ để tránh horizontal scroll

### ♿ Accessibility
- ARIA labels, roles và semantic HTML5
- Screen reader support với `.sr-only` class
- Keyboard navigation trong lightbox
- `prefers-reduced-motion` tắt tất cả animations
- Focus-visible styles cho keyboard users

## 📂 Cấu Trúc Dự Án

```
src/
├── index.html                 # HTML chính với semantic structure
├── assets/
│   ├── css/
│   │   └── style.css         # Tất cả styles (1145 lines)
│   ├── js/
│   │   └── main.js          # Tất cả JavaScript (288 lines) 
│   └── images/              # Thư mục ảnh (cần cập nhật)
│       └── albums/          # Ảnh album cho lightbox
└── index.html.backup        # File backup gốc
```

## 🛠️ Công Nghệ & Phụ Thuộc

### CDN Libraries
- **Bootstrap 5.3.0**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Font Awesome 6.4.0**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- **Google Fonts**: `Great Vibes` (script) + `Montserrat` (sans-serif)

### CSS Architecture
- **CSS Variables**: `:root` với color, spacing, typography scales
- **Modern CSS**: Grid, Flexbox, `clamp()`, custom properties
- **No build tools**: Vanilla CSS/JS, static site

## 🚀 Chạy Dự Án

### Cục Bộ
```bash
# Cách 1: Mở trực tiếp
double-click index.html

# Cách 2: Local server (khuyến nghị)
npx serve src
# hoặc
python -m http.server 8000
# Truy cập: http://localhost:8000
```

### Deploy
- **Netlify/Vercel**: Drag & drop thư mục `src/`
- **GitHub Pages**: Upload và set source folder
- **Không cần build step**

## ⚙️ Hướng Dẫn Tuỳ Biến

### 1. Đổi Tên Cặp Đôi
```html
<!-- Hero section -->
<h2>Việt Thanh - Hoài Phương</h2>

<!-- Couple names -->
<div class="couple-name" id="coupleName">
  <span>Nguyễn Việt Thanh</span>
  <span>Nguyễn Hoài Phương</span>
</div>
```

### 2. Cập Nhật Thông Tin Sự Kiện
```html
<!-- Thời gian -->
<time datetime="2025-11-30T19:00">Saturday - 19:00</time>
<time datetime="2025-11-30">30 . 11 . 2025</time>

<!-- Địa điểm -->
<p>Nhà Hàng ABC</p>
<address>123 Đường Hoa Hồng, Quận 3</address>

<!-- Google Maps -->
<button onclick="window.open('https://maps.google.com?q=123+Hoa+Hồng+Q3','_blank')">
```

### 3. Đổi Tháng/Calendar 
**Lưu ý**: Code hiện cố định **November 2025**, ngày cưới **30**
```javascript
// Trong main.js - function generateCalendar()
const firstDayOfWeek = 6;  // Thứ 7 (Saturday) = 6
const daysInMonth = 30;    // Tháng 11 có 30 ngày

// Ngày cưới
if (day === 30) {
  dayElement.className += " wedding-day";
}
```

### 4. Cập Nhật Google Forms
```html
<!-- Thay FORM_ID -->
<form action="https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID/formResponse">

<!-- Thay entry numbers -->
<input name="entry.YOUR_NAME_FIELD" placeholder="Tên của bạn">
<input name="entry.YOUR_RELATION_FIELD" placeholder="Mối quan hệ">
<textarea name="entry.YOUR_WISHES_FIELD" placeholder="Lời chúc"></textarea>
<input name="entry.YOUR_COMPANIONS_FIELD" placeholder="Người đi cùng">
```

### 5. Thay Hình Ảnh

#### Gallery Marquee
```html
<!-- Trong .gallery-track: thêm ảnh lần 1 -->
<img src="path/to/new-image.jpg" alt="Mô tả" loading="lazy">

<!-- Nhân đôi y hệt để loop mượt -->
<img src="path/to/new-image.jpg" alt="Mô tả" loading="lazy">
```

#### Album Lightbox
```html
<!-- Thêm trong #album -->
<img src="assets/images/albums/new-photo.jpg" 
     alt="Ảnh cưới - mô tả" loading="lazy">
```

### 6. Thay Màu Thương Hiệu
```css
:root {
  --accent: #c0392b;        /* Màu chính (đỏ) */
  --ink: #0f172a;          /* Màu text tối */
  --bg: #fff8f0;           /* Màu nền (kem) */
  --gold: #d4af37;         /* Màu vàng accent */
  --muted: #6b7280;        /* Màu text nhạt */
  --card: #ffffff;         /* Màu thẻ/form */
}
```

### 7. Tuỳ Chỉnh Typography
```css
:root {
  /* Font sizes - responsive với clamp() */
  --fs-h1: clamp(36px, 6vw, 56px);           /* Hero title */
  --fs-h2: clamp(22px, 3.6vw, 28px);         /* Section titles */
  --fs-script-lg: clamp(32px, 5.5vw, 44px);  /* Hero subtitle */
  --fs-script-md: clamp(24px, 4.5vw, 34px);  /* Couple names */
  --fs-body: clamp(14px, 2vw, 16px);         /* Body text */
  
  /* Line heights */
  --lh-tight: 1.3;    /* Cho headings */
  --lh-normal: 1.6;   /* Cho body text */
}
```

## 🔧 Chi Tiết Kỹ Thuật

### Gallery Marquee Implementation
```css
.gallery-track {
  display: grid;
  grid-auto-flow: column;           /* Ngang */
  grid-auto-columns: var(--tile);   /* Kích thước đồng đều */
  animation: marquee 24s linear infinite;
}

@keyframes marquee {
  to { transform: translateX(-50%); }  /* Di chuyển 50% = 1 lần lặp */
}

/* Pause on interaction */
.gallery-section:hover .gallery-track,
.gallery-section:focus-within .gallery-track {
  animation-play-state: paused;
}
```

### Lightbox System
```javascript
// DOM injection
const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';

// State management
const open = (i) => {
  overlay.classList.add('open');
  document.body.classList.add('lightbox-open');  // Chặn scroll
};

// Navigation hỗ trợ
// - Click/Enter trên ảnh
// - Keyboard: ←/→/Esc  
// - Touch swipe: deltaX > 50px
```

### Scroll Reveal Mechanism
```javascript
function checkAnimations() {
  const trigger = window.innerHeight * (isMobile ? 0.7 : 0.8);
  
  // Add/remove .visible class based on viewport
  if (rect.top < trigger && rect.bottom > topTrigger) {
    element.classList.add("visible");
  }
}

// Liên tục check khi scroll/resize
window.addEventListener("scroll", checkAnimations);
```

### Event + Calendar Alignment
```css
.event-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Desktop */
  align-items: end;                /* Canh đáy */
}

.event-detail .event-block,
.calendar-pane .calendar-grid {
  margin-top: auto;  /* Push xuống đáy */
}
```

## ♿ Accessibility & Performance

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance Optimizations
- **GPU hints**: `transform: translateZ(0)`, `will-change: transform`
- **Lazy loading**: `loading="lazy"` trên tất cả ảnh
- **Font preconnect**: `rel="preconnect"` cho Google Fonts
- **CDN caching**: External libraries từ CDN

### Keyboard Navigation
- **Lightbox**: Focus trap, Esc để đóng, Arrow keys navigation
- **Album images**: `tabindex="0"`, Enter/Space để mở
- **Focus-visible**: Custom outline styles

## 🐛 Troubleshooting

### Event/Calendar Không Canh Đáy
```css
/* Đảm bảo có đủ CSS này */
.event-layout { align-items: end; }
.event-detail { display: flex; flex-direction: column; }
.event-detail .event-block { margin-top: auto; }
```

### Gallery Không Loop Mượt
- **Nguyên nhân**: Thiếu ảnh hoặc không nhân đôi
- **Giải pháp**: Mỗi ảnh trong track phải xuất hiện **chính xác 2 lần**

### Google Form Không Submit
```html
<!-- Kiểm tra FORM_ID và entry numbers -->
<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSe.../formResponse">
<input name="entry.123456">  <!-- Số này phải đúng với Google Form -->
```

### Lightbox Không Mở
- **Kiểm tra selector**: `#album img` phải tồn tại
- **Console errors**: Có thể thiếu images hoặc path sai
- **Z-index conflicts**: `.lightbox-overlay` có `z-index: 10050`

### Mobile Performance Issues  
- **Ảnh lớn**: Tối ưu kích thước, dùng WebP nếu có thể
- **Smooth scrolling**: Tắt `scroll-behavior: smooth` trên mobile cũ
- **Touch events**: Đảm bảo `{passive: true}` cho touch listeners

## 🚀 Lộ Trình Phát Triển

- [ ] **Đa ngôn ngữ**: i18n cho EN/VI
- [ ] **CMS tích hợp**: Headless CMS cho nội dung dynamic  
- [ ] **Image optimization**: WebP conversion, responsive images
- [ ] **PWA features**: Service worker, offline support
- [ ] **Analytics**: Google Analytics integration
- [ ] **Testing**: Unit tests cho JS functions

## 📄 Giấy Phép

UNLICENSED - Dự án cá nhân

---

*Được xây dựng với ❤️ cho ngày đặc biệt của Việt Thanh & Hoài Phương*