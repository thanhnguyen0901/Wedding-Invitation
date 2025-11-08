
/**
 * Scroll animations - continuous effect
 * Handles visibility animations for various elements based on scroll position
 */
function checkAnimations() {
  const groomPhoto = document.querySelector("#familyRowGroom .family-photo");
  const bridePhoto = document.querySelector("#familyRowBride .family-photo");
  const images = document.querySelectorAll("#album img");

  const isMobile = window.innerWidth <= 768;
  const trigger = isMobile ? window.innerHeight * 0.7 : window.innerHeight * 0.8;
  const topTrigger = isMobile ? window.innerHeight * 0.3 : window.innerHeight * 0.2;

  // Family photos animation
  if (groomPhoto) {
    const rect = groomPhoto.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      groomPhoto.classList.add("visible");
    } else {
      groomPhoto.classList.remove("visible");
    }
  }

  // Bride photo animation
  if (bridePhoto) {
    const rect = bridePhoto.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      bridePhoto.classList.add("visible");
    } else {
      bridePhoto.classList.remove("visible");
    }
  }

  // Album images animation
  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      img.classList.add("visible");
    } else {
      const isLastTwoImages = index >= images.length - 2;
      const alreadyVisible = img.classList.contains("visible");
      if (isMobile && isLastTwoImages && alreadyVisible) {
      } else {
        img.classList.remove("visible");
      }
    }
  });
}

/**
 * Event listeners setup
 */
function setupEventListeners() {
  window.addEventListener("scroll", checkAnimations);
  window.addEventListener("resize", checkAnimations);
}

/**
 * Gallery Active Image Handler for Mobile Carousel
 */
function bindGalleryActive() {
  const gallery = document.querySelector('.gallery-section');
  if (!gallery) return;
  
  const track = gallery.querySelector('.gallery-track');
  if (!track) return;
  
  const images = Array.from(gallery.querySelectorAll('img'));
  if (images.length === 0) return;

  // Touch swipe functionality
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  let animationPaused = false;

  gallery.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    animationPaused = true;
    track.style.animationPlayState = 'paused';
  }, {passive: true});

  gallery.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = diff;
    
    // Apply transform for smooth dragging
    const currentTransform = track.style.transform || 'translateX(0)';
    const match = currentTransform.match(/translateX\(([^)]+)\)/);
    const baseTranslate = match ? parseFloat(match[1]) : 0;
    track.style.transform = `translateX(${baseTranslate + diff}px)`;
  }, {passive: true});

  gallery.addEventListener('touchend', () => {
    isDragging = false;
    startX = 0;
    currentTranslate = 0;
    
    // Resume animation after a short delay
    setTimeout(() => {
      animationPaused = false;
      track.style.animationPlayState = 'running';
      track.style.transform = '';
    }, 300);
  });

  // Mouse drag for desktop
  gallery.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    animationPaused = true;
    track.style.animationPlayState = 'paused';
    gallery.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    currentTranslate = diff;
    
    const currentTransform = track.style.transform || 'translateX(0)';
    const match = currentTransform.match(/translateX\(([^)]+)\)/);
    const baseTranslate = match ? parseFloat(match[1]) : 0;
    track.style.transform = `translateX(${baseTranslate + diff}px)`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    startX = 0;
    currentTranslate = 0;
    gallery.style.cursor = 'grab';
    
    setTimeout(() => {
      animationPaused = false;
      track.style.animationPlayState = 'running';
      track.style.transform = '';
    }, 300);
  });

  // Set cursor style
  gallery.style.cursor = 'grab';
}



/**
 * Scroll to top on page reload
 */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

/**
 * Album Lightbox Functionality
 * Creates overlay for viewing album images in full screen
 */
function setupAlbumLightbox() {
  const album = document.querySelector('#album');
  if (!album) return;


  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content" role="dialog" aria-modal="true" aria-label="Xem ảnh lớn">
      <img class="lightbox-img" alt="">
      <button class="lightbox-close" aria-label="Đóng (Esc)">✕</button>
      <button class="lightbox-prev"  aria-label="Ảnh trước">‹</button>
      <button class="lightbox-next"  aria-label="Ảnh sau">›</button>
    </div>`;
  document.body.appendChild(overlay);

  const imgs = Array.from(album.querySelectorAll('img'));
  const imgEl = overlay.querySelector('.lightbox-img');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev = overlay.querySelector('.lightbox-prev');
  const btnNext = overlay.querySelector('.lightbox-next');
  let idx = 0;
  let scrollPosition = 0;

  const open = (i) => {
    idx = i;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    const src = imgs[idx].getAttribute('src');
    const alt = imgs[idx].getAttribute('alt') || 'Ảnh';
    imgEl.src = src; 
    imgEl.alt = alt;
    
    document.body.classList.add('lightbox-open');
    overlay.classList.add('open');
    btnClose.focus();
  };

  const close = () => {
    overlay.classList.remove('open');
    imgEl.src = '';
    document.body.classList.remove('lightbox-open');
  };

  const prev = () => open((idx - 1 + imgs.length) % imgs.length);
  const next = () => open((idx + 1) % imgs.length);


  imgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(i));
    img.addEventListener('keydown', (e) => { 
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i); 
      }
    });
    img.setAttribute('tabindex', '0');
  });


  btnClose.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { 
    if (e.target === overlay) close(); 
  });
  
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });


  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Vuốt trên mobile
  let startX = 0, deltaX = 0;
  overlay.addEventListener('touchstart', (e) => { 
    startX = e.touches[0].clientX; 
  }, {passive: true});
  
  overlay.addEventListener('touchmove', (e) => { 
    deltaX = e.touches[0].clientX - startX; 
  }, {passive: true});
  
  overlay.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) { 
      deltaX < 0 ? next() : prev(); 
    }
    startX = 0; 
    deltaX = 0;
  });
}

/**
 * Form Submission Handler
 * Handles RSVP form submission with validation and feedback
 */
function setupFormHandler() {
  const form = document.querySelector('form[aria-labelledby="rsvp-title"]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const guestName = document.getElementById('guest-name').value.trim();
    const relationship = document.getElementById('relationship').value.trim();
    const wishes = document.getElementById('wishes').value.trim();
    const companions = document.getElementById('companions').value.trim();

    // Validate required fields
    if (!guestName || !relationship) {
      showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Đang gửi...</span>';
    submitBtn.disabled = true;

    try {
      const formData = new FormData();
      formData.append('entry.1855860564', guestName);      // Tên của bạn
      formData.append('entry.2131130553', relationship);   // Mối quan hệ
      formData.append('entry.172759615', wishes);          // Lời chúc
      formData.append('entry.162933616', companions);      // Người đi cùng

      await fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',  // Required for Google Forms
        body: formData
      });

      // Show success message
      showNotification('Cảm ơn bạn đã xác nhận tham dự! 💕', 'success');
      
      // Reset form
      form.reset();

    } catch (error) {
      console.error('Submit error:', error);
      showNotification('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
    } finally {
      // Restore button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
  // Remove existing notification if any
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification-toast notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
      <span class="notification-message">${message}</span>
    </div>
  `;

  // Add to body
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/**
 * Initialize the application when DOM is loaded
 */
function init() {
  // Scroll to top on page load
  scrollToTop();
  
  setupEventListeners();
  bindGalleryActive();
  setupAlbumLightbox();
  setupFormHandler();

  // Initial check for animations after DOM is loaded
  setTimeout(checkAnimations, 500);

  // Additional check after a short delay to ensure all elements are ready
  setTimeout(checkAnimations, 100);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", init);
