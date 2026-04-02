/* ============================================
   STUDIO GRANIT — animations.js
   Vanilla JS · Custom Cursor only
   ============================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ==========================================
     CUSTOM CURSOR (Desktop only)
     ========================================== */
  var isDesktop = window.matchMedia('(min-width: 960px) and (hover: hover)');

  if (isDesktop.matches) {
    var cursor = document.getElementById('cursor');
    if (cursor) {
      var mouseX = 0, mouseY = 0;
      var cursorX = 0, cursorY = 0;
      var cursorDot = cursor.querySelector('.cursor__dot');
      var cursorRing = cursor.querySelector('.cursor__ring');

      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = 'translate3d(' + cursorX + 'px,' + cursorY + 'px, 0)';
        requestAnimationFrame(updateCursor);
      }
      requestAnimationFrame(updateCursor);

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

      document.body.classList.add('has-custom-cursor');
      cursor.style.opacity = '1';
    }
  }

})();
