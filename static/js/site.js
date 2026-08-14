(() => {
  const fontStylesheet = document.getElementById('project-fonts');
  if (fontStylesheet) fontStylesheet.media = 'all';

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

  document.querySelectorAll('[data-video-group]').forEach((group) => {
    const player = group.querySelector('[data-video-player]');
    const buttons = Array.from(group.querySelectorAll('[data-video-source]'));
    if (!player || buttons.length === 0) return;

    const activateVideo = (button) => {
      buttons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });

      document.querySelectorAll('[data-video-player]').forEach((otherPlayer) => {
        if (otherPlayer !== player) otherPlayer.pause();
      });

      player.pause();
      player.src = button.dataset.videoSource;
      player.setAttribute('aria-label', button.dataset.videoLabel);
      player.removeAttribute('poster');
      player.load();
      player.play().catch(() => {});
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activateVideo(button));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();

        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = buttons.length - 1;

        buttons[nextIndex].focus();
        activateVideo(buttons[nextIndex]);
      });
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

  const renderIcons = () => {
    if (!window.lucide) return;
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.8,
      },
    });
  };

  renderIcons();
  window.addEventListener('load', renderIcons, { once: true });
})();
