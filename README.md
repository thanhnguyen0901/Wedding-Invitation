# Wedding Invitation - Refactored Project

## Project Structure

```
src/
├── index.html              # Clean semantic HTML structure
├── index.html.backup       # Original file backup
└── assets/
    ├── css/
    │   └── style.css       # All extracted CSS styles
    ├── js/
    │   └── main.js         # All extracted JavaScript
    └── images/
        ├── README.md       # Image documentation
        ├── door-pattern.jpg
        ├── couple-main.jpg
        ├── gallery-1.png
        ├── gallery-2.jpg
        ├── gallery-3.jpg
        ├── album-1.jpg
        ├── album-2.jpg
        ├── album-3.jpg
        ├── album-4.jpg
        ├── album-5.jpg
        ├── album-6.jpg
        ├── album-7.jpg
        ├── album-8.jpg
        └── thankyou-bg.jpg
```

## Changes Made

### ✅ 1. Organized File Structure
- Created `assets/` directory with `css/`, `js/`, and `images/` subdirectories
- Moved all inline CSS to `assets/css/style.css`
- Moved all inline JavaScript to `assets/js/main.js`
- Created local image placeholders in `assets/images/`

### ✅ 2. Semantic HTML
- Used proper semantic tags: `<main>`, `<header>`, `<section>`, `<footer>`, `<article>`, `<figure>`
- Added appropriate ARIA labels for form accessibility
- Maintained all original IDs for JavaScript functionality
- Added descriptive alt text for all images

### ✅ 3. Performance Optimizations
- Added `loading="lazy"` to all images for better performance
- External libraries (Bootstrap, Font Awesome, Google Fonts) remain via CDN
- Clean separation of concerns (HTML structure, CSS styling, JavaScript behavior)

### ✅ 4. Maintained Functionality
- Door opening animation
- Scroll-triggered animations (family info, couple names, album images)
- Calendar generation for November 2025
- Google Forms integration
- Responsive design for all screen sizes
- All hover effects and transitions

## Features Preserved

1. **Door Animation**: Opening animation on page load
2. **Scroll Animations**: Family sections and album images animate on scroll
3. **Interactive Calendar**: November 2025 calendar with wedding day highlighted
4. **Responsive Design**: Mobile-first approach with breakpoints at 768px, 480px, and 360px
5. **Form Integration**: Google Forms submission for RSVP and wishes
6. **External Links**: Google Maps integration for venue location

## Development Notes

### Image Replacement Required
All images in `assets/images/` are currently placeholder files. Replace them with actual images using the URLs documented in `assets/images/README.md`.

### CSS Architecture
- Base styles and resets at the top
- Door animation styles
- Section-specific styles organized by appearance order
- Responsive breakpoints at the bottom

### JavaScript Structure
- Modular functions with clear documentation
- Event listeners properly attached
- Clean initialization function

## Browser Compatibility
- Modern browsers supporting CSS Grid, Flexbox, and ES6
- External libraries provide additional cross-browser support
- Responsive design works on devices from 360px width and up

## How to Use
1. Replace placeholder images with actual wedding photos
2. Update Google Forms action URL with your actual form ID
3. Customize content (names, dates, venue information) as needed
4. Test in a local server environment for full functionality

## Performance Tips
- Consider optimizing images (WebP format recommended)
- Images are lazy-loaded for better initial page performance
- External resources are loaded from CDN for better caching