/**
 * ARUX.OS // Diagnostics Engine & Dynamic Viewport HUD Controller
 * Author: Abishek R. (Senior Product Designer & Design Technologist)
 */

document.addEventListener('DOMContentLoaded', () => {
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

  const cardElement = document.querySelector('.liquid-glass-card');
  const tabsContainer = document.querySelector('.tabs-container');
  const ctaBtn = document.getElementById('main-cta-btn');
  const BREAKPOINT_DESKTOP = 1024;

  let activeTab = 'SYSTEMS';

  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }

  // Render Telemetry Rows with Directional Slide Class Support
  function renderDiagnostics(slideAnimationClass = '') {
    const container = document.getElementById('diagnostics-feed');
    if (!container) return;

    const isDesktop = window.innerWidth >= BREAKPOINT_DESKTOP;
    const visibleRecords = isDesktop
      ? DIAGNOSTIC_RECORDS
      : DIAGNOSTIC_RECORDS.filter(record => record.category === activeTab);

    // Apply slide animation class on mobile/touch switches
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

  // Tab Switch Handler with Pill Slide Sync
  function switchTab(btn) {
    if (!btn) return;
    const targetTab = btn.getAttribute('data-tab');
    if (!targetTab || targetTab === activeTab) return;

    const previousTab = activeTab;
    activeTab = targetTab;

    // 1. Move the CSS sliding pill indicator
    if (tabsContainer) {
      tabsContainer.setAttribute('data-active', activeTab);
    }

    // 2. Toggle button state
    document.querySelectorAll('.tab-btn').forEach(b => {
      const isCurrent = b.getAttribute('data-tab') === activeTab;
      b.classList.toggle('active', isCurrent);
      b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // 3. Determine directional slide animation
    const isMovingForward = previousTab === 'SYSTEMS' && targetTab === 'STACK';
    const slideClass = isMovingForward ? 'slide-from-right' : 'slide-from-left';

    renderDiagnostics(slideClass);
  }

  // Delegated Tab Listeners
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn);
    });
  }

  // Debounced Window Resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDiagnostics();
    }, 100);
  });

  // 3D Liquid Glass Tilt (Desktop Mouse Interaction Only)
  if (cardElement && window.innerWidth >= BREAKPOINT_DESKTOP && !isTouchDevice()) {
    cardElement.addEventListener('mousemove', (e) => {
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.2;
      const rotateY = ((x - centerX) / centerX) * 3.2;

      cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // Tactical CTA Comms Transmitter (Windows-Safe Protocol Router)
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const email = ctaBtn.getAttribute('data-email') || 'abishekrux@gmail.com';
      const subject = ctaBtn.getAttribute('data-subject') || 'Engagement Inquiry // ARUX.OS';
      const encodedSubject = encodeURIComponent(subject);

      // 1. Copy to clipboard
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

      // 2. HUD Visual Feedback
      const originalHTML = ctaBtn.innerHTML;
      ctaBtn.innerHTML = `<span class="cta-pulse-beacon"></span>COPIED: ${email} // OPENING...`;
      ctaBtn.style.backgroundColor = 'var(--color-brand-secondary, #1D4ED8)';

      // 3. Platform Routing
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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

  // Initial Telemetry Render
  renderDiagnostics();
});