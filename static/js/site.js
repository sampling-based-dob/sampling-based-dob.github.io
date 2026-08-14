(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      navLinks.dataset.open = String(!isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        navLinks.dataset.open = 'false';
      });
    });
  }

  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-experiment]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"][data-panel]'));

  const activateTab = (nextTab) => {
    const experiment = nextTab.dataset.experiment;

    tabs.forEach((tab) => {
      const isActive = tab === nextTab;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === experiment;
      panel.hidden = !isActive;
      panel.querySelectorAll('video').forEach((video) => {
        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });

  const copyButton = document.querySelector('[data-copy-target]');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.innerText);
        const label = copyButton.querySelector('span');
        if (label) label.textContent = 'Copied';
        window.setTimeout(() => {
          if (label) label.textContent = 'Copy';
        }, 1800);
      } catch {
        target.focus();
      }
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach((video) => video.pause());
  }

  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.8,
      },
    });
  }
})();
