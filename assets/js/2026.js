/* ============================================================
   davidfagan.co.uk — 2026 Animations & Interactions
   Requires GSAP + ScrollTrigger (loaded via CDN in HTML)
   No build step, no npm.
   ============================================================ */

(function () {
  'use strict';

  /* ─── GSAP Init ─────────────────────────────────────────── */
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

  /* ─── Hero: background zoom + content parallax exit ─────── */
  function initHero() {
    const heroBg     = document.getElementById('heroBg');
    const heroContent = document.querySelector('.hero__content');
    if (!heroBg) return;

    // ── Background zoom ───────────────────────────────────────
    // BEFORE: scale 1 → 1.25, ease: none, scrub: 1.5
    // AFTER : scale 1 → 1.6  (60% growth — clearly visible)
    //         ease: 'power2.in' (accelerates as you scroll, feels physical)
    //         scrub: 1 (snappier scroll tracking)
    // To adjust intensity: change the scale value (1.4 = moderate, 1.8 = very dramatic)
    gsap.to(heroBg, {
      scale: 1.6,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // ── Hero content: parallax exit (NEW) ─────────────────────
    // The content drifts UP and fades OUT as you scroll down.
    // This creates Apple-style depth contrast: foreground leaves,
    // background zooms in behind it. Without this, the zoom feels flat.
    // To adjust: change y (-60 = subtle, -80 = standard, -120 = dramatic)
    // To adjust: change the end scrub point (50% = fast exit, 70% = slow exit)
    if (heroContent) {
      gsap.to(heroContent, {
        y: -90,
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '55% top',
          scrub: 1.2,
        },
      });
    }

    // ── Heading words: stagger in on load ────────────────────
    // Unchanged — already well-tuned
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

    // ── Hero sub-elements: staggered reveal ──────────────────
    // Unchanged — already well-tuned
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
    // ── Reveal up ─────────────────────────────────────────────
    // BEFORE: y: 40px, opacity fade only, power3.out, 0.85s
    // AFTER : y: 60px (via CSS), ADDS scale 0.92 → 1, power4.out, 0.95s
    //
    // The scale component is the key Apple trick: elements emerge from
    // slightly smaller, making them feel like they're "arriving" into place.
    // CSS sets initial state: opacity:0, translateY(60px) scale(0.92)
    // GSAP animates to: opacity:1, y:0, scale:1
    const upEls = gsap.utils.toArray('.reveal-up');

    upEls.forEach(function (el) {
      const delay = parseFloat(el.dataset.delay || 0) * 0.12;

      gsap.to(el, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.95,
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Reveal left ───────────────────────────────────────────
    // BEFORE: x: -40px, opacity only
    // AFTER : x: -50px (CSS), ADDS scale 0.96 → 1
    gsap.utils.toArray('.reveal-left').forEach(function (el) {
      gsap.to(el, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Reveal right ──────────────────────────────────────────
    // BEFORE: x: 40px, opacity only
    // AFTER : x: 50px (CSS), ADDS scale 0.96 → 1
    gsap.utils.toArray('.reveal-right').forEach(function (el) {
      gsap.to(el, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  /* ─── Services: stagger cards with scale ───────────────── */
  function initServiceCards() {
    const grid = document.querySelector('.services__grid');
    if (!grid) return;

    // Cards have reveal-up class (CSS: opacity:0, translateY(60px) scale(0.92)).
    // initRevealAnimations() handles them per-card. This overrides with a grouped
    // stagger for a more polished cascade. Uses gsap.to (not gsap.from) so it
    // animates FROM current state TO visible — no risk of setting a hidden state
    // that never gets cleared.
    // To adjust stagger: 0.08 = faster cascade, 0.15 = slower cascade
    const cards = grid.querySelectorAll('.service-card');
    gsap.to(cards, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /* ─── Work: image parallax on scroll ────────────────────── */
  function initWorkItems() {
    // BEFORE: yPercent: -8 (barely visible)
    // AFTER : yPercent: -18 (2.25× stronger — clearly visible depth)
    //
    // Images are set to height: 120% in CSS to prevent gaps at extremes.
    // GSAP controls the vertical shift; CSS transition handles hover brightness.
    //
    // To adjust depth: -10 = subtle, -18 = standard, -28 = dramatic
    gsap.utils.toArray('.work-item__img-wrap').forEach(function (wrap) {
      gsap.to(wrap.querySelector('img'), {
        yPercent: -18,
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

  /*  TO ENABLE CALENDAR BOOKING:
    1. Go to https://cal.com and create a free account
    2. Create your event types (e.g. "Photography Session", "Web Consultation")
    3. Replace 'YOUR_CAL_USERNAME' below with your Cal.com username
    4. Uncomment the block below and remove the .cal-placeholder div in index.html */

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
  })(window, 'https://app.cal.eu/embed/embed.js', 'init');

  Cal('init', { origin: 'https://cal.eu' });
  Cal('inline', {
    elementOrSelector: '#cal-embed',
    calLink: 'dfdesign',
    layout: 'month_view',
  });
  Cal('ui', {
    styles: { branding: { brandColor: '#9f5ec2' } },
    hideEventTypeDetails: false,
  });


})();
