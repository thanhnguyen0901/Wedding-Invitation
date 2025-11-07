# Wedding Invitation Website - Viet Thanh & Hoai Phuong

Modern wedding invitation website with dynamic animations, horizontal gallery, and interactive lightbox.

*(Add screenshots here - suggested: `/docs/screenshots/`)*

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Technologies & Dependencies](#-technologies--dependencies)
- [Running the Project](#-running-the-project)
- [Customization Guide](#-customization-guide)
- [Technical Details](#-technical-details)
- [Accessibility & Performance](#-accessibility--performance)
- [Troubleshooting](#-troubleshooting)

## ✨ Key Features

### 🎊 Hero Section 
- Couple names with `Great Vibes` font (script)
- Event information: November 30, 2025, 09:00 AM
- Main photo with responsive design
- Quote section with cursive typography

### 👨‍👩‍👧‍👦 Family Information
- Asymmetric grid layout (4.5fr:5.5fr on mobile)
- Slide-in animations: left slides from `translateX(-100px)`, right from `translateX(100px)`
- `.visible` class state when scrolling into viewport
- Responsive design with minimal gaps on mobile

### 🎠 Gallery Marquee 
- CSS-only horizontal scrolling with `animation: marquee 60s linear infinite`
- Images **duplicated** in HTML for smooth loop
- Auto-pause on hover (`:hover` and `:focus-within`)
- Mask gradient for fade edges: `linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)`
- Responsive with `--tile: clamp(16rem, 32vw, 22rem)`

### 📅 Event + Calendar
- Layout: Single column responsive design
- Calendar for November 2025 with highlighted wedding day (30th)
- Interactive date display with couple photos
- Heart decoration with animation

### 📝 RSVP Form
- Submits to Google Forms with action URL
- Entry fields:
  - `entry.1855860564`: Guest name
  - `entry.2131130553`: Relationship
  - `entry.172759615`: Wishes
  - `entry.162933616`: Companions

### 🖼️ Album + Lightbox
- Click images in `#album` opens fullscreen overlay
- Navigation: Prev/Next buttons, keyboard (←/→/Esc), touch swipe
- Class states: `.lightbox-overlay.open`, `body.lightbox-open` (prevent scroll)
- Mobile-optimized controls with proper positioning

### 📍 Location Section
- Restaurant information with styled background
- Embedded Google Maps iframe
- Direct link to Google Maps for navigation

### 📱 Responsive Design
- **Breakpoints**: 767px (mobile), 992px (desktop), 1200px (large)
- Mobile-first with `clamp()` typography scaling
- Family layout: 4.5:5.5 ratio on mobile, 4:6 on desktop
- Minimal gaps (2-3px) on mobile for compact design

### ♿ Accessibility
- ARIA labels, roles and semantic HTML5
- Screen reader support with `.sr-only` class
- Keyboard navigation in lightbox
- `prefers-reduced-motion` disables all animations
- Focus-visible styles for keyboard users

## 📂 Project Structure

```
src/
├── index.html                 # Main HTML file
├── .nojekyll                 # GitHub Pages configuration
├── nha-chu-re/
│   └── index.html            # Groom's family version
├── nha-co-dau/
│   └── index.html            # Bride's family version
└── assets/
    ├── css/
    │   └── style.css         # All styles (1750+ lines)
    ├── js/
    │   └── main.js          # All JavaScript functionality
    └── images/
        ├── albums/          # Album photos for lightbox
        └── gallery/         # Gallery photos for marquee
```

## 🛠️ Technologies & Dependencies

### CDN Libraries
- **Bootstrap 5.3.0**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Font Awesome 6.4.0**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- **Google Fonts**: `Great Vibes` (script), `Playfair Display` (serif), `Montserrat` (sans-serif)

### CSS Architecture
- **CSS Variables**: `:root` with color, spacing, typography scales
- **Modern CSS**: Grid, Flexbox, `clamp()`, custom properties
- **Mobile-first**: Responsive design with breakpoints
- **No build tools**: Vanilla CSS/JS, static site

## 🚀 Running the Project

### Local Development
```bash
# Method 1: Open directly
double-click index.html

# Method 2: Local server (recommended)
npx serve src
# or
python -m http.server 8000
# Access: http://localhost:8000
```

### Deploy to GitHub Pages

#### Step 1: Repository Configuration
1. Go to **Settings** → **Pages**
2. **Source**: Select **Deploy from a branch**
3. **Branch**: Select **main** and **/ (root)**

#### Step 2: Push Code
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

#### Step 3: Access Website
- URL: `https://<username>.github.io/<repo-name>/`
- Example: `https://thanhnguyen0901.github.io/Wedding-Invitation/`

**Details**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Other Deployment Options
- **Netlify/Vercel**: Drag & drop the `src/` folder
- **No build step required**

## ⚙️ Customization Guide

### 1. Change Couple Names
```html
<!-- Hero section -->
<h2>Viet Thanh & Hoai Phuong</h2>

<!-- Family sections -->
<p class="person-name">Viet Thanh</p>
<p class="person-name">Hoai Phuong</p>
```

### 2. Update Event Information
```html
<!-- Time and date -->
<time class="time-hour" datetime="2025-11-30T09:00">09:00</time>
<time class="date-number" datetime="2025-11-30">30.11</time>
<div class="date-year"><span>20</span><span>25</span></div>

<!-- Location -->
<h3 class="location-name">Thien Huong Wedding Restaurant</h3>
<p class="location-address">Tan An - An Hoa Hai<br>Tuy An - Phu Yen</p>
```

### 3. Change Calendar Month/Date
**Note**: Code is currently set for **November 2025**, wedding day **30th**
```html
<!-- Calendar highlighting -->
<div class="highlight">30</div>  <!-- Wedding day -->

<!-- Month title -->
<h3 class="month-year">NOVEMBER - 2025</h3>
```

### 4. Update Google Forms Integration
```html
<!-- Replace FORM_ID -->
<form action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse">

<!-- Replace entry numbers -->
<input name="entry.YOUR_NAME_FIELD" placeholder="Your name">
<input name="entry.YOUR_RELATION_FIELD" placeholder="Relationship">
<textarea name="entry.YOUR_WISHES_FIELD" placeholder="Wishes"></textarea>
<input name="entry.YOUR_COMPANIONS_FIELD" placeholder="Companions">
```

### 5. Replace Images

#### Gallery Marquee
```html
<!-- In .gallery-track: add images once -->
<img src="path/to/new-image.jpg" alt="Description" loading="lazy">

<!-- Duplicate exactly for smooth loop -->
<img src="path/to/new-image.jpg" alt="Description" loading="lazy">
```

#### Album Lightbox
```html
<!-- Add to #album -->
<img src="assets/images/albums/new-photo.jpg" 
     alt="Wedding photo - description" loading="lazy">
```

### 6. Change Brand Colors
```css
:root {
  --accent: #2c2c2c;           /* Primary color (dark) */
  --ink: #1a1a1a;            /* Text color */
  --bg: #f5f5f5;             /* Background (light) */
  --gold: #c9b896;           /* Gold accent */
  --muted: #6b6b6b;          /* Muted text */
  --card: rgba(255, 255, 255, 0.95); /* Card background */
}
```

### 7. Customize Typography
```css
:root {
  /* Font sizes - responsive with clamp() */
  --fs-h1: clamp(36px, 6vw, 56px);           /* Hero title */
  --fs-h2: clamp(22px, 3.6vw, 28px);         /* Section titles */
  --fs-script-lg: clamp(32px, 5.5vw, 44px);  /* Hero subtitle */
  --fs-script-md: clamp(24px, 4.5vw, 34px);  /* Couple names */
  --fs-body: clamp(14px, 2vw, 16px);         /* Body text */
  
  /* Line heights */
  --lh-tight: 1.3;    /* For headings */
  --lh-normal: 1.6;   /* For body text */
}
```

## 🔧 Technical Details

### Gallery Marquee Implementation
```css
.gallery-track {
  display: grid;
  grid-auto-flow: column;           /* Horizontal */
  grid-auto-columns: var(--tile);   /* Uniform size */
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  to { transform: translateX(-50%); }  /* Move 50% = 1 loop */
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
  document.body.classList.add('lightbox-open');  /* Prevent scroll */
};

// Navigation support
// - Click/Enter on images
// - Keyboard: ←/→/Esc  
// - Touch swipe: deltaX > 50px
```

### Family Layout Grid System
```css
.family-row {
  display: grid;
  grid-template-columns: 4fr 6fr;  /* Desktop: 40:60 */
  gap: clamp(20px, 4vw, 40px);
}

#familyRowBride {
  grid-template-columns: 6fr 4fr;  /* Reverse for bride */
}

/* Mobile optimization */
@media (max-width: 767px) {
  .family-row {
    grid-template-columns: 4.2fr 5.8fr;  /* Mobile: 42:58 */
    gap: clamp(2px, 0.5vw, 3px);         /* Minimal gap */
  }
}
```

### Scroll Reveal Mechanism
```javascript
function checkAnimations() {
  const trigger = window.innerHeight * 0.8;
  
  // Add/remove .visible class based on viewport
  if (rect.top < trigger && rect.bottom > 0) {
    element.classList.add("visible");
  }
}

// Continuously check on scroll/resize
window.addEventListener("scroll", checkAnimations);
```

## ♿ Accessibility & Performance

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Performance Optimizations
- **GPU hints**: `transform: translateZ(0)`, `will-change: transform`
- **Lazy loading**: `loading="lazy"` on all images
- **Font preconnect**: `rel="preconnect"` for Google Fonts
- **CDN caching**: External libraries from CDN
- **Image optimization**: Proper sizing and compression

### Keyboard Navigation
- **Lightbox**: Focus trap, Esc to close, Arrow keys navigation
- **Album images**: `tabindex="0"`, Enter/Space to open
- **Focus-visible**: Custom outline styles

## 🐛 Troubleshooting

### Gallery Not Looping Smoothly
- **Cause**: Missing images or not duplicated
- **Solution**: Each image in track must appear **exactly 2 times**

### Google Form Not Submitting
```html
<!-- Check FORM_ID and entry numbers -->
<form action="https://docs.google.com/forms/d/e/1FAIpQLSe.../formResponse">
<input name="entry.123456">  <!-- This number must match Google Form -->
```

### Lightbox Not Opening
- **Check selector**: `#album img` must exist
- **Console errors**: May be missing images or wrong path
- **Z-index conflicts**: `.lightbox-overlay` has `z-index: 10050`

### Mobile Performance Issues  
- **Large images**: Optimize size, use WebP if possible
- **Smooth scrolling**: Disable `scroll-behavior: smooth` on older mobile
- **Touch events**: Ensure `{passive: true}` for touch listeners

### Family Layout Issues
- **Grid not responsive**: Check CSS custom properties and clamp() values
- **Images not aligned**: Verify `object-fit: cover` and `height: 100%`
- **Gap too large**: Adjust `clamp()` values in mobile media queries

## 🚀 Development Roadmap

- [ ] **Multi-language**: i18n for EN/VI
- [ ] **CMS integration**: Headless CMS for dynamic content  
- [ ] **Image optimization**: WebP conversion, responsive images
- [ ] **PWA features**: Service worker, offline support
- [ ] **Analytics**: Google Analytics integration
- [ ] **Testing**: Unit tests for JS functions
- [ ] **Backend integration**: Contact form with email notifications

## 📄 License

UNLICENSED - Personal project

---

*Built with ❤️ for the special day of Viet Thanh & Hoai Phuong*