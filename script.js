const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const siteHeader = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const typedTextEl = document.getElementById('typed-text');

const DARK_CLASS = 'dark';
const STORAGE_KEY = 'portfolio-theme';
const TYPED_TEXT = 'Python Full Stack Developer';

function setTheme(isDark) {
  document.documentElement.classList.toggle(DARK_CLASS, isDark);
  const icon = isDark ? getSunIcon() : getMoonIcon();
  if (themeIcon) themeIcon.innerHTML = icon;
  if (themeIconMobile) themeIconMobile.innerHTML = icon;
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getSunIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>`;
}

function getMoonIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/></svg>`;
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored === 'dark') {
    setTheme(true);
    return;
  }

  if (stored === 'light') {
    setTheme(false);
    return;
  }

  // Default to light mode
  setTheme(false);
}

function initScrollHeader() {
  const onScroll = () => {
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initMobileNav() {
  if (!menuToggle || !mobileNav) return;

  const toggle = () => {
    mobileNav.classList.toggle('open');
    const icon = menuToggle.querySelector('svg');
    if (!icon) return;

    if (mobileNav.classList.contains('open')) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
    } else {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
  };

  menuToggle.addEventListener('click', toggle);

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    const icon = menuToggle.querySelector('svg');
    if (icon) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
  };

  document.querySelectorAll('.mobile-nav-link').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-target');
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }
      closeMenu();
    });
  });
}

function initNavbarLinks() {
  document.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-target');
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('button[data-target]').forEach((button) => {
    if (button.closest('nav')) return;
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-target');
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initTypedText() {
  if (!typedTextEl) return;

  let index = 0;
  const interval = setInterval(() => {
    typedTextEl.textContent = TYPED_TEXT.slice(0, index);
    index += 1;
    if (index > TYPED_TEXT.length) {
      clearInterval(interval);
      typedTextEl.textContent = TYPED_TEXT;
    }
  }, 50);
}

function initSectionAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
}

function initStarField() {
  const container = document.getElementById('star-field');
  if (!container) return;

  for (let i = 0; i < 45; i += 1) {
    const star = document.createElement('div');
    star.className = 'absolute w-1 h-1 rounded-full bg-cyan-400 opacity-0 animate-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 8 + 4}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
}

function initPreloader() {
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('fade-out');
    preloader.addEventListener('transitionend', () => {
      preloader.style.display = 'none';
    });
  }, 2200);
}

function initThemeButtons() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle(DARK_CLASS);
    setTheme(isDark);
  };

  themeToggle?.addEventListener('click', toggle);
  themeToggleMobile?.addEventListener('click', toggle);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
}

function init() {
  initTheme();
  initScrollHeader();
  initNavbarLinks();
  initMobileNav();
  initTypedText();
  initSectionAnimations();
  initStarField();
  initPreloader();
  initThemeButtons();
  initContactForm();
}

init();
