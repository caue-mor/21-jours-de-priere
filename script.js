/**
 * 21 JOURS DE PRIÈRE - Landing Page Scripts
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initAOS();
  initMobileMenu();
  initHeaderScroll();
  initWeekAccordion();
  initFaqAccordion();
  initSmoothScroll();
  initStickyCta();
});

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      disable: window.innerWidth < 768 ? 'mobile' : false
    });
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');

    // Update aria-expanded
    const isExpanded = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', isExpanded);

    // Toggle body scroll when menu is open
    document.body.classList.toggle('no-scroll', isExpanded);
  });

  // Close menu when clicking on a link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Week Accordion (Content Section)
 */
function initWeekAccordion() {
  const weekHeaders = document.querySelectorAll('.week-header');

  weekHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      const accordion = this.closest('.week-accordion');
      const content = accordion.querySelector('.week-content');
      const isActive = accordion.classList.contains('active');

      // Close all other accordions
      document.querySelectorAll('.week-accordion').forEach(function(item) {
        if (item !== accordion) {
          item.classList.remove('active');
          const itemContent = item.querySelector('.week-content');
          if (itemContent) {
            itemContent.classList.add('hidden');
          }
        }
      });

      // Toggle current accordion
      if (isActive) {
        accordion.classList.remove('active');
        content.classList.add('hidden');
      } else {
        accordion.classList.add('active');
        content.classList.remove('hidden');
      }
    });

    // Keyboard accessibility
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(function(faq) {
        if (faq !== item) {
          faq.classList.remove('active');
          const faqAnswer = faq.querySelector('.faq-answer');
          if (faqAnswer) {
            faqAnswer.classList.add('hidden');
          }
        }
      });

      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
        answer.classList.add('hidden');
      } else {
        item.classList.add('active');
        answer.classList.remove('hidden');
      }
    });

    // Keyboard accessibility
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Skip if it's just "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Sticky CTA on Mobile
 */
function initStickyCta() {
  const stickyCta = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');
  const footer = document.querySelector('footer');

  if (!stickyCta || !hero) return;

  // Only show on mobile
  if (window.innerWidth >= 768) {
    stickyCta.style.display = 'none';
    return;
  }

  const heroBottom = hero.offsetTop + hero.offsetHeight;

  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const footerTop = footer ? footer.offsetTop : Infinity;
    const windowHeight = window.innerHeight;

    // Show sticky CTA after scrolling past hero
    if (scrollPosition > heroBottom && (scrollPosition + windowHeight) < footerTop) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }, { passive: true });

  // Handle resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      stickyCta.style.display = 'none';
      stickyCta.classList.remove('visible');
    } else {
      stickyCta.style.display = '';
    }
  }, { passive: true });
}

/**
 * Track CTA Clicks (for analytics)
 */
function trackCtaClick(ctaName) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'cta_click', {
      'cta_name': ctaName,
      'page_location': window.location.href
    });
  }

  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: '21 Jours de Prière',
      content_category: 'Digital Product',
      value: 17.00,
      currency: 'EUR'
    });
  }
}

// Add click tracking to CTA buttons
document.querySelectorAll('a[href="#offre"], a[href*="checkout"], .offer-cta').forEach(function(cta) {
  cta.addEventListener('click', function() {
    const ctaText = this.textContent.trim();
    trackCtaClick(ctaText);
  });
});

/**
 * Lazy Load Images (Native + Fallback)
 */
function initLazyLoad() {
  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
}

/**
 * Cookie Consent Banner
 */
function initCookieBanner() {
  const cookieConsent = localStorage.getItem('cookieConsent');

  if (!cookieConsent) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre <a href="politique-confidentialite.html" style="color: #d69e2e; text-decoration: underline;">politique de confidentialité</a>.</p>
      <button id="accept-cookies">Accepter</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'true');
      banner.remove();
    });
  }
}

// Initialize cookie banner after a short delay
setTimeout(initCookieBanner, 2000);

/**
 * Performance: Preload critical resources
 */
function preloadResources() {
  // Preload LCP image if exists
  const heroImage = document.querySelector('#hero img');
  if (heroImage && heroImage.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage.src;
    document.head.appendChild(link);
  }
}

// Run preload on page load
preloadResources();

/**
 * Scroll Progress Indicator (Optional)
 */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #d69e2e, #319795);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

// Uncomment to enable scroll progress
// initScrollProgress();

/**
 * Debounce utility function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = function() {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle utility function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Console Easter Egg
 */
console.log('%c🙏 21 Jours de Prière', 'font-size: 24px; font-weight: bold; color: #1a365d;');
console.log('%cTransformez votre vie de prière avec ce parcours spirituel guidé.', 'font-size: 14px; color: #4a5568;');
console.log('%c→ https://21joursdepriere.com', 'font-size: 12px; color: #319795;');
