/**
 * ARUX.OS // Diagnostics Engine & Dynamic Viewport HUD Controller
 * Author: Abishek R. (Senior Product Designer & Design Technologist)
 */

document.addEventListener('DOMContentLoaded', () => {
  const DIAGNOSTIC_RECORDS = [
    {
      id: 'row-1',
      category: 'PROFILE',
      label: 'Role & Engagement:',
      value: 'Senior Product Designer (FTE) & Systems Consultant',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-2',
      category: 'PROFILE',
      label: 'Core Focus:',
      value: 'Enterprise ERP Platforms, Dense UI & Scalable Systems',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-3',
      category: 'CODE',
      label: 'Workflow Engine:',
      value: 'Figma Variables ➔ Design Tokens ➔ Modular Code',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-4',
      category: 'CODE',
      label: 'Design Tokens:',
      value: 'W3C Compliant Spec',
      meta: '[ PARSING: VALID // SYNCED ]',
      isStatus: false
    },
    {
      id: 'row-5',
      category: 'NETWORK',
      label: 'Core Codebase:',
      value: 'Angular / TypeScript / Tailwind CSS / SCSS',
      meta: null,
      isStatus: false
    },
    {
      id: 'row-6',
      category: 'NETWORK',
      label: 'Status Beacon:',
      value: 'cPanel Edge Deployment // Global Remote',
      meta: null,
      isStatus: true
    }
  ];

  const diagnosticsContainer = document.getElementById('diagnostics-content');
  const tabsContainer = document.getElementById('diagnostics-tabs');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const cardElement = document.querySelector('.liquid-glass-card');
  const ctaBtn = document.getElementById('main-cta-btn');

  let currentCategory = 'PROFILE';
  const BREAKPOINT_DESKTOP = 1024;

  // Touch vs Non-Touch Device Detection
  function isTouchDevice() {
    return ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < BREAKPOINT_DESKTOP);
  }

  function createRowHTML(item) {
    if (item.isStatus) {
      return `
        <div class="diag-row animate-fade-in" data-category="${item.category}">
          <div class="diag-label">${item.label}</div>
          <div class="diag-value flex items-center justify-between flex-wrap gap-2">
            <span>${item.value}</span>
            <span class="inline-flex items-center text-xs font-mono text-[#E11D2E] font-semibold tracking-wider">
              <span class="status-beacon-dot"></span>SYS_ONLINE
            </span>
          </div>
        </div>
      `;
    }

    return `
      <div class="diag-row animate-fade-in" data-category="${item.category}">
        <div class="diag-label">${item.label}</div>
        <div class="diag-value">${item.value}</div>
        ${item.meta ? `<div class="diag-meta">${item.meta}</div>` : ''}
      </div>
    `;
  }

  function renderDiagnostics() {
    if (!diagnosticsContainer) return;

    const desktopMode = window.innerWidth >= BREAKPOINT_DESKTOP && !isTouchDevice();

    if (desktopMode) {
      // Desktop: Show all diagnostic records at once, hide tabs
      if (tabsContainer) tabsContainer.style.display = 'none';
      diagnosticsContainer.innerHTML = DIAGNOSTIC_RECORDS.map(createRowHTML).join('');
    } else {
      // Touch/Mobile: Show category-filtered records with tabs
      if (tabsContainer) tabsContainer.style.display = 'flex';
      const filtered = DIAGNOSTIC_RECORDS.filter((row) => row.category === currentCategory);
      diagnosticsContainer.innerHTML = filtered.map(createRowHTML).join('');
    }
  }

  function handleTabClick(event) {
    const target = event.currentTarget;
    const category = target.getAttribute('data-tab');

    if (!category || category === currentCategory) return;
    currentCategory = category;

    tabButtons.forEach((btn) => {
      const isActive = btn === target;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    renderDiagnostics();
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', handleTabClick);
  });

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDiagnostics();
    }, 80);
  });

  // 3D Tilt effect only active on non-touch desktop web
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

  // Interactive visual feedback on CTA click
if (ctaBtn) {
  ctaBtn.addEventListener('click', (e) => {
    const email = 'contact@abishekrux.in';

    // 1. Copy email address to system clipboard
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

    // 2. HUD Visual Feedback (Swaps text briefly to confirm transmission)
    const originalText = ctaBtn.innerHTML;
    ctaBtn.innerHTML = `<span class="cta-pulse-beacon"></span>COPIED: ${email} // OPENING COMMS`;
    ctaBtn.style.backgroundColor = '#1D4ED8'; // Glow blue on copy

    setTimeout(() => {
      ctaBtn.innerHTML = originalText;
      ctaBtn.style.backgroundColor = '';
    }, 2800);
  });
}

  // Initial render
  renderDiagnostics();
});