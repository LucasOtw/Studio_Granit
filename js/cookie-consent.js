/* ============================================
   STUDIO GRANIT — cookie-consent.js
   RGPD Cookie Consent + GA4 + Clarity
   ============================================ */

(function () {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-GWC2R2C9G1';
  var CLARITY_PROJECT_ID = 'XXXXXXXXXX';     // TODO: remplacer par ton ID Microsoft Clarity

  var STORAGE_KEY = 'cookie-consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var consent = localStorage.getItem(STORAGE_KEY);

  if (consent === 'accepted') {
    loadAnalytics();
    banner.remove();
  } else if (consent === 'refused') {
    banner.remove();
  } else {
    showBanner();
  }

  function showBanner() {
    banner.removeAttribute('hidden');
    banner.querySelector('.cookie-banner__accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      loadAnalytics();
      hideBanner();
    });
    banner.querySelector('.cookie-banner__refuse').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'refused');
      hideBanner();
    });
  }

  function hideBanner() {
    banner.classList.add('cookie-banner--hidden');
    banner.addEventListener('transitionend', function () {
      banner.remove();
    });
  }

  function loadAnalytics() {
    // Google Analytics 4
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      var gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
      document.head.appendChild(gtagScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
    }

    // Microsoft Clarity
    if (CLARITY_PROJECT_ID !== 'XXXXXXXXXX') {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
    }
  }
})();
