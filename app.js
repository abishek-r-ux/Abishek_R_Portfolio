/**
 * ARUX.OS // Diagnostics Engine, Scroll-Linked Atmosphere & HUD Controller
 * Author: Abishek R. (Senior Product Designer & Design Technologist)
 */

// 1. Disable browser scroll restoration so it doesn't jump down on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 2. Clear lingering hashes like '#capabilities' on fresh page load
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}

// 3. Guarantee viewport anchors strictly at top (0, 0)
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------------------------------------------------
     1. TELEMETRY & SYSTEM CONSTANTS
     ------------------------------------------------------------------------- */
  const DIAGNOSTIC_RECORDS = [
    {
      id: 'row-1',
      category: 'SYSTEMS',
      label: 'Role & Engagement:',
      value: 'Senior Product Designer (FTE) & Systems Consultant',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-2',
      category: 'SYSTEMS',
      label: 'Core Focus:',
      value: 'Enterprise ERP Platforms, Dense UI & Scalable Systems',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-3',
      category: 'STACK',
      label: 'Workflow Engine:',
      value: 'Figma Variables ➔ Design Tokens ➔ Modular Code',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-4',
      category: 'STACK',
      label: 'Design Tokens:',
      value: 'W3C Compliant Spec',
      meta: '[ PARSING: VALID // SYNCED ]',
      isStatus: false
    },
    {
      id: 'row-5',
      category: 'STACK',
      label: 'Core Codebase:',
      value: 'Angular / TypeScript / Tailwind CSS / SCSS',
      meta: null,
      isStatus: true
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
     2. TELEMETRY FEED RENDER & TAB CONTROLLER
     ------------------------------------------------------------------------- */
  function renderDiagnostics(slideAnimationClass = '') {
    const container = document.getElementById('diagnostics-feed');
    if (!container) return;

    const isDesktop = window.innerWidth >= BREAKPOINT_DESKTOP;
    const visibleRecords = isDesktop
      ? DIAGNOSTIC_RECORDS
      : DIAGNOSTIC_RECORDS.filter(record => record.category === activeTab);

    container.className = 'diag-feed-container';
    if (!isDesktop && slideAnimationClass) {
      container.classList.add(slideAnimationClass);
    }

    container.innerHTML = visibleRecords
      .map(item => {
        if (item.isStatus) {
          return `
            <div class="diag-row" id="${item.id}">
              <div class="diag-status-row">
                <div>
                  <div class="diag-label">${item.label}</div>
                  <div class="diag-value">${item.value}</div>
                </div>
                <div class="diag-status-beacon" title="Node Online & Synced">
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
            ${item.meta ? `<div class="diag-meta">${item.meta}</div>` : ''}
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
    // 1. Smooth interpolation
    currentScrollY += (targetScrollY - currentScrollY) * lerpFactor;

    if (glowBlue && glowRed) {
      const isMobile = window.innerWidth < BREAKPOINT_DESKTOP;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      // 2. Continuous rotation: 3 full 360-degree helical revolutions from top to bottom
      const totalRevolutions = 3.0;
      const theta = scrollProgress * (Math.PI * 2 * totalRevolutions);

      // 3. Wide horizontal orbit amplitude
      const amplitudeX = isMobile
        ? window.innerWidth * 0.38
        : Math.min(window.innerWidth * 0.32, 420);

      // 4. Vertical Descent: Orbs travel all the way from the top header to the footer baseline
      // Starts at 10vh (top hero) and sweeps completely down to 80vh (bottom module)
      const startY = window.innerHeight * 0.10;
      const endY = window.innerHeight * 0.80;
      const baseVerticalY = startY + (scrollProgress * (endY - startY));

      // Optional slight ambient idle drift when scrolling pauses
      const time = performance.now() * 0.001;
      const idleWobble = Math.sin(time * 0.8) * 12;

      // --- STRAND 1: Royal Blue Orb ---
      const blueX = Math.cos(theta) * amplitudeX;
      // Anti-phase vertical wave gives the circular twist in 3D projection
      const blueY = baseVerticalY + (Math.sin(theta) * (isMobile ? 40 : 65)) + idleWobble;
      const blueDepth = Math.sin(theta); // -1 (back) to +1 (front)
      const blueScale = 0.85 + ((blueDepth + 1) * 0.22); // 0.85 to 1.29
      const blueOpacity = 0.40 + ((blueDepth + 1) * 0.30); // 0.40 to 1.00

      glowBlue.style.transform = `translate3d(calc(-50% + ${blueX.toFixed(2)}px), ${blueY.toFixed(2)}px, 0) scale(${blueScale.toFixed(3)})`;
      glowBlue.style.opacity = blueOpacity.toFixed(3);
      glowBlue.style.zIndex = blueDepth > 0 ? "2" : "0";

      // --- STRAND 2: Crimson Red Orb (Opposing 180° Strand: theta + PI) ---
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

  // Start continuous descent loop
  requestAnimationFrame(updateDNASpiralGlow);

  /* -------------------------------------------------------------------------
     4. 3D OPTICAL GLASS TILT (Hero Card + Capabilities Cards)
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

  document.querySelectorAll('.capability-card').forEach(card => {
    attachTiltEffect(card, 2.5);
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

      // 1. Copy email address to clipboard
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

      // 2. HUD Visual Confirmation (Declared prior to assignment to avoid ReferenceError)
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const feedbackLabel = isMobile ? `COPIED: ${email}` : `COPIED: ${email} // OPENING...`;
      const originalHTML = ctaBtn.innerHTML;

      ctaBtn.innerHTML = `<span class="cta-pulse-beacon"></span>${feedbackLabel}`;
      ctaBtn.style.backgroundColor = 'var(--color-brand-secondary, #1D4ED8)';

      // 3. Platform Routing
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
    '.section-hud-header, .capability-card, .stack-strip-card'
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
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* -------------------------------------------------------------------------
     7. SCROLLSPY: DYNAMIC ACTIVE NAVBAR LINK CONTROLLER
     ------------------------------------------------------------------------- */
  const sectionIds = ['home', 'capabilities'];
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
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // Snap back to home when user reaches top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 80) {
      setActiveNavLink('home');
    }
  }, { passive: true });

  // Initializations
  setActiveNavLink('home');
  renderDiagnostics();
});