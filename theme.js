// Run before the stylesheet so a saved dark preference paints correctly at once.
(() => {
  'use strict';
  const storageKey = 'lukas-portfolio-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const lightThemeColor = themeColor?.content || '#ffffff';
  const valid = value => value === 'light' || value === 'dark';
  let preference = null;
  try {
    const saved = localStorage.getItem(storageKey);
    if (valid(saved)) preference = saved;
  } catch { /* System preference still works when storage is unavailable. */ }

  function updateButtons() {
    const dark = root.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-pressed', String(dark));
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }
  function applyTheme() {
    const theme = preference || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    if (themeColor) themeColor.content = theme === 'dark' ? '#171b22' : lightThemeColor;
    updateButtons();
  }
  applyTheme();
  document.addEventListener('DOMContentLoaded', updateButtons, { once: true });
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-theme-toggle]')) return;
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(storageKey, preference); } catch { /* Keep this page usable. */ }
    applyTheme();
  });
  system.addEventListener('change', () => { if (!preference) applyTheme(); });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : null;
    applyTheme();
  });
})();
