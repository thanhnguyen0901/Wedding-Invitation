/**
 * Wedding Invitation JavaScript
 * Handles door animation, calendar generation, and scroll animations
 */

// Door opening animation
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('leftDoor').style.transform = 'translateX(-100%)';
    document.getElementById('rightDoor').style.transform = 'translateX(100%)';
    document.getElementById('centerIcon').style.display = 'none';
    setTimeout(() => {
      document.getElementById('doorWrapper').style.display = 'none';
    }, 2000);
  }, 2000);
});

/**
 * Generate November 2025 Calendar
 */
function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  // Add day headers
  daysOfWeek.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'calendar-header';
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });

  // November 2025 starts on Saturday (day 6)
  const firstDayOfWeek = 6; // Saturday
  const daysInMonth = 30;
  
  // Add empty cells for days before November 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day other-month';
    const prevMonthDay = 31 - firstDayOfWeek + i + 1; // October days
    emptyDay.textContent = prevMonthDay;
    calendar.appendChild(emptyDay);
  }
  
  // Add days of November
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    if (day === 30) {
      dayElement.className += ' wedding-day';
    }
    dayElement.textContent = day;
    calendar.appendChild(dayElement);
  }
  
  // Fill remaining cells for next month
  const totalCells = 42; // 6 rows x 7 days
  const filledCells = firstDayOfWeek + daysInMonth;
  for (let day = 1; filledCells + day - 1 < totalCells; day++) {
    const nextMonthDay = document.createElement('div');
    nextMonthDay.className = 'calendar-day other-month';
    nextMonthDay.textContent = day;
    calendar.appendChild(nextMonthDay);
  }
}

/**
 * Check and trigger scroll animations
 * Provides continuous animation effect as elements enter/leave viewport
 */
function checkAnimations() {
  const left = document.getElementById('familyLeft');
  const right = document.getElementById('familyRight');
  const couple = document.getElementById('coupleName');
  const images = document.querySelectorAll('#album img');

  const trigger = window.innerHeight * 0.8;
  const topTrigger = window.innerHeight * 0.2;
  
  // Family left animation
  if (left) {
    const rect = left.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      left.classList.add('visible');
    } else {
      left.classList.remove('visible');
    }
  }
  
  // Family right animation  
  if (right) {
    const rect = right.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      right.classList.add('visible');
    } else {
      right.classList.remove('visible');
    }
  }
  
  // Couple name animation
  if (couple) {
    const rect = couple.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      couple.classList.add('visible');
    } else {
      couple.classList.remove('visible');
    }
  }

  // Album images animation
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > topTrigger) {
      img.classList.add('visible');
    } else {
      img.classList.remove('visible');
    }
  });
}

/**
 * Initialize the application
 */
function init() {
  // Generate calendar when page loads
  generateCalendar();
  
  // Check animations after DOM is loaded
  setTimeout(checkAnimations, 500);
  
  // Add scroll and resize event listeners
  window.addEventListener('scroll', checkAnimations);
  window.addEventListener('resize', checkAnimations);
  
  // Initial check when page loads
  setTimeout(checkAnimations, 100);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);