/**
 * ARUX.OS // Global Site Navbar Web Component
 * Features:
 * - Left: Monogram logo (Mobile) / Logo + "ARUX.OS" (Desktop)
 * - Center: Responsive navigation links island (Desktop)
 * - Right: Technical Resume button + 2-Line HUD morphing toggle
 * - Border: Autonomous bi-color micro-spider patrol along bottom border
 * - Touch: Zero-latency drawer toggle with outside-tap & ESC dismissal
 */

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <nav class="header-nav-container" aria-label="Main Navigation">
          <!-- 1. Brand Group (Left) -->
          <div class="brand-group">
            <a href="#home" class="brand-link" title="ARUX.OS // Home">
              <img src="./assets/icons/master_logo.svg" alt="ARUX.OS Logo" class="header-logo" />
              <span class="brand-title">ARUX.OS</span>
            </a>
          </div>

          <!-- 2. Centered Navigation Island (Desktop) -->
          <ul class="nav-links-list">
            <li><a href="#capabilities" class="nav-cyber-link">Capabilities</a></li>
            <li><a href="#casestudies" class="nav-cyber-link">Case Studies</a></li>
            <li><a href="#prototypes" class="nav-cyber-link">Prototypes</a></li>
            <li><a href="#about" class="nav-cyber-link">About</a></li>
          </ul>

          <!-- 3. Right Action Group (Always visible: Resume + Toggle) -->
          <div class="nav-actions-group">
            <a href="./assets/Abishek_Devaraja_R_Senior_UI_UX_Designer.pdf" target="_blank" rel="noopener noreferrer" class="nav-resume-btn" title="View Technical Resume">
              [ RESUME // CV ↗ ]
            </a>

            <!-- Mobile Hamburger Toggle Button: Clean 2-Line HUD Morpher -->
            <button id="nav-toggle" class="nav-toggle-btn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
              <span class="hamburger-bar bar-1"></span>
              <span class="hamburger-bar bar-2"></span>
            </button>
          </div>
        </nav>

        <!-- Patrolling Autonomous Micro-Spider Track -->
        <div class="nav-spider-track" aria-hidden="true">
          <div class="nav-spider-patrol">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="7.5" r="1.5" class="spider-head"></circle>
              <ellipse cx="12" cy="12" rx="2.5" ry="3.5" class="spider-body"></ellipse>
              <path d="M10 10 C6 7, 4 9, 3 8" class="leg leg-l1 leg-red"></path>
              <path d="M9.5 12 C5 11, 3 13, 2 15" class="leg leg-l2 leg-blue"></path>
              <path d="M10 14 C6 16, 4 18, 5 21" class="leg leg-l3 leg-red"></path>
              <path d="M14 10 C18 7, 20 9, 21 8" class="leg leg-r1 leg-blue"></path>
              <path d="M14.5 12 C19 11, 21 13, 22 15" class="leg leg-r2 leg-red"></path>
              <path d="M14 14 C18 16, 20 18, 19 21" class="leg leg-r3 leg-blue"></path>
            </svg>
          </div>
        </div>

        <!-- Mobile Nav Drawer -->
        <div id="mobile-nav-drawer" class="mobile-nav-drawer" aria-hidden="true">
          <a href="#capabilities" class="mobile-nav-link">Capabilities</a>
          <a href="#casestudies" class="mobile-nav-link">Case Studies</a>
          <a href="#prototypes" class="mobile-nav-link">Prototypes</a>
          <a href="#about" class="mobile-nav-link">About</a>
        </div>
      </header>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const navToggle = this.querySelector('#nav-toggle');
    const mobileNavDrawer = this.querySelector('#mobile-nav-drawer');

    if (!navToggle || !mobileNavDrawer) return;

    const closeDrawer = () => {
      mobileNavDrawer.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
    };

    // 1. Toggle button handler
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.classList.toggle('open');
      mobileNavDrawer.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNavDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // 2. Close when tapping any link inside drawer
    const mobileLinks = mobileNavDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // 3. Dismiss on outside tap
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        closeDrawer();
      }
    });

    // 4. Accessibility: Dismiss on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

customElements.define('site-navbar', SiteNavbar);