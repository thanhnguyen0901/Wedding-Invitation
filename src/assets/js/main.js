
window.addEventListener("load", () => {
  setTimeout(() => {
    const leftDoor = document.getElementById("leftDoor");
    const rightDoor = document.getElementById("rightDoor");
    const centerIcon = document.getElementById("centerIcon");
    const doorWrapper = document.getElementById("doorWrapper");

    if (leftDoor && rightDoor && centerIcon && doorWrapper) {
      leftDoor.style.transform = "translateX(-100%)";
      rightDoor.style.transform = "translateX(100%)";
      centerIcon.style.display = "none";

      setTimeout(() => {
        doorWrapper.style.display = "none";
      }, 2000);
    }
  }, 2000);
});


function generateCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];


  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "calendar-header";
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });

  const firstDayOfWeek = 6;
  const daysInMonth = 30;


  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day other-month";
    const prevMonthDay = 31 - firstDayOfWeek + i + 1;
    emptyDay.textContent = prevMonthDay;
    calendar.appendChild(emptyDay);
  }


  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    if (day === 30) {
      dayElement.className += " wedding-day";
    }
    dayElement.textContent = day;
    calendar.appendChild(dayElement);
  }

  const totalCells = 42;
  const filledCells = firstDayOfWeek + daysInMonth;
  for (let day = 1; filledCells + day - 1 < totalCells; day++) {
    const nextMonthDay = document.createElement("div");
    nextMonthDay.className = "calendar-day other-month";
    nextMonthDay.textContent = day;
    calendar.appendChild(nextMonthDay);
  }
}

/**
 * Scroll animations - continuous effect
 * Handles visibility animations for various elements based on scroll position
 */
function checkAnimations() {
  const groomPhoto = document.querySelector("#familyRowGroom .family-photo");
  const bridePhoto = document.querySelector("#familyRowBride .family-photo");
  const couple = document.getElementById("coupleName");
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


  if (couple) {
    const rect = couple.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      couple.classList.add("visible");
    } else {
      couple.classList.remove("visible");
    }
  }


  // Album images animation
  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      img.classList.add("visible");
    } else {
      img.classList.remove("visible");
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

  const open = (i) => {
    idx = i;
    const src = imgs[idx].getAttribute('src');
    const alt = imgs[idx].getAttribute('alt') || 'Ảnh';
    imgEl.src = src; 
    imgEl.alt = alt;
    overlay.classList.add('open');
    document.body.classList.add('lightbox-open');
    btnClose.focus();
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    imgEl.src = '';
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
 * Initialize the application when DOM is loaded
 */
function init() {
  // Scroll to top on page load
  scrollToTop();
  
  generateCalendar();
  setupEventListeners();
  bindGalleryActive();
  setupAlbumLightbox(); // Thêm lightbox functionality

  // Initial check for animations after DOM is loaded
  setTimeout(checkAnimations, 500);

  // Additional check after a short delay to ensure all elements are ready
  setTimeout(checkAnimations, 100);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", init);
