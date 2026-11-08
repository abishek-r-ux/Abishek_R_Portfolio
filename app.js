/**
 * ARUX.OS // Diagnostics Engine, Scroll-Linked Atmosphere & HUD Controller
 * Author: Abishek R. (Senior Product Designer & Design Technologist)
 */

// 1. Disable browser scroll restoration so it doesn't jump down on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 2. Clear lingering hashes like '#capabilities' or '#casestudies' on fresh page load
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}

// 3. Guarantee viewport anchors strictly at top (0, 0)
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------------------------------------------------
     1. STREAMLINED TELEMETRY RECORDS (3 High-Signal Rows)
     ------------------------------------------------------------------------- */
  const DIAGNOSTIC_RECORDS = [
    {
      id: 'row-1',
      category: 'SYSTEMS',
      label: 'ENGAGEMENT MODEL:',
      value: 'Full-Time Lead (FTE) & Strategic Systems Consulting',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-2',
      category: 'SYSTEMS',
      label: 'CORE EXPERTISE:',
      value: 'High-Density Platforms, Enterprise SaaS & UI Architecture',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-3',
      label: 'PRODUCTION STACK:',
      value: 'Angular · TypeScript · Tailwind CSS · W3C Tokens',
      isStatusRow: false
    },
    {
      id: 'row-4',
      label: 'SYSTEM RUNTIME:',
      value: 'NODE_01 // CONTRACT & FTE READY',
      isStatusRow: true
    }
  ];

  const heroCard = document.querySelector('.hero-card-col .liquid-glass-card');
  const tabsContainer = document.querySelector('.tabs-container');
  const ctaBtn = document.getElementById('main-cta-btn');
  const glowBlue = document.querySelector('.ambient-glow-blue');
  const glowRed = document.querySelector('.ambient-glow-red');
  const BREAKPOINT_DESKTOP = 1024;

  let activeTab = 'SYSTEMS';

  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }

  /* -------------------------------------------------------------------------
       2. TELEMETRY FEED RENDER (Direct 4-Row Architecture)
       ------------------------------------------------------------------------- */
  function renderDiagnostics() {
    const container = document.getElementById('diagnostics-feed');
    if (!container) return;

    container.className = 'diag-feed-container';
    container.innerHTML = DIAGNOSTIC_RECORDS
      .map(item => {
        if (item.isStatusRow) {
          return `
            <div class="diag-row diag-row-status" id="${item.id}">
              <div class="diag-label">${item.label}</div>
              <div class="diag-status-row">
                <span class="diag-runtime-node">${item.value}</span>
                <div class="diag-status-beacon" title="System Online & Ready">
                  <span class="status-beacon-dot"></span>
                  SYS_ONLINE
                </div>
              </div>
            </div>
          `;
        }

        return `
          <div class="diag-row" id="${item.id}">
            <div class="diag-label">${item.label}</div>
            <div class="diag-value">${item.value}</div>
          </div>
        `;
      })
      .join('');
  }

  function switchTab(btn) {
    if (!btn) return;
    const targetTab = btn.getAttribute('data-tab');
    if (!targetTab || targetTab === activeTab) return;

    const previousTab = activeTab;
    activeTab = targetTab;

    if (tabsContainer) {
      tabsContainer.setAttribute('data-active', activeTab);
    }

    document.querySelectorAll('.tab-btn').forEach(b => {
      const isCurrent = b.getAttribute('data-tab') === activeTab;
      b.classList.toggle('active', isCurrent);
      b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    const isMovingForward = previousTab === 'SYSTEMS' && targetTab === 'STACK';
    const slideClass = isMovingForward ? 'slide-from-right' : 'slide-from-left';

    renderDiagnostics(slideClass);
  }

  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn);
    });
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDiagnostics();
    }, 100);
  });

  /* -------------------------------------------------------------------------
     3. DUAL-HELIX DNA SPIRAL (Full Top-to-Bottom Vertical Descent Engine)
     ------------------------------------------------------------------------- */
  let currentScrollY = window.scrollY || 0;
  let targetScrollY = currentScrollY;
  const lerpFactor = 0.07; // Dampened inertia for fluid motion

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY || 0;
  }, { passive: true });

  function updateDNASpiralGlow() {
    currentScrollY += (targetScrollY - currentScrollY) * lerpFactor;

    if (glowBlue && glowRed) {
      const isMobile = window.innerWidth < BREAKPOINT_DESKTOP;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      // Continuous 3 full helical rotations from page top to bottom
      const totalRevolutions = 3.0;
      const theta = scrollProgress * (Math.PI * 2 * totalRevolutions);

      const amplitudeX = isMobile
        ? window.innerWidth * 0.38
        : Math.min(window.innerWidth * 0.32, 420);

      // Starts near header (10vh) and descends across sections down to 80vh
      const startY = window.innerHeight * 0.10;
      const endY = window.innerHeight * 0.80;
      const baseVerticalY = startY + (scrollProgress * (endY - startY));

      const time = performance.now() * 0.001;
      const idleWobble = Math.sin(time * 0.8) * 12;

      // STRAND 1: Royal Blue Orb
      const blueX = Math.cos(theta) * amplitudeX;
      const blueY = baseVerticalY + (Math.sin(theta) * (isMobile ? 40 : 65)) + idleWobble;
      const blueDepth = Math.sin(theta); // -1 (back) to +1 (front)
      const blueScale = 0.85 + ((blueDepth + 1) * 0.22);
      const blueOpacity = 0.40 + ((blueDepth + 1) * 0.30);

      glowBlue.style.transform = `translate3d(calc(-50% + ${blueX.toFixed(2)}px), ${blueY.toFixed(2)}px, 0) scale(${blueScale.toFixed(3)})`;
      glowBlue.style.opacity = blueOpacity.toFixed(3);
      glowBlue.style.zIndex = blueDepth > 0 ? "2" : "0";

      // STRAND 2: Crimson Red Orb (Opposing 180° phase: theta + PI)
      const redX = Math.cos(theta + Math.PI) * amplitudeX;
      const redY = baseVerticalY + (Math.sin(theta + Math.PI) * (isMobile ? 40 : 65)) - idleWobble;
      const redDepth = Math.sin(theta + Math.PI);
      const redScale = 0.85 + ((redDepth + 1) * 0.22);
      const redOpacity = 0.40 + ((redDepth + 1) * 0.30);

      glowRed.style.transform = `translate3d(calc(-50% + ${redX.toFixed(2)}px), ${redY.toFixed(2)}px, 0) scale(${redScale.toFixed(3)})`;
      glowRed.style.opacity = redOpacity.toFixed(3);
      glowRed.style.zIndex = redDepth > 0 ? "2" : "0";
    }

    requestAnimationFrame(updateDNASpiralGlow);
  }

  requestAnimationFrame(updateDNASpiralGlow);

  /* -------------------------------------------------------------------------
     4. 3D OPTICAL GLASS TILT (Disabled on Touch Devices)
     ------------------------------------------------------------------------- */
  function attachTiltEffect(el, intensity = 3.2) {
    if (!el || window.innerWidth < BREAKPOINT_DESKTOP || isTouchDevice()) return;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  if (heroCard) {
    attachTiltEffect(heroCard, 3.2);
  }

  document.querySelectorAll('.capability-card, .case-study-card').forEach(card => {
    attachTiltEffect(card, 2.0);
  });

  /* -------------------------------------------------------------------------
     5. TACTICAL CTA COMMS TRANSMITTER (Windows OS Safe Smart-Router)
     ------------------------------------------------------------------------- */
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const email = ctaBtn.getAttribute('data-email') || 'abishekrux@gmail.com';
      const subject = ctaBtn.getAttribute('data-subject') || 'Engagement Inquiry // ARUX.OS';
      const encodedSubject = encodeURIComponent(subject);

      // 1. Clipboard copy fallback
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // 2. HUD visual feedback
      const isMobile = isTouchDevice();
      const feedbackLabel = isMobile ? `COPIED: ${email}` : `COPIED: ${email} // OPENING...`;
      const originalHTML = ctaBtn.innerHTML;

      ctaBtn.innerHTML = `<span class="cta-pulse-beacon"></span>${feedbackLabel}`;
      ctaBtn.style.backgroundColor = 'var(--color-brand-secondary, #1D4ED8)';

      // 3. Routing
      setTimeout(() => {
        if (isMobile) {
          window.location.href = `mailto:${email}?subject=${encodedSubject}`;
        } else {
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}`;
          window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        }

        setTimeout(() => {
          ctaBtn.innerHTML = originalHTML;
          ctaBtn.style.backgroundColor = '';
        }, 2400);
      }, 400);
    });
  }

  /* -------------------------------------------------------------------------
     6. HUD SCROLL REVEAL (Intersection Observer)
     ------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.section-hud-header, .capabilities-hud-river, .case-study-card'
  );

  if (revealElements.length > 0) {
    revealElements.forEach(el => el.classList.add('hud-scroll-reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* -------------------------------------------------------------------------
     7. SCROLLSPY: DYNAMIC ACTIVE NAVBAR LINK CONTROLLER
     ------------------------------------------------------------------------- */
  const sectionIds = ['home', 'capabilities', 'casestudies'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveNavLink(activeId) {
    const navbarHost = document.querySelector('site-navbar');
    const root = navbarHost && navbarHost.shadowRoot ? navbarHost.shadowRoot : document;
    const navLinks = root.querySelectorAll('.nav-cyber-link, .mobile-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const targetId = href.replace('#', '');

      if (targetId === activeId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNavLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // Snap back to home when user reaches the very top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 80) {
      setActiveNavLink('home');
    }
  }, { passive: true });

  // Initial runs
  setActiveNavLink('home');
  renderDiagnostics();
});