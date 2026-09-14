/* ============================================================
   davidfagan.co.uk — 2026 Animations & Interactions
   Requires GSAP + ScrollTrigger (loaded via CDN in HTML)
   No build step, no npm.
   ============================================================ */

(function () {
  'use strict';

  /* ─── Reduced motion ────────────────────────────────────── */
  // Users who ask for reduced motion get the content, not the choreography.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Fail-safe reveal ──────────────────────────────────── */
  // .reveal-* elements start at opacity:0 in CSS and are only made visible by
  // GSAP. If the CDN is blocked or slow to fail, that leaves the page blank —
  // so clear the hidden state directly whenever GSAP will not be doing it.
  function showAllReveals() {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
      .forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
  }

  /* ─── Init ──────────────────────────────────────────────── */
  // These never depend on GSAP, so run them as soon as the DOM is parsed
  // rather than waiting on images and the CDN.
  initNav();
  initForms();
  initFooterYear();
  initMobileNav();
  initCalEmbed();

  window.addEventListener('load', function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || reduceMotion) {
      showAllReveals();   // graceful no-op if the CDN fails or motion is reduced
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    initHero();
    initRevealAnimations();
    initWorkItems();
    initWorkRotation();
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

  /* ─── Work: random image rotation ──────────────────────── */
  function initWorkRotation() {
    // Image pools for each work item. Order matches the .work-item elements in HTML:
    //   [0] Graphic Design  [1] Photography  [2] Videography
    //
    // To add/remove images: edit the arrays below. Paths are relative to site root.
    // To change rotation speed: adjust INTERVAL_MS (milliseconds between swaps).
    var INTERVAL_MS = 10000; // 10 seconds per image

    var pools = [
      // ── Graphic Design ──────────────────────────────────
      [
        'images/designs/new/2.png',
        'images/designs/new/3.png',
        'images/designs/new/4.png',
        'images/designs/new/5.png',
        'images/designs/new/6.png',
        'images/designs/new/7.png',
        'images/designs/new/20.png',
      ],
      // ── Photography ─────────────────────────────────────
      // A curated spread across the full photo library.
      // Add/remove img filenames to control which photos appear.
      [
        'images/photos/img5.jpg',
        'images/photos/img10.jpg',
        'images/photos/img15.jpg',
        'images/photos/img22.jpg',
        'images/photos/img29.jpg',
        'images/photos/img35.jpg',
        'images/photos/img40.jpg',
        'images/photos/img42.jpg',
        'images/photos/img46.jpg',
      ],
      // ── Videography ─────────────────────────────────────
      [
        'darkimages/pic01.jpg',
        'darkimages/pic02.jpg',
      ],
    ];

    var items = document.querySelectorAll('.work-item');

    items.forEach(function (item, i) {
      var pool = pools[i];
      if (!pool || pool.length < 2) return;

      var img = item.querySelector('.work-item__img-wrap img');
      if (!img) return;

      // Pick a random starting image so each page visit looks different
      var currentIndex = Math.floor(Math.random() * pool.length);
      img.src = pool[currentIndex];

      // Only the NEXT image is preloaded, and only once the first swap is due.
      // Preloading every pool image up front pulled roughly 14 MB on load for
      // pictures most visitors never saw.
      function preload(src) {
        var i = new Image();
        i.src = src;
      }

      // Stagger start times so all three items don't swap simultaneously
      // Item 0: starts at 0ms, Item 1: +1500ms, Item 2: +3000ms
      var staggerDelay = i * 1500;

      setTimeout(function () {
        setInterval(function () {
          // Choose a different index — never repeat the current image
          var nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * pool.length);
          } while (nextIndex === currentIndex);

          preload(pool[nextIndex]);

          // Crossfade: fade out → swap src → fade in
          // Uses GSAP opacity tween (separate from the transform/parallax)
          gsap.to(img, {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.in',
            onComplete: function () {
              img.src = pool[nextIndex];
              currentIndex = nextIndex;
              gsap.to(img, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
              });
            },
          });
        }, INTERVAL_MS);
      }, staggerDelay);
    });
  }

  /* ─── Nav: blur on scroll ───────────────────────────────── */
  // A plain scroll listener rather than a ScrollTrigger, so the nav still
  // styles itself correctly when the GSAP CDN is unavailable.
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;
    function update() {
      nav.classList.toggle('scrolled', window.scrollY > 80);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ─── Mobile nav toggle ─────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('open'));
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // The menu is a mobile-only overlay (CSS hides .nav__links above 720px).
    // Without this, widening the window past the breakpoint left body scroll
    // locked with no visible menu to close.
    window.matchMedia('(min-width: 721px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ─── Forms: validation, submit state, error handling ───── */
  function initForms() {
    handleForm('bookForm', 'bookSuccess');
    handleForm('contactForm', 'contactSuccess');
  }

  // Messages say what to do, not just that something is wrong.
  function messageFor(field) {
    const label = (field.labels && field.labels[0] ? field.labels[0].textContent : field.name)
      .replace(/\s*\(optional\)\s*/i, '').trim().toLowerCase();
    const v = field.validity;
    if (v.valueMissing) {
      return field.tagName === 'SELECT'
        ? 'Please choose a ' + label + '.'
        : 'Please enter your ' + label + '.';
    }
    if (v.typeMismatch && field.type === 'email') {
      return 'That does not look like an email address. Check for a missing “@” or a typo in the domain.';
    }
    if (v.tooShort) {
      return 'Please give a little more detail — at least ' + field.minLength + ' characters.';
    }
    return field.validationMessage || 'Please check this field.';
  }

  function handleForm(formId, successId) {
    const form    = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;

    const fields = Array.prototype.slice.call(
      form.querySelectorAll('input:not([type=hidden]):not([name="_gotcha"]), select, textarea')
    );

    // Build one error node per field, wired up with aria-describedby so screen
    // readers announce the message as part of the field itself.
    fields.forEach(function (field) {
      if (!field.id) return;
      const err = document.createElement('p');
      err.className = 'form-error';
      err.id = field.id + 'Error';
      field.insertAdjacentElement('afterend', err);
    });

    // One shared region for failures that are not about a single field.
    const status = document.createElement('div');
    status.className = 'form-status';
    status.setAttribute('role', 'alert');
    form.querySelector('button[type="submit"]').insertAdjacentElement('afterend', status);

    function errorNode(field) { return document.getElementById(field.id + 'Error'); }

    function showError(field) {
      const node = errorNode(field);
      if (!node) return;
      node.textContent = messageFor(field);
      node.classList.add('visible');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', node.id);
    }

    function clearError(field) {
      const node = errorNode(field);
      if (node) { node.textContent = ''; node.classList.remove('visible'); }
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }

    // Validate on blur, but only re-validate on input once a field has already
    // errored — so nobody is told they are wrong while still typing.
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.value !== '' || field.required) {
          field.checkValidity() ? clearError(field) : showError(field);
        }
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) clearError(field);
      });
    });

    let submitting = false;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (submitting) return;            // guard against double submission

      status.classList.remove('visible');
      status.textContent = '';

      // The form is novalidate, so validation is ours to do. Show every problem
      // at once, then move focus to the first one.
      const invalid = fields.filter(function (f) { return !f.checkValidity(); });
      fields.forEach(function (f) { if (f.checkValidity()) clearError(f); });
      if (invalid.length) {
        invalid.forEach(showError);
        invalid[0].focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;

      submitting = true;
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Sending…';
      success.classList.remove('visible');

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          // Success: clear the form and leave the confirmation in place. The
          // button is NOT restored, so the same message cannot be sent twice
          // by accident.
          form.reset();
          fields.forEach(clearError);
          success.classList.add('visible');
          btn.textContent = 'Sent ✓';
          success.focus && success.setAttribute('tabindex', '-1');
          success.focus && success.focus();
          return;
        }

        // Formspree returns field-level problems in a JSON body. Surface them
        // rather than a generic failure, and never show a raw status code.
        let detail = '';
        try {
          const body = await res.json();
          if (body && Array.isArray(body.errors) && body.errors.length) {
            detail = body.errors.map(function (x) { return x.message; }).join(' ');
          }
        } catch (_) { /* not JSON — fall through to the generic message */ }

        status.innerHTML = (detail || 'Your message could not be sent just now.') +
          ' Your details are still here, so you can try again — or email ' +
          '<a href="mailto:hello@davidfagan.co.uk">hello@davidfagan.co.uk</a> directly.';
        status.classList.add('visible');
      } catch (_) {
        // Network-level failure: offline, DNS, blocked request.
        status.innerHTML = 'Could not reach the server — check your connection and try again. ' +
          'Your details are still here. You can also email ' +
          '<a href="mailto:hello@davidfagan.co.uk">hello@davidfagan.co.uk</a>.';
        status.classList.add('visible');
      } finally {
        // Only re-enable on failure; the success path returns above.
        if (!success.classList.contains('visible')) {
          submitting = false;
          btn.disabled = false;
          btn.removeAttribute('aria-busy');
          btn.textContent = original;
        }
      }
    });
  }

  /* ─── Footer year ───────────────────────────────────────── */
  function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─── Cal.com embed (click to load) ─────────────────────── */
  // The embed sets third-party cookies and pulls a large bundle the moment it
  // initialises, so it stays unloaded until the visitor presses the button.
  // That keeps the page free of pre-consent third-party cookies and takes a
  // sizeable chunk off the initial load of the two pages that use it.
  function initCalEmbed() {
    const host = document.getElementById('cal-embed');
    const btn  = document.getElementById('calLoad');
    if (!host || !btn) return;

    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'Loading calendar…';

      // Cal mounts into this element, so clear the placeholder first.
      host.classList.remove('cal-consent');
      host.innerHTML = '';
      host.setAttribute('aria-busy', 'true');

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

      // If the embed never paints — blocked, offline, Cal.com down — say so
      // rather than leaving an empty box behind.
      setTimeout(function () {
        host.removeAttribute('aria-busy');
        if (!host.querySelector('iframe')) {
          host.innerHTML = '<div class="cal-consent__inner">' +
            '<p>The calendar could not be loaded.</p>' +
            '<span>Please use the request form instead, or email ' +
            '<a href="mailto:hello@davidfagan.co.uk">hello@davidfagan.co.uk</a>.</span></div>';
          host.classList.add('cal-consent');
        }
      }, 8000);
    });
  }

})();
