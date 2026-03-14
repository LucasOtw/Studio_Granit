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

});
