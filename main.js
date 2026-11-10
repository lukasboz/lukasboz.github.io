(() => {
  'use strict';
  const base = document.body.dataset.base || '';
  const searchForm = document.querySelector('[data-search-form]');
  const searchInput = document.getElementById('site-search');
  const suggestions = document.getElementById('search-suggestions');
  const results = document.getElementById('inline-search-results');
  const count = document.getElementById('search-status');
  const clearButton = document.querySelector('.search-clear');
  const isWork = document.body.classList.contains('work-page');
  let searchIndex, searchLoading, toastTimer;
  let selectedIndex = -1;
  let searchVersion = 0;
  let activeCategory = 'all';
  const svg = path => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const arrowIcon = svg('<path d="M5 12h14m-5-5 5 5-5 5"/>');
  const symbols = {
    wave: '<path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4"/>',
    chef: '<path d="M7 14a5 5 0 0 1-2-9 5 5 0 0 1 7-2 5 5 0 0 1 7 2 5 5 0 0 1-2 9v6H7zm0 3h10"/>',
    scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-5 10-5 10 0"/>',
    math: '<path d="M4 7h8M8 3v8m7 5h6m-6 4h6M4 16l6 6m0-6-6 6"/>',
    convert: '<path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4"/>',
    music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
    blocks: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="10" y="3" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><rect x="17" y="10" width="6" height="6" rx="1"/>',
    file: '<path d="M14 2H5v20h14V7zm0 0v5h5M8 12h8m-8 4h8"/>',
  };
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }
  async function getSearchIndex() {
    if (searchIndex) return searchIndex;
    if (!searchLoading) {
      searchLoading = fetch(`${base}assets/search-index.json`).then(response => {
        if (!response.ok) throw new Error('Search unavailable');
        return response.json();
      }).then(data => { searchIndex = data; return data; }).catch(error => {
        searchLoading = null;
        throw error;
      });
    }
    return searchLoading;
  }
  function closeSuggestions() {
    searchVersion++;
    if (!suggestions) return;
    suggestions.hidden = true;
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.removeAttribute('aria-activedescendant');
    selectedIndex = -1;
  }
  function selectResult(index) {
    const links = [...results.querySelectorAll('.search-result')];
    if (!links.length) return;
    selectedIndex = (index + links.length) % links.length;
    links.forEach((link, i) => {
      link.classList.toggle('is-selected', i === selectedIndex);
      link.setAttribute('aria-selected', String(i === selectedIndex));
    });
    searchInput.setAttribute('aria-activedescendant', links[selectedIndex].id);
    links[selectedIndex].scrollIntoView({ block: 'nearest' });
  }
  function createResult(item, index) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.id = `search-option-${index}`;
    link.href = `${base}${item.url}`;
    link.setAttribute('role', 'option');
    link.setAttribute('aria-selected', 'false');
    link.tabIndex = -1;
    if (item.url === 'about.html') link.dataset.about = '';
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
    link.insertAdjacentHTML('beforeend', arrowIcon);
    link.addEventListener('pointerenter', () => selectResult(index));
    link.addEventListener('mousedown', event => event.preventDefault());
    return link;
  }
  async function renderSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query || isWork) { closeSuggestions(); return; }
    selectedIndex = -1;
    searchInput.removeAttribute('aria-activedescendant');
    const version = ++searchVersion;
    try {
      const items = await getSearchIndex();
      if (version !== searchVersion || document.activeElement !== searchInput) return;
      const words = query.split(/\s+/);
      const matches = items.filter(item => {
        const text = `${item.title} ${item.description} ${item.keywords} ${item.category}`.toLowerCase();
        return words.every(word => text.includes(word));
      }).sort((a,b) => Number(b.title.toLowerCase().includes(query)) - Number(a.title.toLowerCase().includes(query))).slice(0,7);
      selectedIndex = -1;
      searchInput.removeAttribute('aria-activedescendant');
      results.replaceChildren(...matches.map(createResult));
      count.textContent = matches.length ? `${matches.length} suggestion${matches.length === 1 ? '' : 's'} · Enter to search all projects` : 'No suggestions. Press Enter to search projects.';
      suggestions.hidden = false;
      searchInput.setAttribute('aria-expanded', 'true');
    } catch {
      if (version !== searchVersion) return;
      results.replaceChildren();
      count.textContent = 'Press Enter to search all projects.';
      suggestions.hidden = false;
      searchInput.setAttribute('aria-expanded', 'true');
    }
  }
  function updateWorkResults() {
    if (!isWork) return;
    const words = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    document.querySelectorAll('.project-result').forEach(project => {
      project.hidden = (activeCategory !== 'all' && project.dataset.category !== activeCategory) || !words.every(word => project.dataset.searchText.includes(word));
      if (!project.hidden) visible++;
    });
    document.getElementById('results-counter').textContent = `${visible} project${visible === 1 ? '' : 's'}${words.length ? ' matching your search' : ''}`;
    document.getElementById('work-empty').hidden = visible > 0;
  }
  function focusSearch() {
    if (!searchInput) { window.location.href = `${base}projects.html`; return; }
    closeLauncher();
    searchInput.focus();
    searchInput.select();
  }
  if (searchForm) {
    if (isWork) searchInput.value = new URLSearchParams(location.search).get('q') || '';
    clearButton.hidden = !searchInput.value;
    searchInput.addEventListener('input', () => {
      clearButton.hidden = !searchInput.value;
      if (isWork) updateWorkResults();
      else renderSuggestions();
    });
    searchInput.addEventListener('focus', () => { if (searchInput.value) renderSuggestions(); });
    searchInput.addEventListener('keydown', async event => {
      if (event.key === 'Escape') { event.preventDefault(); closeSuggestions(); }
      if (!isWork && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        if (suggestions.hidden) await renderSuggestions();
        selectResult(selectedIndex < 0 ? (event.key === 'ArrowDown' ? 0 : -1) : selectedIndex + (event.key === 'ArrowDown' ? 1 : -1));
      }
      if (event.key === 'Enter' && !suggestions.hidden && selectedIndex >= 0) {
        event.preventDefault();
        results.querySelector('.search-result.is-selected')?.click();
        closeSuggestions();
      }
    });
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      clearButton.hidden = true;
      closeSuggestions();
      updateWorkResults();
      searchInput.focus();
      if (isWork) { const url = new URL(location.href); url.searchParams.delete('q'); history.replaceState(null,'',url); }
    });
    searchForm.addEventListener('submit', event => {
      if (!isWork) return;
      event.preventDefault();
      closeSuggestions();
      updateWorkResults();
      const url = new URL(location.href);
      if (searchInput.value.trim()) url.searchParams.set('q',searchInput.value.trim());
      else url.searchParams.delete('q');
      history.replaceState(null,'',url);
    });
    document.addEventListener('pointerdown', event => { if (!searchForm.contains(event.target)) closeSuggestions(); });
    searchForm.addEventListener('focusout', event => { if (!searchForm.contains(event.relatedTarget)) closeSuggestions(); });
    updateWorkResults();
  }
  document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click',focusSearch));
  document.addEventListener('keydown', event => {
    const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey)) {
      if (document.getElementById('about-dialog')?.open) return;
      event.preventDefault();
      focusSearch();
    }
  });
  if (navigator.platform.toUpperCase().includes('MAC')) document.querySelectorAll('.search-key').forEach(key => { key.textContent = '⌘ K'; });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(tab => {
      tab.classList.toggle('is-active', tab === button);
      tab.setAttribute('aria-pressed', String(tab === button));
    });
    updateWorkResults();
  }));
  document.querySelector('[data-reset-work]')?.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.hidden = true;
    document.querySelector('[data-filter="all"]').click();
    const url = new URL(location.href); url.searchParams.delete('q'); history.replaceState(null,'',url);
    searchInput.focus();
  });

  const about = document.getElementById('about-dialog');
  let aboutTrigger, previousOverflow;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-about]');
    if (!link || !about || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    closeSuggestions();
    closeLauncher();
    aboutTrigger = link.closest('.search-suggestions') ? searchInput : link;
    previousOverflow = document.body.style.overflow;
    about.showModal();
    document.body.style.overflow = 'hidden';
  });
  if (about) {
    const closeAbout = () => { about.close(); aboutTrigger?.focus(); };
    about.querySelector('[data-close-about]').addEventListener('click',closeAbout);
    about.addEventListener('keydown',event => { if (event.key === 'Escape') { event.preventDefault(); closeAbout(); } });
    about.addEventListener('click',event => {
      const bounds=about.getBoundingClientRect();
      if (event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom) closeAbout();
    });
    about.addEventListener('close',()=>{ document.body.style.overflow=previousOverflow || ''; aboutTrigger?.focus(); });
  }
  document.querySelectorAll('.about-tabs').forEach(tabList => {
    const tabs=[...tabList.querySelectorAll('[data-about-tab]')];
    const card=tabList.closest('.about-card');
    const activate=tab=>{
      tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});
      card.querySelectorAll('[role="tabpanel"]').forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls');});
    };
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>activate(tab));
      tab.addEventListener('keydown',event=>{
        let target;
        if(event.key==='ArrowRight')target=tabs[(index+1)%tabs.length];
        if(event.key==='ArrowLeft')target=tabs[(index+tabs.length-1)%tabs.length];
        if(event.key==='Home')target=tabs[0];
        if(event.key==='End')target=tabs.at(-1);
        if(target){event.preventDefault();activate(target);target.focus();}
      });
    });
  });

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
