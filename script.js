/* A Cup Full Cafe | No dependencies, no build process. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const label = document.querySelector('.toggle-label');
  const setMenu = (open, returnFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Close' : 'Menu';
    if (returnFocus) toggle.focus();
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (header && !header.contains(event.target)) setMenu(false);
  });
  // A non-modal navigation disclosure: close when keyboard focus leaves the header.
  header?.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) setMenu(false);
    });
  });
  const desktop = window.matchMedia('(min-width: 951px)');
  desktop.addEventListener?.('change', () => setMenu(false));
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  // Progressive enhancement: all content remains visible if JavaScript is disabled.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.welcome, .section-heading, .coffee-copy, .food-copy, .sweet > div, .community-inner, .events > div, .about-layout > div, .reputation, .visit-layout > div').forEach((element) => {
      // Never hide an element already in the viewport on initial load.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-ready');
        observer.observe(element);
      }
    });
  }
})();
