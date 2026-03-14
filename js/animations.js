/* ============================================
   STUDIO GRANIT — animations.js
   GSAP + ScrollTrigger · Wow Effects
   Layered ON TOP of existing data-reveal system
   ============================================ */

window.addEventListener('load', function () {
  'use strict';

  // Bail out if GSAP isn't loaded or user prefers reduced motion
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  var isDesktop = window.matchMedia('(min-width: 960px)');

  /* ==========================================
     HERO: Enhanced entrance (no DOM rewrite)
     ========================================== */
  var heroBadge = document.querySelector('.hero__badge');
  var heroTitle = document.querySelector('.hero__title');
  var heroSubtitle = document.querySelector('.hero__subtitle');
  var heroActions = document.querySelector('.hero__actions');
  var heroShowcase = document.querySelector('.hero__showcase');
  var heroPills = document.querySelectorAll('.hero__pill');

  // Override the data-reveal with a cinematic GSAP timeline
  if (heroTitle) {
    // Remove data-reveal so the CSS system doesn't also animate
    [heroBadge, heroTitle, heroSubtitle, heroActions].forEach(function (el) {
      if (el) {
        el.removeAttribute('data-reveal');
        el.classList.remove('is-visible');
      }
    });
    if (heroShowcase) {
      heroShowcase.removeAttribute('data-reveal-showcase');
      heroShowcase.classList.remove('is-visible');
    }

    // Set initial states (hidden)
    gsap.set([heroBadge, heroTitle, heroSubtitle, heroActions], {
      opacity: 0, y: 30
    });
    if (heroShowcase) {
      gsap.set(heroShowcase, { opacity: 0, y: 50, scale: 0.96 });
    }
    gsap.set(heroPills, { opacity: 0, scale: 0 });

    // Animate in
    var heroTL = gsap.timeline({ delay: 0.2 });

    heroTL
      .to(heroBadge, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to(heroTitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(heroActions, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    if (heroShowcase) {
      heroTL.to(heroShowcase, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'power2.out'
      }, '-=0.4');
    }

    heroTL.to(heroPills, {
      opacity: 1, scale: 1,
      duration: 0.4, stagger: 0.1,
      ease: 'back.out(2)'
    }, '-=0.3');
  }

  /* ==========================================
     HERO: Scroll-based parallax exit (desktop)
     ========================================== */
  var heroContent = document.querySelector('.hero__content');
  if (heroContent && isDesktop.matches) {
    gsap.to(heroContent, {
      y: -80,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ==========================================
     BONUS EFFECTS — On top of data-reveal
     These don't replace data-reveal, they add
     extra flair to elements already revealed.
     ========================================== */

  // Why card icons — spin in when visible
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

  // Showcase — avant/après slide in from sides
  var showcaseBefore = document.querySelector('.showcase__col--before');
  var showcaseAfter = document.querySelector('.showcase__col--after');
  var showcaseGrid = document.querySelector('.showcase__grid');

  if (showcaseGrid && showcaseBefore && showcaseAfter) {
    // Let data-reveal handle opacity, we add directional movement
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

  // Process step numbers — pop with spin
  gsap.utils.toArray('.process__number').forEach(function (num, i) {
    gsap.from(num, {
      scale: 0,
      rotation: -180,
      duration: 0.5,
      delay: i * 0.15,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: num,
        start: 'top 88%',
        once: true
      }
    });
  });

  // Pricing featured card — glow pulse
  var featuredCard = document.querySelector('.pricing-card--featured');
  if (featuredCard) {
    gsap.to(featuredCard, {
      boxShadow: '0 0 40px rgba(1, 73, 173, 0.25), 0 0 80px rgba(1, 73, 173, 0.1)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Contact CTA button — subtle pulse
  var mainCta = document.querySelector('.contact__cta-btn');
  if (mainCta) {
    gsap.to(mainCta, {
      scale: 1.03,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  /* ==========================================
     FLOATING BACKGROUND SHAPES
     ========================================== */
  var shapeSections = [
    { id: 'features', shapes: 3 },
    { id: 'process', shapes: 3 },
    { id: 'tarifs', shapes: 2 }
  ];

  var shapeTypes = ['circle', 'cross', 'dot'];

  shapeSections.forEach(function (cfg) {
    var section = document.getElementById(cfg.id);
    if (!section) return;

    var container = document.createElement('div');
    container.className = 'floating-shapes';
    container.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < cfg.shapes; i++) {
      var shape = document.createElement('span');
      shape.className = 'floating-shape floating-shape--' + shapeTypes[i % shapeTypes.length];
      shape.style.left = (15 + Math.random() * 70) + '%';
      shape.style.top = (10 + Math.random() * 80) + '%';
      container.appendChild(shape);

      gsap.to(shape, {
        y: -60 - Math.random() * 80,
        rotation: 90 + Math.random() * 180,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    section.insertBefore(container, section.firstChild);
  });

  /* ==========================================
     CUSTOM CURSOR (Desktop only)
     ========================================== */
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

      // Hover effect on interactive elements
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

  /* ==========================================
     MAGNETIC BUTTONS (Desktop only)
     ========================================== */
  if (isDesktop.matches) {
    var magneticBtns = document.querySelectorAll('.btn--primary, .btn--outline');

    magneticBtns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0, y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  /* ==========================================
     WAVE PARALLAX ON SCROLL
     ========================================== */
  gsap.utils.toArray('.wave').forEach(function (wave) {
    gsap.to(wave, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: wave,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

});
