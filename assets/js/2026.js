/* ============================================================
   davidfagan.co.uk — 2026 Animations & Interactions
   Requires GSAP + ScrollTrigger (loaded via CDN in HTML)
   No build step, no npm.
   ============================================================ */

(function () {
  'use strict';

  /* ─── GSAP Init ─────────────────────────────────────────── */
  // Wait for GSAP CDN scripts to load
  window.addEventListener('load', function () {
    if (typeof gsap === 'undefined') return; // graceful no-op if CDN fails

    gsap.registerPlugin(ScrollTrigger);

    initHero();
    initRevealAnimations();
    initServiceCards();
    initWorkItems();
    initNav();
    initForms();
    initFooterYear();
    initMobileNav();
  });

  /* ─── Hero: background zoom on scroll ─────────────────── */
  function initHero() {
    const heroBg = document.getElementById('heroBg');
    if (!heroBg) return;

    // Background scales from 1 → 1.25 as you scroll hero out of view
    gsap.to(heroBg, {
      scale: 1.25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Heading words stagger in on load
    const words = document.querySelectorAll('.hero__heading span');
    if (words.length) {
      gsap.from(words, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.3,
      });
    }

    // Set hero sub-elements hidden immediately, then animate in
    // (these don't use the reveal-up CSS class, so we control state entirely here)
    const heroSubEls = ['.hero__eyebrow', '.hero__sub', '.hero__actions', '.hero__scroll'];
    gsap.set(heroSubEls, { y: 30, opacity: 0 });
    gsap.to(heroSubEls, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.7,
    });
  }

  /* ─── Generic scroll reveal ────────────────────────────── */
  function initRevealAnimations() {
    // .reveal-up elements — staggered within same parent
    const upEls = gsap.utils.toArray('.reveal-up');
    upEls.forEach(function (el) {
      // Check for data-delay to offset sibling staggering
      const delay = parseFloat(el.dataset.delay || 0) * 0.12;

      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Slide in from left
    gsap.utils.toArray('.reveal-left').forEach(function (el) {
      gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Slide in from right
    gsap.utils.toArray('.reveal-right').forEach(function (el) {
      gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  /* ─── Services: stagger cards ───────────────────────────── */
  function initServiceCards() {
    const grid = document.querySelector('.services__grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.service-card');
    gsap.from(cards, {
      y: 55,
      opacity: 0,
      duration: 0.8,
      stagger: 0.13,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  }

  /* ─── Work: image parallax on hover ─────────────────────── */
  function initWorkItems() {
    // Subtle vertical parallax on scroll for work images
    gsap.utils.toArray('.work-item__img-wrap').forEach(function (wrap) {
      gsap.to(wrap.querySelector('img'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  /* ─── Nav: show/hide & blur on scroll ───────────────────── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    ScrollTrigger.create({
      start: 80,
      onEnter: function () { nav.classList.add('scrolled'); },
      onLeaveBack: function () { nav.classList.remove('scrolled'); },
    });
  }

  /* ─── Mobile nav toggle ─────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Forms: AJAX submit via Formspree ──────────────────── */
  function initForms() {
    handleForm('bookForm', 'bookSuccess');
    handleForm('contactForm', 'contactSuccess');
  }

  function handleForm(formId, successId) {
    const form    = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;

    // Don't submit if Formspree ID hasn't been set yet
    const action = form.getAttribute('action') || '';
    if (action.includes('YOUR_FORMSPREE_ID')) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        success.textContent = '⚠️  Formspree not yet configured — see code comments.';
        success.classList.add('visible');
      });
      return;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          form.reset();
          success.classList.add('visible');
          btn.textContent = 'Sent ✓';
        } else {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }

      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 4000);
    });
  }

  /* ─── Footer year ───────────────────────────────────────── */
  function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─── Cal.com embed ─────────────────────────────────────── */
  /*
    TO ENABLE CALENDAR BOOKING:
    1. Go to https://cal.com and create a free account
    2. Create your event types (e.g. "Photography Session", "Web Consultation")
    3. Replace 'YOUR_CAL_USERNAME' below with your Cal.com username
    4. Uncomment the block below and remove the .cal-placeholder div in index.html

  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === 'string' ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');

  Cal('init', { origin: 'https://cal.com' });
  Cal('inline', {
    elementOrSelector: '#cal-embed',
    calLink: 'YOUR_CAL_USERNAME',
    layout: 'month_view',
  });
  Cal('ui', {
    styles: { branding: { brandColor: '#9f5ec2' } },
    hideEventTypeDetails: false,
  });
  */

})();
