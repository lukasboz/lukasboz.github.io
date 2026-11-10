(() => {
  'use strict';
  const base = document.body.dataset.base || '';
  const dialog = document.getElementById('search-dialog');
  const searchInput = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  const count = document.getElementById('search-count');
  let searchIndex, searchLoading, previousFocus, toastTimer;
  let selectedIndex = 0;
  let searchVersion = 0;
  const svg = path => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const searchIcon = svg('<path d="M5 12h14m-5-5 5 5-5 5"/>');
  const symbols = {
    wave: '<path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4"/>',
    chef: '<path d="M7 14a5 5 0 0 1-2-9 5 5 0 0 1 7-2 5 5 0 0 1 7 2 5 5 0 0 1-2 9v6H7zm0 3h10"/>',
    scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-5 10-5 10 0"/>',
    math: '<path d="M4 7h8M8 3v8m7 5h6m-6 4h6M4 16l6 6m0-6-6 6"/>',
    convert: '<path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4"/>',
    music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
    file: '<path d="M14 2H5v20h14V7zm0 0v5h5M8 12h8m-8 4h8"/>',
  };

  async function getSearchIndex() {
    if (searchIndex) return searchIndex;
    if (!searchLoading) {
      searchLoading = fetch(`${base}assets/search-index.json`)
        .then(response => {
          if (!response.ok) throw new Error('Search unavailable');
          return response.json();
        })
        .then(data => { searchIndex = data; return data; })
        .catch(error => { searchLoading = null; throw error; });
    }
    return searchLoading;
  }
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }
  function selectResult(index, scroll = false) {
    const links = Array.from(results.querySelectorAll('.search-result'));
    if (!links.length) return;
    selectedIndex = (index + links.length) % links.length;
    links.forEach((link, i) => link.classList.toggle('is-selected', i === selectedIndex));
    if (scroll) links[selectedIndex].scrollIntoView({ block: 'nearest' });
  }
  function createResult(item) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = `${base}${item.url}`;
    const symbol = document.createElement('span');
    symbol.className = `project-symbol ${item.color}`;
    symbol.innerHTML = svg(symbols[item.icon] || symbols.file);
    const text = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = item.title;
    const description = document.createElement('small');
    description.textContent = `${item.category} · ${item.description}`;
    text.append(title, description);
    link.append(symbol, text);
    link.insertAdjacentHTML('beforeend', searchIcon);
    link.addEventListener('pointerenter', () => selectResult(Array.from(results.querySelectorAll('.search-result')).indexOf(link)));
    return link;
  }
  async function renderSearch() {
    const version = ++searchVersion;
    count.textContent = 'Loading…';
    try {
      const items = await getSearchIndex();
      if (version !== searchVersion) return;
      const query = searchInput.value.trim().toLocaleLowerCase();
      const words = query.split(/\s+/).filter(Boolean);
      const matches = items.filter(item => {
        const text = `${item.title} ${item.description} ${item.keywords} ${item.category}`.toLocaleLowerCase();
        return words.every(word => text.includes(word));
      }).sort((a, b) => !query ? 0 : Number(b.title.toLowerCase().includes(query)) - Number(a.title.toLowerCase().includes(query)));
      results.replaceChildren();
      if (!matches.length) {
        const empty = document.createElement('div');
        empty.className = 'search-empty';
        const heading = document.createElement('strong');
        heading.textContent = `No results for “${searchInput.value.trim()}”`;
        const hint = document.createElement('p');
        hint.textContent = 'Try “Python”, “computer vision”, “resume”, or “contact”.';
        empty.append(heading, hint);
        results.append(empty);
      } else {
        const label = document.createElement('div');
        label.className = 'search-group-label';
        label.textContent = query ? 'Search results' : 'Projects & places';
        results.append(label, ...matches.map(createResult));
      }
      count.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'}`;
      selectResult(0);
    } catch {
      if (version !== searchVersion) return;
      results.replaceChildren();
      const message = document.createElement('div');
      message.className = 'search-empty';
      const text = document.createElement('p');
      text.textContent = 'Search could not load. You can still explore all projects.';
      const link = document.createElement('a');
      link.className = 'text-link';
      link.href = `${base}projects.html`;
      link.textContent = 'View all projects →';
      message.append(text, link);
      results.append(message);
      count.textContent = 'Search unavailable';
    }
  }
  function openSearch() {
    if (!dialog || dialog.open) return;
    closeLauncher();
    previousFocus = document.activeElement !== document.body ? document.activeElement : document.querySelector('[data-search]');
    searchInput.value = '';
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    searchInput.focus();
    renderSearch();
  }
  function closeSearch() {
    dialog.close();
    previousFocus?.focus();
  }
  document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', openSearch));
  if (dialog) {
    dialog.querySelector('.dialog-close').addEventListener('click', closeSearch);
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearch();
      }
    });
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeSearch();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      previousFocus?.focus();
    });
    searchInput.addEventListener('input', renderSearch);
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        selectResult(selectedIndex + (event.key === 'ArrowDown' ? 1 : -1), true);
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        results.querySelector('.search-result.is-selected')?.click();
      }
    });
  }
  document.addEventListener('keydown', event => {
    const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey)) {
      event.preventDefault();
      openSearch();
    }
  });
  if (navigator.platform.toUpperCase().includes('MAC')) document.querySelectorAll('.search-key').forEach(key => { key.textContent = '⌘ K'; });

  const launcher = document.getElementById('app-launcher');
  const launcherButton = document.querySelector('.launcher-button');
  function closeLauncher() {
    if (!launcher) return;
    launcher.hidden = true;
    launcherButton.setAttribute('aria-expanded', 'false');
  }
  launcherButton?.addEventListener('click', () => {
    launcher.hidden = !launcher.hidden;
    launcherButton.setAttribute('aria-expanded', String(!launcher.hidden));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.launcher-wrap')) closeLauncher();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && launcher && !launcher.hidden) {
      closeLauncher();
      launcherButton.focus();
    }
  });
  document.addEventListener('focusin', event => {
    if (launcher && !launcher.hidden && !event.target.closest('.launcher-wrap')) closeLauncher();
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(tab => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      document.querySelectorAll('.project-result').forEach(project => {
        project.hidden = filter !== 'all' && project.dataset.category !== filter;
        if (!project.hidden) visible++;
      });
      document.getElementById('results-counter').textContent = `${visible} project${visible === 1 ? '' : 's'}`;
      document.getElementById('filter-description').textContent = filter === 'all' ? 'A collection of projects, experiments, and useful things.' : `Showing ${button.textContent.trim().toLowerCase()} projects.`;
    });
  });
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('lukasbozinov@gmail.com');
        showToast('Email address copied. Say hello!');
      } catch { showToast('Email: lukasbozinov@gmail.com'); }
    });
  });
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  document.getElementById('contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('body')).trim();
    if (!name || !message) {
      document.getElementById('form-status').textContent = 'Please add your name and a message before opening a draft.';
      return;
    }
    const subject = encodeURIComponent(`${data.get('subject')} — ${name}`);
    const body = encodeURIComponent(`Hi Lukas,\n\n${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:lukasbozinov@gmail.com?subject=${subject}&body=${body}`;
    document.getElementById('form-status').textContent = 'Your email app should open with a draft. If it doesn’t, email lukasbozinov@gmail.com directly.';
  });
})();
