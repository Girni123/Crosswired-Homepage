/* ============================================================
   CROSSWIRED — V01 Interactive JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll-triggered header ── */
  const header = document.getElementById('header');
  const heroHeight = window.innerHeight * 0.4;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ── Mobile Menu ── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ── Intersection Observer – scroll animations ── */
  const animTargets = document.querySelectorAll(
    '.fade-up, .fade-in, .fade-left, .fade-right'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  animTargets.forEach(el => observer.observe(el));


  /* ── Process Step highlight on scroll ── */
  const processSteps = document.querySelectorAll('.process-step');

  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger-activate each step
          setTimeout(() => {
            entry.target.classList.add('active');
          }, i * 120);
        }
      });
    },
    { threshold: 0.4 }
  );

  processSteps.forEach(step => processObserver.observe(step));


  /* ── Counter animation for story stats ── */
  function animateCount(el, target, duration = 1800) {
    const start    = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString('de-DE') + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statNums = document.querySelectorAll('[data-count]');

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          animateCount(entry.target, target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => statObserver.observe(el));


  /* ── Subtle parallax on hero visual ── */
  const heroVisual = document.querySelector('.hero-visual');
  let ticking      = false;

  if (heroVisual && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ── Mouse ambient glow follow (desktop only) ── */
  const ambientOrbs = document.querySelectorAll('.orb');

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX   = mouseX;
    let curY   = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function lerpOrbs() {
      const lerp = 0.04;
      curX = curX + (mouseX - curX) * lerp;
      curY = curY + (mouseY - curY) * lerp;

      const orb1 = document.querySelector('.orb-1');
      if (orb1) {
        const dx = (curX / window.innerWidth  - 0.5) * 60;
        const dy = (curY / window.innerHeight - 0.5) * 40;
        orb1.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      requestAnimationFrame(lerpOrbs);
    }

    requestAnimationFrame(lerpOrbs);
  }


  /* ── Path card glass-wipe hover (ensure CSS transition runs correctly) ── */
  const pathCards = document.querySelectorAll('.path-card');

  pathCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const wipe = card.querySelector('.glass-wipe');
      if (wipe) wipe.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      const wipe = card.querySelector('.glass-wipe');
      if (wipe) wipe.style.opacity = '0.8';
    });
  });


  /* ── Contact form ── */
  const contactForm    = document.getElementById('contact-form');
  const formSuccess    = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      if (btn) {
        btn.disabled    = true;
        btn.textContent = 'Wird gesendet…';
      }

      // Simulate async send
      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 800);
    });
  }


  /* ── Smooth scroll for nav anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset      = header ? header.offsetHeight + 16 : 80;
        const targetY     = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });


  /* ── Active nav highlight on scroll ── */
  const navLinks   = document.querySelectorAll('nav a[href^="#"]');
  const sections   = Array.from(navLinks).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;

    let current = sections[0];
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) current = sec;
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current.id}`;
      link.style.color = isActive ? 'var(--text-primary)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* ── Stagger children in feature grid ── */
  document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
    card.classList.add('fade-up');
    card.classList.add(`delay-${i + 1}`);
    observer.observe(card);
  });

  /* ── Re-observe newly added animated elements ── */
  document.querySelectorAll('.process-step').forEach((el, i) => {
    el.querySelector('.process-dot')?.setAttribute('data-idx', i);
  });

})();
