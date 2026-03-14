/* ============================================
   STUDIO GRANIT — animations.js
   GSAP + ScrollTrigger · Wow Effects
   ============================================ */

(function () {
  'use strict';

  // Bail out if GSAP isn't loaded or user prefers reduced motion
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  var isDesktop = window.matchMedia('(min-width: 960px)');

  /* ==========================================
     UTILITY: Split text into words
     ========================================== */
  function splitWords(el) {
    var text = el.textContent;
    var words = text.split(/\s+/);
    el.innerHTML = '';
    words.forEach(function (word, i) {
      var outer = document.createElement('span');
      outer.className = 'word';
      outer.style.overflow = 'hidden';
      outer.style.display = 'inline-block';
      outer.style.verticalAlign = 'top';
      var inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.style.display = 'inline-block';
      inner.textContent = word;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });
    return el.querySelectorAll('.word-inner');
  }

  /* ==========================================
     HERO: Cinematic entrance timeline
     ========================================== */
  var heroTitle = document.querySelector('.hero__title');
  var heroBadge = document.querySelector('.hero__badge');
  var heroSubtitle = document.querySelector('.hero__subtitle');
  var heroActions = document.querySelector('.hero__actions');
  var heroShowcase = document.querySelector('.hero__showcase');
  var heroPills = document.querySelectorAll('.hero__pill');

  if (heroTitle) {
    // Remove data-reveal to prevent double animation
    [heroBadge, heroTitle, heroSubtitle, heroActions].forEach(function (el) {
      if (el) el.removeAttribute('data-reveal');
    });
    if (heroShowcase) heroShowcase.removeAttribute('data-reveal-showcase');

    // Split hero title into words
    var heroAccent = heroTitle.querySelector('.hero__title-accent');
    var accentText = heroAccent ? heroAccent.textContent : '';

    // We need to handle the accent span specially
    var titleWords;
    if (heroAccent) {
      // Get text before accent
      var beforeText = heroTitle.childNodes[0].textContent.trim();
      heroTitle.innerHTML = '';

      // Add words before accent
      beforeText.split(/\s+/).forEach(function (word) {
        var outer = document.createElement('span');
        outer.className = 'word';
        outer.style.overflow = 'hidden';
        outer.style.display = 'inline-block';
        outer.style.verticalAlign = 'top';
        var inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.style.display = 'inline-block';
        inner.textContent = word;
        outer.appendChild(inner);
        heroTitle.appendChild(outer);
        heroTitle.appendChild(document.createTextNode(' '));
      });

      // Add accent words
      var newAccent = document.createElement('span');
      newAccent.className = 'hero__title-accent';
      accentText.split(/\s+/).forEach(function (word, i) {
        var outer = document.createElement('span');
        outer.className = 'word';
        outer.style.overflow = 'hidden';
        outer.style.display = 'inline-block';
        outer.style.verticalAlign = 'top';
        var inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.style.display = 'inline-block';
        inner.textContent = word;
        outer.appendChild(inner);
        newAccent.appendChild(outer);
        if (i < accentText.split(/\s+/).length - 1) {
          newAccent.appendChild(document.createTextNode(' '));
        }
      });
      heroTitle.appendChild(newAccent);

      titleWords = heroTitle.querySelectorAll('.word-inner');
    } else {
      titleWords = splitWords(heroTitle);
    }

    // Set initial states
    gsap.set(heroBadge, { opacity: 0, x: -30 });
    gsap.set(titleWords, { y: '100%' });
    gsap.set(heroSubtitle, { opacity: 0, y: 20 });
    gsap.set(heroActions, { opacity: 0, y: 20 });
    if (heroShowcase) gsap.set(heroShowcase, { opacity: 0, y: 60, scale: 0.95 });
    gsap.set(heroPills, { opacity: 0, scale: 0 });

    // Build entrance timeline
    var heroTL = gsap.timeline({ delay: 0.3 });

    heroTL
      .to(heroBadge, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to(titleWords, {
        y: '0%',
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out'
      }, '-=0.3')
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(heroActions, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to(heroShowcase, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'power2.out'
      }, '-=0.4')
      .to(heroPills, {
        opacity: 1, scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)'
      }, '-=0.3');
  }

  /* ==========================================
     HERO: Scroll-based parallax exit
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
     SECTION REVEALS — Replace data-reveal
     ========================================== */
  // Why cards — staggered with scale
  gsap.utils.toArray('.why-card').forEach(function (card) {
    card.removeAttribute('data-reveal');
    card.classList.add('is-visible'); // prevent default CSS animation

    var icon = card.querySelector('.why-card__icon');

    gsap.from(card, {
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      }
    });

    if (icon) {
      gsap.from(icon, {
        rotation: 360,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });
    }
  });

  // Feature cards — slide from different directions
  var featureCards = gsap.utils.toArray('.feature-card');
  featureCards.forEach(function (card, i) {
    card.removeAttribute('data-reveal');
    card.classList.add('is-visible');

    var xFrom = i === 0 ? -60 : (i === 2 ? 60 : 0);
    var yFrom = i === 1 ? 60 : 0;

    gsap.from(card, {
      x: xFrom,
      y: yFrom,
      opacity: 0,
      rotation: i === 0 ? -2 : (i === 2 ? 2 : 0),
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        once: true
      }
    });
  });

  // Showcase — avant/après slide in from sides
  var showcaseBefore = document.querySelector('.showcase__col--before');
  var showcaseAfter = document.querySelector('.showcase__col--after');
  var showcaseGrid = document.querySelector('.showcase__grid');

  if (showcaseGrid) {
    showcaseGrid.removeAttribute('data-reveal');
    showcaseGrid.classList.add('is-visible');

    if (showcaseBefore) {
      gsap.from(showcaseBefore, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: showcaseGrid, start: 'top 80%', once: true }
      });
    }
    if (showcaseAfter) {
      gsap.from(showcaseAfter, {
        x: 80,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: showcaseGrid, start: 'top 80%', once: true }
      });
    }
  }

  // Showcase testimonial
  var showcaseTestimonial = document.querySelector('.showcase__testimonial');
  if (showcaseTestimonial) {
    showcaseTestimonial.removeAttribute('data-reveal');
    showcaseTestimonial.classList.add('is-visible');

    gsap.from(showcaseTestimonial, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: showcaseTestimonial, start: 'top 85%', once: true }
    });
  }

  // Sector cards — stagger from right
  var sectorCards = gsap.utils.toArray('.sector-card');
  if (sectorCards.length) {
    gsap.from(sectorCards, {
      x: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#realisations',
        start: 'top 75%',
        once: true
      }
    });
  }

  // Process steps — animated timeline
  var processSteps = gsap.utils.toArray('.process__step');
  if (processSteps.length) {
    processSteps.forEach(function (step, i) {
      var num = step.querySelector('.process__number');
      var title = step.querySelector('.process__title');
      var text = step.querySelector('.process__text');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          once: true
        }
      });

      tl.from(num, {
        scale: 0,
        rotation: -180,
        duration: 0.5,
        ease: 'back.out(2)',
        delay: i * 0.15
      })
      .from(title, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .from(text, { y: 15, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    });
  }

  // Team cards — clip-path circle reveal
  var teamCards = gsap.utils.toArray('.team-card');
  teamCards.forEach(function (card) {
    card.removeAttribute('data-reveal');
    card.classList.add('is-visible');

    var img = card.querySelector('.team-card__img');
    var name = card.querySelector('.team-card__name');
    var role = card.querySelector('.team-card__role');
    var bio = card.querySelector('.team-card__bio');

    var tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 85%', once: true }
    });

    if (img) {
      tl.from(img, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
    if (name) tl.from(name, { y: 20, opacity: 0, duration: 0.4 }, '-=0.3');
    if (role) tl.from(role, { y: 15, opacity: 0, duration: 0.3 }, '-=0.2');
    if (bio) tl.from(bio, { y: 10, opacity: 0, duration: 0.4 }, '-=0.1');
  });

  // Pricing cards — slide from sides
  var pricingCards = gsap.utils.toArray('.pricing-card');
  pricingCards.forEach(function (card, i) {
    card.removeAttribute('data-reveal');
    card.classList.add('is-visible');

    gsap.from(card, {
      x: i === 0 ? -50 : 50,
      opacity: 0,
      rotation: i === 0 ? -2 : 2,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true }
    });

    // Stagger feature list items
    var items = card.querySelectorAll('.pricing-card__features li');
    gsap.from(items, {
      x: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 80%', once: true }
    });
  });

  // Featured pricing card glow pulse
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

  // FAQ items stagger
  var faqItems = gsap.utils.toArray('.faq-item');
  if (faqItems.length) {
    gsap.from(faqItems, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#faq',
        start: 'top 80%',
        once: true
      }
    });
  }

  // Contact section
  var contactGrid = document.querySelector('.contact__grid');
  if (contactGrid) {
    contactGrid.removeAttribute('data-reveal');
    contactGrid.classList.add('is-visible');

    var ctaBox = document.querySelector('.contact__cta-box');
    var infoItems = gsap.utils.toArray('.contact__info-item');

    if (ctaBox) {
      gsap.from(ctaBox, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: contactGrid, start: 'top 80%', once: true }
      });
    }

    if (infoItems.length) {
      gsap.from(infoItems, {
        x: 40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: contactGrid, start: 'top 80%', once: true }
      });
    }
  }

  // CTA button pulse
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

  // Footer
  var footerLogo = document.querySelector('.footer__logo-img');
  var footerLinks = gsap.utils.toArray('.footer__links a');
  var footerSocial = gsap.utils.toArray('.footer__social-link');

  if (footerLogo) {
    gsap.from(footerLogo, {
      opacity: 0, scale: 0.8, duration: 0.6,
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true }
    });
  }
  if (footerLinks.length) {
    gsap.from(footerLinks, {
      y: 20, opacity: 0, duration: 0.3, stagger: 0.05,
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true }
    });
  }
  if (footerSocial.length) {
    gsap.from(footerSocial, {
      scale: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true }
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

    section.style.position = 'relative';

    var container = document.createElement('div');
    container.className = 'floating-shapes';
    container.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < cfg.shapes; i++) {
      var shape = document.createElement('span');
      shape.className = 'floating-shape floating-shape--' + shapeTypes[i % shapeTypes.length];
      // Random position
      shape.style.left = (15 + Math.random() * 70) + '%';
      shape.style.top = (10 + Math.random() * 80) + '%';
      container.appendChild(shape);

      // Parallax on scroll
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

      // Show cursor
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
          x: 0,
          y: 0,
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

})();
