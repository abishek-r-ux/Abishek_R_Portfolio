/**
 * ARUX.OS // STANDALONE PRODUCTION FOOTER MODULE
 * Auto-injects into #about, arux-footer, or mounts before </body>
 * Typography Tokens: var(--font-family-display) & var(--font-family-body)
 */
(function initAruxFooter() {
  function renderFooter() {
    let mountPoint = document.getElementById('about') || document.querySelector('arux-footer');

    if (!mountPoint) {
      mountPoint = document.createElement('footer');
      mountPoint.id = 'about';
      document.body.appendChild(mountPoint);
    }

    // Apply classes directly to the mount element (prevents double wrapper padding)
    mountPoint.className = 'terminal-about-section';
    mountPoint.setAttribute('aria-label', 'About and Contact');

    // Inject styles if not already present
    if (!document.getElementById('arux-footer-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'arux-footer-styles';
      styleTag.textContent = `
        /* ==========================================================================
           ARUX.OS // PRODUCTION FOOTER STYLES
           ========================================================================== */
        .terminal-about-section {
          width: 100% !important;
          min-height: calc(100vh - 72px) !important;
          min-height: calc(100dvh - 72px) !important;
          position: relative !important;
          z-index: 10 !important;
          padding-top: calc(72px + 24px) !important;
          padding-bottom: 0 !important;
          margin-top: 0 !important;
          background-color: var(--color-bg-main, #0a0a0a) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          font-family: var(--font-family-body) !important;
          -webkit-font-smoothing: antialiased;
        }

        /* Portrait Backdrop Stage: Flush Top (0) to Copyright Strip (45px) */
        .about-backdrop-stage {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 45px !important;
          height: calc(100% - 45px) !important;
          width: 32vw !important;
          max-width: 480px !important;
          pointer-events: none !important;
          z-index: 2 !important;
          overflow: hidden !important;
        }

        .about-dynamic-portrait {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center top !important;
          display: block !important;
          pointer-events: auto !important;
          cursor: pointer !important;

          filter: grayscale(100%) saturate(0%) contrast(120%) brightness(88%) !important;
          transition: filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: filter, transform;

          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 18%, black 50%, black 100%) !important;
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 18%, black 50%, black 100%) !important;
        }

        .about-dynamic-portrait:hover {
          filter: grayscale(0%) saturate(100%) contrast(100%) brightness(100%) !important;
          transform: scale(1.02) !important;
        }

        /* Main Padded Container */
        .terminal-about-container {
          width: 100% !important;
          max-width: 1400px !important;
          margin: 0 auto !important;
          padding: 0 40px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          flex: 1 !important;
          box-sizing: border-box !important;
          position: relative !important;
          z-index: 5 !important;
          pointer-events: none !important;
        }

        .about-clean-flow,
        .about-baseline-bar {
          pointer-events: auto !important;
        }

        /* Left Side Unified Narrative Flow */
        .about-clean-flow {
          max-width: 620px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
        }

        .about-main-headline {
          font-family: var(--font-family-display) !important;
          font-size: clamp(32px, 3.8vw, 42px) !important;
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
          color: var(--color-global-ash, #ffffff) !important;
          line-height: 1.2 !important;
          margin: 0 !important;
        }

        .about-main-summary {
          font-family: var(--font-family-body) !important;
          font-size: var(--text-size-body-main, 16px) !important;
          font-weight: 400 !important;
          line-height: 1.65 !important;
          color: rgba(245, 245, 245, 0.82) !important;
          margin: 0 !important;
        }

        /* Specs Breakdown */
        .about-specs-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          padding: 16px 0 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        .spec-node {
          display: flex !important;
          align-items: baseline !important;
          gap: 10px !important;
          font-family: var(--font-family-body) !important;
          font-size: var(--text-size-caption, 14px) !important;
          color: rgba(245, 245, 245, 0.7) !important;
        }

        .spec-symbol {
          font-family: var(--font-family-display) !important;
          font-size: 12px !important;
          color: var(--color-brand-primary, #e11d2e) !important;
          font-weight: 700 !important;
        }

        .spec-node strong {
          color: var(--color-global-ash, #ffffff) !important;
          font-weight: 600 !important;
        }

        /* Action Cluster & CTA */
        .about-actions-dock {
          display: flex !important;
          flex-direction: column !important;
          gap: 22px !important;
          padding-top: 14px !important;
          position: relative !important;
          z-index: 20 !important;
          pointer-events: auto !important;
        }

        .about-cta-cluster {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          position: relative !important;
          z-index: 21 !important;
          pointer-events: auto !important;
        }

        .about-mail-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 12px 24px !important;
          background: var(--color-brand-primary, #e11d2e) !important;
          color: var(--color-global-ash, #ffffff) !important;
          font-family: var(--font-family-display) !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-decoration: none !important;
          border-radius: 2px !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          position: relative !important;
          z-index: 22 !important;
          transition: background 0.2s ease, transform 0.2s ease !important;
        }

        .about-mail-btn:hover {
          background: #c81625 !important;
          transform: translateY(-1px) !important;
        }

        .cta-pulse-beacon {
          width: 6px !important;
          height: 6px !important;
          background-color: #ffffff !important;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px #ffffff;
        }

        /* Square Icon Clipboard Button */
        .about-copy-icon-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 42px !important;
          height: 42px !important;
          padding: 0 !important;
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 2px !important;
          color: var(--color-global-ash, #f5f5f5) !important;
          cursor: pointer !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-sizing: border-box !important;
        }

        .about-copy-icon-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
        }

        .about-copy-icon-btn .copy-success-svg {
          display: none !important;
          stroke: #ffffff !important;
        }

        .about-copy-icon-btn.copied {
          border-color: var(--color-brand-primary, #e11d2e) !important;
          background: rgba(225, 29, 46, 0.15) !important;
        }

        .about-copy-icon-btn.copied .copy-default-svg {
          display: none !important;
        }

        .about-copy-icon-btn.copied .copy-success-svg {
          display: block !important;
        }

        /* Social Channels */
        .about-meta-channels {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding-top: 6px !important;
          padding-bottom: 12px !important;
        }

        .meta-link {
          font-family: var(--font-family-body) !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: 0.06em !important;
          color: rgba(245, 245, 245, 0.6) !important;
          text-decoration: none !important;
          transition: color 0.2s ease !important;
        }

        .meta-link:hover {
          color: var(--color-brand-primary, #e11d2e) !important;
        }

        .meta-divider {
          color: rgba(255, 255, 255, 0.2) !important;
          font-size: 10px !important;
        }

        /* Baseline Horizon Dock */
        .about-baseline-bar {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-top: 20px !important;
          padding-bottom: 24px !important;
          position: relative !important;
          z-index: 5 !important;
        }

        .baseline-system-stamp {
          font-family: var(--font-family-body) !important;
          font-size: 11px !important;
          letter-spacing: 0.06em !important;
          color: var(--color-text-secondary, #6b7280) !important;
        }

        /* ==========================================================================
           FINAL BOTTOM COPYRIGHT STRIP (EDGE-TO-EDGE)
           ========================================================================== */
        .about-copyright-strip {
          width: 100% !important;
          height: 45px !important;
          background: #050505 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          padding: 0 40px !important;
          box-sizing: border-box !important;
          position: relative !important;
          z-index: 10 !important;
          pointer-events: auto !important;
          display: flex !important;
          align-items: center !important;
        }

        .copyright-strip-inner {
          width: 100% !important;
          max-width: 1400px !important;
          margin: 0 auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          flex-wrap: wrap !important;
          gap: 10px !important;
        }

        .copyright-text {
          font-family: var(--font-family-body) !important;
          font-size: 11px !important;
          font-weight: 400 !important;
          letter-spacing: 0.04em !important;
          color: rgba(245, 245, 245, 0.55) !important;
          line-height: 1.5 !important;
          margin: 0 !important;
        }

        .copyright-text strong {
          font-family: var(--font-family-display) !important;
          font-size: 10px !important;
          color: var(--color-global-ash, #ffffff) !important;
          font-weight: 700 !important;
        }

        .copyright-telemetry {
          font-family: var(--font-family-display) !important;
          font-size: 9px !important;
          letter-spacing: 0.08em !important;
          color: rgba(245, 245, 245, 0.4) !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          white-space: nowrap !important;
        }

        .telemetry-node-live {
          width: 5px !important;
          height: 5px !important;
          background: #10b981 !important;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.8);
          display: inline-block;
        }

        /* ==========================================================================
           FLOATING BOTTOM-LEFT WEB-SLING DOCK & SCROLL REVEAL
           ========================================================================== */
        .web-sling-dock {
position: fixed !important;
          bottom: 58px !important;
          right: 40px !important;
          left: auto !important;
          display: inline-flex !important;
          align-items: center !important;
          user-select: none !important;
          z-index: 99990 !important;
          padding: 0 !important;
          background: transparent !important;
          cursor: pointer !important;
          outline: none !important;

          /* Initial Hidden State (Slides in from Right Corner on Scroll) */
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transform: translateX(32px) !important;
          transition: opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.38s cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 0.38s !important;
        }

        .web-sling-dock.is-visible {
opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateX(0) !important;
        }

        .sling-spider-wrapper {
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          background: #ffffff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.55), 0 0 12px rgba(255, 255, 255, 0.25) !important;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease !important;
        }

        .sling-logo-img {
          width: 28px !important;
          height: 28px !important;
          object-fit: contain !important;
          display: block !important;
          pointer-events: none !important;
          user-select: none !important;
          transition: transform 0.25s ease !important;
        }

        .web-sling-dock:hover .sling-spider-wrapper {
          transform: translateY(-3px) scale(1.06) !important;
          box-shadow: 0 8px 24px rgba(225, 29, 46, 0.5), 0 0 20px rgba(255, 255, 255, 0.8) !important;
        }

        .web-sling-dock:hover .sling-logo-img {
          transform: scale(1.08) !important;
        }

        /* Hover Tooltip: Left-Aligned HUD Kicker */
        .sling-tooltip {
          position: absolute !important;
          bottom: calc(100% + 10px) !important;
          right: 0 !important;
          left: auto !important;
          transform: translateY(4px) !important;
          background: rgba(14, 14, 18, 0.95) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(225, 29, 46, 0.6) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 0 10px rgba(225, 29, 46, 0.3) !important;
          color: #ffffff !important;
          font-family: var(--font-family-body) !important;
          font-size: 9.5px !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          white-space: nowrap !important;
          padding: 5px 10px !important;
          border-radius: 2px !important;
          pointer-events: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s !important;
          z-index: 50 !important;
        }

        /* Tooltip Pointer Needle */
        .sling-tooltip::after {
 content: '' !important;
          position: absolute !important;
          top: 100% !important;
          right: 20px !important;
          left: auto !important;
          border-width: 4px !important;
          border-style: solid !important;
          border-color: rgba(225, 29, 46, 0.8) transparent transparent transparent !important;
        }

        .web-sling-dock:hover .sling-tooltip,
        .web-sling-dock:focus-visible .sling-tooltip {
opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) !important;
        }

        /* High-Tensile Web Filament (Global Viewport Plane) */
        .web-filament-global {
          position: fixed !important;
          width: 2.5px !important;
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.95) 40%,
            rgba(225, 29, 46, 0.95) 85%,
            rgba(255, 255, 255, 0.8) 100%
          ) !important;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(225, 29, 46, 0.85) !important;
          pointer-events: none !important;
          z-index: 9999999 !important;
          opacity: 0;
          transform-origin: bottom center !important;
          transform: scaleY(0);
          transition: transform 0.26s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.15s ease !important;
        }

        .web-filament-global.active {
          opacity: 1 !important;
          transform: scaleY(1) !important;
        }

        /* Recoil & Launch Physics States */
        .sling-spider-wrapper.recoil {
          transform: translateY(8px) scale(0.92) !important;
          transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .sling-spider-wrapper.launch {
          transform: translateY(-100vh) scale(1.15) !important;
          transition: transform 0.65s cubic-bezier(0.7, 0, 0.84, 0) !important;
          box-shadow: 0 0 30px rgba(225, 29, 46, 1), 0 0 20px rgba(255, 255, 255, 1) !important;
        }

        @media (max-width: 768px) {
          .terminal-about-container {
            padding: 0 20px !important;
          }
          .about-backdrop-stage {
            width: 70vw !important;
            opacity: 0.2 !important;
          }
          .about-copyright-strip {
            height: auto !important;
            padding: 14px 20px !important;
          }
          .copyright-strip-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .web-sling-dock {
   bottom: 20px !important;
            right: 20px !important;
            left: auto !important;
          }
            
          .sling-spider-wrapper {
            width: 44px !important;
            height: 44px !important;
          }
          .sling-logo-img {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }

    // Direct inner HTML without an extra wrapper element
    mountPoint.innerHTML = `
        <!-- Portrait Anchor: Flush edge-to-edge -->
        <div class="about-backdrop-stage" aria-hidden="true">
          <img 
            src="./assets/images/abishek-profile.jpg" 
            alt="Abishek R." 
            class="about-dynamic-portrait"
            loading="lazy"
          />
        </div>

        <div class="terminal-about-container">

          <!-- Left Narrative Flow -->
          <div class="about-clean-flow">
            <h2 class="about-main-headline">
              Design that engineering can actually ship.
            </h2>

            <p class="about-main-summary">
              Senior Product Designer and Design Technologist with hands-on production code fluency. I solve enterprise UI complexity, align multi-disciplinary teams, and enforce design token integrity from prototype to release.
            </p>

            <div class="about-specs-grid">
              <div class="spec-node">
                <span class="spec-symbol">&gt;</span>
                <span class="spec-text"><strong>End-to-End Delivery</strong> &mdash; From architectural wireframes to tokenized CSS and working component frameworks.</span>
              </div>
              <div class="spec-node">
                <span class="spec-symbol">&gt;</span>
                <span class="spec-text"><strong>Scalable Foundations</strong> &mdash; Built to support your engineering team long after launch with maintainable system specs.</span>
              </div>
              <div class="spec-node">
                <span class="spec-symbol">&gt;</span>
                <span class="spec-text"><strong>Scope</strong> &mdash; Open to Full-Time Staff/Lead Design Technologist roles (Remote / Hybrid).</span>
              </div>
            </div>

            <!-- Actions Dock -->
            <div class="about-actions-dock">
              <div class="about-cta-cluster">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=abishekrux@gmail.com&su=Design%20Inquiry%20%2F%2F%20ARUX.OS" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="about-mail-btn" 
                  id="about-mail-btn"
                >
                  <span class="cta-pulse-beacon"></span>
                  MAIL ME ↗
                </a>

                <button type="button" class="about-copy-icon-btn" id="about-copy-btn" aria-label="Copy email address" title="Copy Email">
                  <svg class="copy-default-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <svg class="copy-success-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>

              <div class="about-meta-channels">
                <a href="https://linkedin.com/in/abishek-r" target="_blank" rel="noopener noreferrer" class="meta-link">LINKEDIN ↗</a>
                <span class="meta-divider">&bull;</span>
                <a href="https://hashnode.com/@abishek" target="_blank" rel="noopener noreferrer" class="meta-link">HASHNODE ↗</a>
                <span class="meta-divider">&bull;</span>
                <a href="https://behance.net/abishek-r" target="_blank" rel="noopener noreferrer" class="meta-link">BEHANCE ↗</a>
                <span class="meta-divider">&bull;</span>
                <a href="https://github.com/abishek-r" target="_blank" rel="noopener noreferrer" class="meta-link">GITHUB ↗</a>
              </div>
            </div>
          </div>

          <!-- Baseline Horizon Dock -->
          <div class="about-baseline-bar">
            <div class="baseline-system-stamp">
              LOC: TAMIL NADU, INDIA &bull; LATENCY: OPTIMAL
            </div>
          </div>

        </div>

        <!-- Edge-to-Edge Dedicated Copyright Reserved Strip -->
        <div class="about-copyright-strip">
          <div class="copyright-strip-inner">
            <p class="copyright-text">
              &copy; 2026 &bull; ALL RIGHTS RESERVED &bull; DESIGNED &amp; ENGINEERED BY ABISHEK R.
            </p>
            <div class="copyright-telemetry">
              <span class="telemetry-node-live"></span>
              <span>SYSTEM ONLINE // v4.2.0</span>
            </div>
          </div>
        </div>
    `;

    // 1. Clipboard Copy
    const copyBtn = mountPoint.querySelector('#about-copy-btn');
    if (copyBtn) {
      const emailToCopy = 'abishekrux@gmail.com';
      let resetTimer = null;

      copyBtn.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(emailToCopy);
          } else {
            const temp = document.createElement('textarea');
            temp.value = emailToCopy;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.focus();
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          }

          clearTimeout(resetTimer);
          copyBtn.classList.add('copied');
          copyBtn.setAttribute('title', 'Copied to clipboard!');

          resetTimer = setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.setAttribute('title', 'Copy Email');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy email:', err);
        }
      });
    }

    // 2. Global Body-Mounted Floating To-The-Top Button + Scroll Listener + Web Sling Physics
    let slingTrigger = document.getElementById('web-sling-trigger');
    if (!slingTrigger) {
      slingTrigger = document.createElement('div');
      slingTrigger.id = 'web-sling-trigger';
      slingTrigger.className = 'web-sling-dock';
      slingTrigger.setAttribute('role', 'button');
      slingTrigger.setAttribute('aria-label', 'To the top');
      slingTrigger.setAttribute('tabindex', '0');
      slingTrigger.innerHTML = `
              <span class="sling-tooltip" aria-hidden="true">TO THE TOP</span>
              <div class="sling-spider-wrapper" id="sling-spider">
                <img 
                  src="./assets/icons/logo.png" 
                  alt="Back to top" 
                  class="sling-logo-img" 
                  loading="lazy"
                />
              </div>
            `;
      document.body.appendChild(slingTrigger);
    }

    const slingSpider = slingTrigger.querySelector('#sling-spider');

    let globalFilament = document.getElementById('arux-web-filament');
    if (!globalFilament) {
      globalFilament = document.createElement('div');
      globalFilament.id = 'arux-web-filament';
      globalFilament.className = 'web-filament-global';
      globalFilament.setAttribute('aria-hidden', 'true');
      document.body.appendChild(globalFilament);
    }

    let isSlinging = false;

    // Reveal on first scroll (fade & slide in from left corner)
    const handleScrollVisibility = () => {
      if (isSlinging) return;
      if (window.scrollY > 40) {
        slingTrigger.classList.add('is-visible');
      } else {
        slingTrigger.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    handleScrollVisibility(); // Check initial scroll position on load

    const executeSling = () => {
      if (isSlinging || window.scrollY <= 40) return;
      isSlinging = true;

      const tooltip = slingTrigger.querySelector('.sling-tooltip');
      if (tooltip) tooltip.style.display = 'none';

      // Exact coordinates of the circular button in the bottom-left corner
      const spiderRect = slingSpider.getBoundingClientRect();
      const startX = spiderRect.left + (spiderRect.width / 2);
      const buttonTopY = spiderRect.top;

      globalFilament.style.transition = 'none';
      globalFilament.style.opacity = '1';
      globalFilament.style.left = `${startX - 1.25}px`;
      globalFilament.style.bottom = `${window.innerHeight - buttonTopY}px`;
      globalFilament.style.height = `${buttonTopY}px`;
      globalFilament.style.transform = 'scaleY(0)';
      globalFilament.style.transformOrigin = 'bottom center';

      void globalFilament.offsetHeight;

      // Stage 1: THWIP! Shoot web straight up to ceiling
      globalFilament.style.transition = 'transform 0.24s cubic-bezier(0.12, 0.85, 0.3, 1)';
      globalFilament.classList.add('active');

      // Stage 2: Recoil compression
      setTimeout(() => {
        slingSpider.classList.add('recoil');
      }, 130);

      // Stage 3: Launch upward and smooth scroll page to top
      setTimeout(() => {
        slingSpider.classList.remove('recoil');
        slingSpider.classList.add('launch');

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 260);

      // Stage 4: Reset all states once back at hero top
      setTimeout(() => {
        globalFilament.style.transition = 'opacity 0.2s ease';
        globalFilament.style.opacity = '0';
        globalFilament.classList.remove('active');
        slingTrigger.classList.remove('is-visible');

        setTimeout(() => {
          slingSpider.classList.remove('launch');
          slingSpider.classList.remove('recoil');
          globalFilament.style.transform = 'scaleY(0)';
          if (tooltip) tooltip.style.display = '';
          isSlinging = false;
        }, 350);
      }, 850);
    };

    slingTrigger.addEventListener('click', executeSling);
    slingTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeSling();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }
})();