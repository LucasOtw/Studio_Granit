/* ============================================
   STUDIO GRANIT — animations.js
   GSAP + ScrollTrigger · Minimal effects
   ============================================ */

window.addEventListener('load', function () {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ==========================================
     WHY CARD ICONS — Spin in when visible
     ========================================== */
  gsap.utils.toArray('.why-card__icon').forEach(function (icon) {
    gsap.from(icon, {
      rotation: 360,
      scale: 0.5,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ==========================================
     SHOWCASE — Avant/Après slide from sides
     ========================================== */
  var showcaseBefore = document.querySelector('.showcase__col--before');
  var showcaseAfter = document.querySelector('.showcase__col--after');
  var showcaseGrid = document.querySelector('.showcase__grid');

  if (showcaseGrid && showcaseBefore && showcaseAfter) {
    gsap.from(showcaseBefore, {
      x: -60,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: showcaseGrid, start: 'top 80%', once: true }
    });
    gsap.from(showcaseAfter, {
      x: 60,
      duration: 0.8,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: showcaseGrid, start: 'top 80%', once: true }
    });
  }

  /* ==========================================
     CUSTOM CURSOR (Desktop only)
     ========================================== */
  var isDesktop = window.matchMedia('(min-width: 960px)');

  if (isDesktop.matches) {
    var cursor = document.getElementById('cursor');
    if (cursor) {
      var cursorDot = cursor.querySelector('.cursor__dot');
      var cursorRing = cursor.querySelector('.cursor__ring');

      var xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
      var yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });

      document.addEventListener('mousemove', function (e) {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      var interactives = document.querySelectorAll('a, button, .btn, .faq-item summary');
      interactives.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursorRing.classList.add('cursor__ring--hover');
          cursorDot.classList.add('cursor__dot--hover');
        });
        el.addEventListener('mouseleave', function () {
          cursorRing.classList.remove('cursor__ring--hover');
          cursorDot.classList.remove('cursor__dot--hover');
        });
      });

      cursor.style.opacity = '1';
    }
  }

});
