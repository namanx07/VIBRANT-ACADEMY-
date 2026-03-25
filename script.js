/* =====================================================
   VIBRANT ACADEMY — script.js
   Features: Navbar scroll, Mobile menu, Smooth scroll,
             Scroll animations, Back to top, Active links
   ===================================================== */

(function () {
  'use strict';

  /* ===== DOM REFERENCES ===== */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const backToTop  = document.getElementById('backToTop');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  /* ===== NAVBAR SCROLL EFFECT ===== */
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ===== BACK TO TOP VISIBILITY ===== */
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /* ===== COMBINED SCROLL HANDLER ===== */
  function onScroll() {
    handleNavbarScroll();
    handleBackToTop();
    updateActiveLink();
    observeAnimations();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== MOBILE HAMBURGER MENU ===== */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  /* Close menu when a nav link is clicked */
  allNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== BACK TO TOP BUTTON ===== */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== SCROLL REVEAL ANIMATION ===== */
  // Add fade-in-up class to animatable elements
  const animatableSelectors = [
    '.glass-card',
    '.director-card',
    '.highlight-card',
    '.facility-card',
    '.testimonial-card',
    '.topper-card',
    '.program-item',
    '.admission-card',
    '.message-card',
    '.stat-item',
    '.about-aim-box',
    '.classes-card',
  ];

  // Apply animation class to elements
  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = (idx % 4) * 0.08 + 's';
    });
  });

  function observeAnimations() {
    const elements = document.querySelectorAll('.fade-in-up:not(.visible)');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowH - 80) {
        el.classList.add('visible');
      }
    });
  }

  /* ===== NUMBER COUNT-UP ANIMATION FOR STATS ===== */
  function animateCountUp(el, target, suffix, duration) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  /* Observe stats bar for count-up */
  const statsBar = document.querySelector('.stats-bar');
  let statsAnimated = false;

  if (statsBar) {
    function checkStats() {
      if (statsAnimated) return;
      const rect = statsBar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        statsAnimated = true;
        // Trigger count-ups
        const statNums = statsBar.querySelectorAll('.stat-num');
        // Only the first two have countable numbers
        if (statNums[0]) animateCountUp(statNums[0], 642, '/720', 1500);
        if (statNums[1]) animateCountUp(statNums[1], 99, '%ile', 1200);
      }
    }
    window.addEventListener('scroll', checkStats, { passive: true });
    checkStats();
  }

  /* ===== HERO TYPING EFFECT (tagline) ===== */
  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    const text = taglineEl.textContent;
    taglineEl.textContent = '';
    taglineEl.style.opacity = '1';
    let i = 0;
    const speed = 60;
    function typeWriter() {
      if (i < text.length) {
        taglineEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    setTimeout(typeWriter, 1200);
  }

  /* ===== STICKY NAV HIGHLIGHT INIT ===== */
  // Add ripple to cards on hover (visual touch)
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
      this.style.borderColor = 'rgba(59, 130, 246, 0.35)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.borderColor = '';
    });
  });

  /* ===== INITIALIZE ===== */
  handleNavbarScroll();
  handleBackToTop();
  updateActiveLink();
  observeAnimations();

  // Run once on load for elements already in view
  window.addEventListener('load', function () {
    observeAnimations();
  });

})();
