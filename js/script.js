/* ============================================
   STUDIO GRANIT — script.js
   Vanilla JS · Scroll Reveal · Animations
   ============================================ */

(function () {
  'use strict';

  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');
  var header = document.getElementById('header');
  var backdrop = mobileNav.querySelector('.mobile-nav__backdrop');
  var mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
  var mobileCta = mobileNav.querySelector('.mobile-nav__cta');

  /* ==========================================
     MOBILE MENU
     ========================================== */
  var menuOpen = false;

  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burger.addEventListener('click', toggleMenu);

  // Close on backdrop tap
  backdrop.addEventListener('click', closeMenu);

  // Close on link click
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on CTA click
  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu();
      burger.focus();
    }
  });

  // Close if resized past mobile breakpoint
  window.addEventListener('resize', function () {
    if (menuOpen && window.innerWidth >= 960) {
      closeMenu();
    }
  });

  /* ==========================================
     HEADER SCROLL EFFECT
     ========================================== */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ==========================================
     SMOOTH SCROLL
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        // Small delay to let menu close animation start
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth' });
        }, menuOpen ? 300 : 0);
      }
    });
  });

  /* ==========================================
     SCROLL REVEAL — Intersection Observer
     ========================================== */
  var revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;

        // Stagger children if the element contains a grid
        var grid = el.querySelector('.features__grid, .portfolio__grid, .pricing__grid, .team__grid, .faq__list');
        if (grid) {
          staggerChildren(grid);
        }

        el.classList.add('is-visible');
        revealObserver.unobserve(el);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ==========================================
     STAGGER ANIMATION FOR GRID CHILDREN
     ========================================== */
  function staggerChildren(parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      (function (index) {
        var child = children[index];
        child.style.setProperty('--reveal-delay', (index * 0.12) + 's');
        requestAnimationFrame(function () {
          child.classList.add('is-visible');
        });
      })(i);
    }
  }

  /* ==========================================
     HERO PARALLAX ON MOUSE MOVE (Desktop)
     ========================================== */
  var hero = document.getElementById('hero');
  var blobs = hero ? hero.querySelectorAll('.hero__blob') : [];

  if (blobs.length > 0 && window.matchMedia('(min-width: 960px)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      blobs.forEach(function (blob, index) {
        var speed = (index + 1) * 15;
        blob.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
      });
    });
  }

})();
