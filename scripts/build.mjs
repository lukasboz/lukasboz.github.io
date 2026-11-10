import { mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, projects, experience } from './content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const iconPaths = {
  search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.3 4.3"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  external: '<path d="M14 4h6v6m0-6L10 14"/><path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  wave: '<path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4"/>',
  chef: '<path d="M7 14a5 5 0 0 1-2-9 5 5 0 0 1 7-2 5 5 0 0 1 7 2 5 5 0 0 1-2 9v6H7zm0 3h10"/>',
  scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-5 10-5 10 0"/>',
  math: '<path d="M4 7h8M8 3v8m7 5h6m-6 4h6M4 16l6 6m0-6-6 6"/>',
  convert: '<path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4"/>',
  music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  code: '<path d="m8 5-7 7 7 7m8-14 7 7-7 7m-3-17-2 20"/>',
  file: '<path d="M14 2H5v20h14V7zm0 0v5h5M8 12h8m-8 4h8"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  print: '<path d="M6 9V3h12v6M6 18H3V9h18v9h-3M6 15h12v7H6z"/>',
  blocks: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="10" y="3" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><rect x="17" y="10" width="6" height="6" rx="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
  education: '<path d="m2 8 10-5 10 5-10 5zm4 2v7c4 3 8 3 12 0v-7m4-2v9"/>',
  star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
};
const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.code}</svg>`;
const projectIcon = project => `<span class="project-symbol ${project.color}">${icon(project.icon)}</span>`;
const wordmark = (prefix, large = false) => `<a class="wordmark${large ? ' wordmark--large' : ''}" href="${prefix}index.html" aria-label="Lukas, home"><span>L</span><span>u</span><span>k</span><span>a</span><span>s</span><span class="wordmark-dot">.</span></a>`;
const searchBar = (prefix, home = false) => `<form class="search-bar${home ? ' search-bar--home' : ''}" role="search" action="${prefix}projects.html" method="get" data-search-form>
  <div class="search-bar-field">${icon('search')}<label class="sr-only" for="site-search">Search projects, pages, and skills</label><input id="site-search" name="q" type="search" placeholder="Search projects, pages, skills..." autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="inline-search-results"><button class="search-clear" type="button" aria-label="Clear search" hidden>${icon('close')}</button><kbd class="search-key">Ctrl K</kbd></div>
  <div class="search-suggestions" id="search-suggestions" hidden><div id="inline-search-results" role="listbox" aria-label="Search suggestions"></div><p class="inline-search-status" id="search-status" role="status" aria-live="polite"></p></div>
</form>`;

function navigation(prefix, current, home) {
  const activePage = current.startsWith('projects/') ? 'projects.html' : current;
  return `<a class="skip-link" href="#main">Skip to content</a>
  <nav class="bookmark-bar" aria-label="Main navigation">
    ${[['index.html', 'H', 'Home', 'blue'], ['projects.html', 'W', 'Work', 'red'], ['about.html', 'A', 'About', 'purple'], ['resume.html', 'R', 'Resume', 'green']].map(([href, letter, label, color]) => `<a class="bookmark${activePage === href ? ' is-current' : ''}" href="${prefix}${href}"${activePage === href ? ' aria-current="page"' : ''}${href === 'about.html' && current !== 'about.html' ? ' data-about' : ''}><span class="bookmark-icon ${color}">${letter}</span>${label}</a>`).join('')}
    <span class="bookmark-caption">a little corner of the internet</span>
  </nav>
  <header class="${home ? 'home-topbar' : 'page-topbar'}">
    ${home ? '' : `<div class="header-search">${wordmark(prefix)}${searchBar(prefix)}</div>`}
    <nav class="utility-nav" aria-label="Quick links"><a href="${prefix}contact.html">Contact</a><a class="gallery-link" href="${prefix}gallery.html">Gallery</a><div class="launcher-wrap"><button class="icon-button launcher-button" type="button" aria-label="Open quick links" aria-expanded="false" aria-controls="app-launcher"><span class="nine-dots" aria-hidden="true">${'<i></i>'.repeat(9)}</span></button><div id="app-launcher" class="app-launcher" hidden>${[['projects.html', 'grid', 'Work', 'blue'], ['about.html', 'code', 'About', 'purple'], ['resume.html', 'file', 'Resume', 'green'], ['contact.html', 'mail', 'Contact', 'orange']].map(([href, symbol, label, color]) => `<a href="${prefix}${href}"><span class="launcher-symbol ${color}">${icon(symbol)}</span>${label}</a>`).join('')}<a href="${profile.github}" target="_blank" rel="noopener noreferrer"><span class="launcher-symbol neutral">${icon('code')}</span>GitHub</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"><span class="launcher-symbol blue"><b>in</b></span>LinkedIn</a></div></div><a class="avatar" href="${prefix}about.html" aria-label="About Lukas Bozinov">LB</a></nav>
  </header>`;
}

const footer = (prefix, home = false) => `<footer class="site-footer${home ? ' site-footer--home' : ''}"><span>${icon('pin')} Markham, Ontario</span><span>${home ? 'Built with curiosity.' : '© 2026 Lukas Bozinov'}</span><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub ${icon('external')}</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('external')}</a>${home ? '<button type="button" data-search class="footer-search">A shortcut to everything <kbd>/</kbd></button>' : `<a href="${prefix}index.html" class="footer-home">Back to home ${icon('arrow')}</a>`}</footer>`;

function aboutCard(prefix, standalone = false) {
  const skills = [
    ['Machine learning', 'Python · PyTorch · Demucs', 'blue'],
    ['Systems & computer vision', 'C / C++ · OpenCV · CUDA', 'red'],
    ['Web development', 'React · Next.js · Node.js', 'green'],
    ['Data & APIs', 'FastAPI · PostgreSQL · MongoDB', 'orange'],
    ['Testing & automation', 'Playwright · TypeScript · GitLab CI', 'purple'],
  ];
  return `<article class="about-card">
    <div class="about-cover"></div><div class="about-avatar" aria-hidden="true">LB</div>
    ${standalone ? '' : `<button class="about-close icon-button" type="button" data-close-about aria-label="Close About">${icon('close')}</button>`}
    <div class="about-card-body"><div class="about-identity"><div><${standalone ? 'h1' : 'h2'} id="about-name">Lukas Bozinov</${standalone ? 'h1' : 'h2'}><p>Software Engineer · Markham, Canada</p></div><span class="about-availability"><span class="status-dot"></span> Open to connect</span></div>
    <p class="about-description">I build software that connects high-performance systems with useful experiences. Currently working on computer vision, machine learning, and NPU driver validation at AMD, and studying Computer Science at Western. I like understanding how things work — from the hardware underneath to the details people interact with.</p>
    <div class="about-chips"><span>${icon('pin')} Markham, ON</span><span>${icon('clock')} Eastern time</span><span>${icon('education')} Western · Computer Science</span><span>${icon('star')} ${projects.length} projects · 2 internships · 3.8 GPA</span></div>
    <div class="about-tabs" role="tablist" aria-label="About Lukas">${[['skills','Skills'],['experience','Experience'],['facts','Fun facts']].map(([id,label],i)=>`<button type="button" role="tab" id="about-tab-${id}" aria-controls="about-panel-${id}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-about-tab="${id}">${label}</button>`).join('')}</div>
    <section class="about-tab-panel" role="tabpanel" id="about-panel-skills" aria-labelledby="about-tab-skills" tabindex="0"><h3 class="sr-only">Skills and tools</h3><div class="about-skill-list">${skills.map(([title,tools,color])=>`<div class="about-skill-row"><div><h4>${title}</h4><p>${tools}</p></div><span class="about-skill-line ${color}" aria-hidden="true"><i></i></span></div>`).join('')}</div></section>
    <section class="about-tab-panel" role="tabpanel" id="about-panel-experience" aria-labelledby="about-tab-experience" tabindex="0" hidden><h3 class="sr-only">Experience and education</h3>${experienceList()}</section>
    <section class="about-tab-panel" role="tabpanel" id="about-panel-facts" aria-labelledby="about-tab-facts" tabindex="0" hidden><h3 class="sr-only">A few things about me</h3><div class="about-facts"><div><span class="blue">${icon('wave')}</span><p><strong>I like local-first tools.</strong> Stem Separator keeps audio processing on your own computer, and TETR.IO RL includes an offline arena.</p></div><div><span class="green">${icon('code')}</span><p><strong>Curiosity got me into software.</strong> I started by wanting to understand how computers work, including the hardware underneath.</p></div><div><span class="orange">${icon('education')}</span><p><strong>Still learning, always building.</strong> I'm pursuing an Honours Specialization in Computer Science at Western, with graduation expected in April 2027.</p></div></div></section>
    <nav class="about-socials" aria-label="Connect with Lukas"><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><b>in</b></a><a href="${profile.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${icon('code')}</a><a href="${profile.devpost}" target="_blank" rel="noopener noreferrer" aria-label="Devpost"><b>D</b></a><a href="mailto:${profile.email}" aria-label="Email Lukas">${icon('mail')}</a></nav>
    <div class="about-actions"><a class="button button--blue" href="${prefix}contact.html">Let's work together ${icon('arrow')}</a><a class="button button--outline" href="${prefix}resume.html">Resume ${icon('file')}</a></div></div>
  </article>`;
}
function aboutDialog(prefix) {
  return `<dialog class="about-dialog" id="about-dialog" aria-labelledby="about-name">${aboutCard(prefix)}</dialog>`;
}

function page({ title, description, current, body, home = false, deep = false }) {
  const prefix = deep ? '../' : '';
  const isAbout = current === 'about.html';
  const canonical = `https://lukasboz.github.io/${current === 'index.html' ? '' : current}`;
  const classes = home ? 'home-page' : isAbout ? 'home-page about-page' : current === 'projects.html' ? 'inner-page work-page' : 'inner-page';
  const markup = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="${home || isAbout ? '#5c9bc5' : '#ffffff'}"><title>${escape(title)} | Lukas Bozinov</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)} | Lukas Bozinov"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">${home || isAbout ? `<link rel="preload" href="${prefix}assets/landscape.png" as="image">` : ''}<link rel="stylesheet" href="${prefix}styles.css"><script src="${prefix}main.js" defer></script></head>
<body class="${classes}" data-base="${prefix}">${navigation(prefix, current, home || isAbout)}${body}${footer(prefix, home)}${isAbout ? '' : aboutDialog(prefix)}<div class="toast" id="toast" role="status" aria-live="polite"></div><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: 'https://lukasboz.github.io/', jobTitle: 'Software Engineer', sameAs: [profile.github, profile.linkedin, profile.devpost] })}</script></body></html>`;
  return isAbout ? markup : markup.replace(/<a\b([^>]*\bhref="(?:\.\.\/)?about\.html"[^>]*)>/g, (match, attributes) => attributes.includes('data-about') ? match : `<a${attributes} data-about>`);
}

function home() {
  return page({ title: 'Software, systems & a little curiosity', description: 'Lukas Bozinov — software engineer working in computer vision and machine learning at AMD. Explore projects, experience, and ideas.', current: 'index.html', home: true, body: `
  <main id="main" class="home-main"><div class="home-content"><div class="home-eyebrow"><span class="status-dot"></span> SOFTWARE ENGINEER & CURIOUS BUILDER</div><h1>Lukas Bozinov</h1><p class="home-description">From the hardware up. From an idea to something useful.</p>${searchBar('', true)}<div class="home-actions"><a class="action-chip" href="projects.html"><span class="chip-symbol blue">${icon('grid')}</span><span><strong>Explore my work</strong><small>Projects, experiments, and the details</small></span>${icon('arrow', 'chip-arrow')}</a><a class="action-chip" href="contact.html"><span class="chip-symbol orange">${icon('mail')}</span><span><strong>Let's work together</strong><small>Good ideas start with a conversation</small></span>${icon('arrow', 'chip-arrow')}</a></div><nav class="project-shortcuts" aria-label="Featured projects">${projects.slice(0, 4).map(project => `<a class="shortcut" href="projects/${project.slug}.html">${projectIcon(project)}<span>${project.short}</span></a>`).join('')}</nav><a class="home-current" href="about.html"><span class="status-dot"></span> Currently building at <strong>AMD</strong><span aria-hidden="true">↗</span></a></div></main>` });
}

function profilePanel(prefix = '') {
  return `<aside class="profile-panel" aria-label="About Lukas"><div class="profile-cover"></div><div class="profile-panel-body"><div class="profile-heading"><div><h2>Lukas Bozinov</h2><p>Software Engineer · Computer Vision & ML</p></div></div>
  <dl class="profile-facts"><div><dt>Based</dt><dd>Markham, Canada</dd></div><div><dt>Currently</dt><dd><span class="status-dot"></span> Engineer at AMD</dd></div><div><dt>Tools</dt><dd>Python, C++, PyTorch</dd></div><div><dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div></dl>
  <div class="profile-buttons"><a class="button button--blue" href="${prefix}contact.html">Hire me</a><a class="button button--outline" href="${prefix}resume.html">Resume</a></div><div class="profile-more"><h3>More from Lukas</h3><a href="${prefix}index.html">Portfolio Home</a><a href="${prefix}about.html">About Lukas</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn profile</a><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub repos</a><a href="${profile.devpost}" target="_blank" rel="noopener noreferrer">Devpost projects</a></div></div></aside>`;
}

function projectPreview(project, compact = false) {
  let content;
  if (project.slug === 'stem-separator') {
    content = `<div class="demo-app demo-audio"><div class="demo-top"><span>${icon('wave')} Stem Separator</span><span class="demo-dots">•••</span></div><div class="audio-track"><span class="audio-play">▶</span><div class="audio-track-name">Find a new perspective<small>4 stems · local processing</small></div><span class="audio-duration">03:42</span></div><div class="wave-tracks">${['Vocals', 'Drums', 'Bass', 'Other'].map((label, index) => `<div class="wave-row"><span>${label}</span><div class="waveform waveform-${index}">${Array.from({ length: 46 }, (_, i) => `<i style="--h:${12 + Math.round(Math.abs(Math.sin(i * 1.37 + index * 2) * Math.cos(i * 0.4)) * 88)}%"></i>`).join('')}</div><span class="wave-level">${['−2.0', '0.0', '−4.0', '0.0'][index]}</span></div>`).join('')}</div><div class="demo-bottom"><span><i></i> All processing stays on your device</span><span>Export stems ↗</span></div></div>`;
  } else if (project.slug === 'tetrio-rl') {
    const cells = Array.from({length:120},(_,i)=>{const row=Math.floor(i/10),column=i%10;const filled=row>8 || (row>6 && column<4) || (row>4 && column>6) || [24,25,35,36].includes(i);return `<i class="${filled?'is-filled block-'+((column+row)%4):''}"></i>`;}).join('');
    content = `<div class="demo-app demo-tetrio"><div class="demo-top"><span>${icon('blocks')} TETR.IO RL</span><span class="demo-pill">Double DQN</span></div><div class="tetrio-body"><div class="tetrio-board">${cells}</div><div class="tetrio-info"><span class="demo-eyebrow">LEARN. PLACE. REPEAT.</span><strong>One move.<br>More possibilities.</strong><span>Python / PyTorch</span><small>Offline arena · HTML replay</small><div class="tetrio-block">${icon('blocks')}</div></div></div></div>`;
  } else if (project.slug === 'chef-ai') {
    content = `<div class="demo-app demo-chef"><div class="demo-top"><span>${icon('chef')} chef.ai</span><span class="demo-pill">Your kitchen, smarter</span></div><div class="chef-body"><span class="demo-eyebrow">GOOD FOOD. LESS WASTE.</span><strong>A little inspiration.<br>A lot less waste.</strong><div class="ingredient-row"><span>🥑<small>Avocado</small></span><span>🥬<small>Spinach</small></span><span>🍅<small>Tomato</small></span></div><div class="chef-suggestion">${icon('chef')} From your fridge to your next favourite meal ${icon('arrow')}</div></div></div>`;
  } else if (project.slug === 'facial-recognition') {
    content = `<div class="demo-app demo-vision"><div class="demo-top"><span>${icon('scan')} Vision / Security</span><span class="demo-pill"><i></i> Live</span></div><div class="vision-screen"><div class="vision-grid"></div><div class="face-scan"><div class="scan-avatar">${icon('scan')}</div><span class="scan-line"></span><span class="scan-caption">FACE DETECTED</span></div><div class="vision-status">${icon('check')} Identity recognized <small>Access authorized</small></div></div><div class="demo-bottom"><span>OpenCV + C++</span><span>Real-time recognition</span></div></div>`;
  } else if (project.slug === 'math-challenge') {
    content = `<div class="demo-app demo-math"><div class="demo-top"><span>${icon('math')} Math Challenge</span><span class="demo-pill">Multiplayer</span></div><div class="math-body"><span class="demo-eyebrow">READY. SET. SOLVE.</span><strong>12 × 8 = <span>?</span></strong><div class="math-answers"><span>84</span><span class="correct">96 ${icon('check')}</span><span>108</span></div><div class="math-progress"><i></i></div><small>A little friendly competition.</small></div></div>`;
  } else if (project.slug === 'easyconvert') {
    content = `<div class="demo-app demo-convert"><div class="demo-top"><span>${icon('convert')} EasyConvert</span><span class="demo-dots">•••</span></div><div class="convert-body"><div class="convert-files"><span>${icon('file')}<small>your-file</small></span>${icon('convert')}<span>${icon('check')}<small>converted</small></span></div><strong>A change of format.<br>Without the friction.</strong><span class="demo-pill">Drop. Convert. Done.</span></div></div>`;
  } else {
    content = `<div class="demo-app demo-music"><div class="demo-top"><span>${icon('music')} YTMP3</span><span class="demo-dots">•••</span></div><div class="music-body"><div class="music-disc">${icon('music')}</div><strong>Take the audio with you.</strong><div class="music-progress"><i></i></div><span class="demo-eyebrow">PYTHON · CUSTOMTKINTER</span></div></div>`;
  }
  return `<div class="project-preview preview-${project.color}${compact ? ' project-preview--compact' : ''}" aria-hidden="true">${content}</div>`;
}

const tags = project => `<div class="tags"><span class="tag ${project.color}">${project.category}</span>${project.stack.slice(0, 3).map(tool => `<span class="tag">${escape(tool)}</span>`).join('')}</div>`;
function result(project) {
  const keywords = escape(`${project.slug} ${project.name} ${project.summary} ${project.category} ${project.type} ${project.stack.join(' ')} ${project.tools.join(' ')}`.toLowerCase());
  return `<article class="project-result" data-category="${project.categoryId}" data-search-text="${keywords}"><a class="result-source" href="projects/${project.slug}.html">${projectIcon(project)}<span><strong>lukasboz.github.io › projects › ${project.slug}</strong><small>lukasboz.github.io/projects/${project.slug}</small></span></a><div class="result-main"><h2><a href="projects/${project.slug}.html">${project.name} — ${project.type}</a></h2><p>${project.summary}</p>${tags(project)}</div></article>`;
}

function workPage() {
  return page({title:'Selected work', description:'Explore software, machine learning, computer vision, web, and desktop projects by Lukas Bozinov.', current:'projects.html', body:`
  <main id="main" class="page-shell work-shell"><h1 class="sr-only">Projects by Lukas Bozinov</h1><div class="results-layout"><div class="results-column">
  <div class="section-tabs" role="group" aria-label="Filter projects">${[['all','All'],['ai','AI & ML'],['vision','Vision'],['web','Web'],['tools','Tools']].map(([id,name],i)=>`<button type="button" class="filter-tab${i===0?' is-active':''}" data-filter="${id}" aria-pressed="${i===0}">${name}</button>`).join('')}</div>
  <section class="overview-card" aria-labelledby="portfolio-overview"><h2 class="card-label" id="portfolio-overview"><span class="bookmark-icon red">P</span> Portfolio Overview</h2><p><strong>Lukas Bozinov</strong> is a software engineer based in Markham, Canada. Working on <strong>computer vision, machine learning, and NPU driver validation at AMD</strong>, and studying Computer Science at Western University. Building useful software across AI, systems, and the full stack.</p><div class="overview-stats"><span><strong class="text-blue">${projects.length}</strong>Projects</span><span><strong class="text-red">2</strong>Internships</span><span><strong class="text-yellow">3.8</strong>GPA</span><span><strong class="text-green">2027</strong>Grad year</span></div><nav class="overview-gallery" aria-label="Featured project previews">${projects.slice(0,5).map(project=>`<a href="projects/${project.slug}.html" aria-label="${project.name}">${projectPreview(project,true)}</a>`).join('')}</nav></section>
  <p id="results-counter" class="sr-only" role="status" aria-live="polite">${projects.length} projects</p><div id="project-results">${projects.map(result).join('')}</div><div class="work-empty" id="work-empty" hidden><h2>No projects found.</h2><p>Try another search or choose a different category.</p><button type="button" class="text-link" data-reset-work>Show all projects</button></div>
  </div>${profilePanel()}</div></main>`});
}

function experienceList() {
  return `<div class="experience-list">${experience.map(item => `<article class="experience-item"><span class="company-mark ${item.color}">${item.letter}</span><div><div class="experience-company"><h3>${item.company}</h3><span>${item.date}</span></div><h4>${item.role}</h4><p>${item.description}</p><small>${icon('pin')}${item.location}</small></div></article>`).join('')}</div>`;
}
const skillGroups = [['Languages', 'Python', 'C / C++', 'JavaScript / TypeScript', 'Java', 'Go', 'SQL'], ['AI & systems', 'PyTorch', 'OpenCV', 'CUDA', 'OpenMP', 'SIMD', 'Linux'], ['Web & data', 'React', 'Next.js', 'Node.js', 'Flask', 'PostgreSQL', 'MongoDB'], ['Tools & workflow', 'Git', 'GitLab CI/CD', 'Playwright', 'Allure', 'OAuth 2.0']];
function aboutPage() {
  return page({title:'About me', description:'Meet Lukas Bozinov: software engineering at AMD, computer science at Western, and curiosity from the hardware up.',current:'about.html',body:`<main id="main" class="about-standalone">${aboutCard('',true)}</main>`});
}

function contactPage() {
  return page({ title: 'Let’s talk', description: 'Get in touch with Lukas Bozinov about software engineering, projects, collaborations, and opportunities.', current: 'contact.html', body: `<main id="main" class="page-shell contact-shell"><div class="page-breadcrumb"><a href="index.html">Home</a><span>/</span> Contact</div><div class="contact-heading"><span class="eyebrow"><span class="status-dot"></span> GOOD CONVERSATIONS START HERE</span><h1>Something on your mind?<br><span>Let's talk about it.</span></h1><p>A project, an opportunity, or a shared curiosity.<br>I'd love to hear what you're thinking.</p></div><div class="contact-layout"><section class="contact-channels" aria-label="Ways to get in touch"><a class="email-card" href="mailto:${profile.email}"><span class="channel-symbol blue">${icon('mail')}</span><span><small>THE BEST WAY TO REACH ME</small><strong>${profile.email}</strong></span>${icon('external')}</a><button type="button" class="copy-email" data-copy-email>${icon('copy')} Copy email address</button><div class="contact-socials"><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"><span class="channel-symbol blue"><b>in</b></span><span><strong>LinkedIn</strong><small>Experience & connections</small></span>${icon('external')}</a><a href="${profile.github}" target="_blank" rel="noopener noreferrer"><span class="channel-symbol neutral">${icon('code')}</span><span><strong>GitHub</strong><small>The code behind the projects</small></span>${icon('external')}</a><a href="${profile.devpost}" target="_blank" rel="noopener noreferrer"><span class="channel-symbol purple"><b>D</b></span><span><strong>Devpost</strong><small>Experiments & hackathons</small></span>${icon('external')}</a></div><p class="contact-location">${icon('pin')} Markham, Ontario, Canada <span>Local & remote conversations welcome.</span></p></section><section class="contact-form-card"><div class="card-label">${icon('mail')} A note to Lukas</div><h2>Start a conversation.</h2><form id="contact-form" action="mailto:${profile.email}" method="get" enctype="text/plain"><div class="form-pair"><div class="form-field"><label for="name">Your name</label><input id="name" name="name" placeholder="Alex Morgan" required autocomplete="name" maxlength="100"></div><div class="form-field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="alex@example.com" required autocomplete="email" maxlength="254"></div></div><div class="form-field"><label for="subject">What's it about?</label><select id="subject" name="subject"><option>A project or collaboration</option><option>A career opportunity</option><option>A question about your work</option><option>Just saying hello</option></select></div><div class="form-field"><label for="message">Your message</label><textarea id="message" name="body" rows="5" placeholder="A little context goes a long way..." required maxlength="5000"></textarea></div><button class="button button--blue form-submit" type="submit">Open email draft ${icon('arrow')}</button><p class="form-note" id="form-status" role="status">Opens your email app with the details filled in. You send it from there.</p></form></section></div></main>` });
}

function resumePage() {
  return page({ title: 'Resume', description: 'Lukas Bozinov’s experience, education, and technical skills. View a print-friendly resume or save a PDF from your browser.', current: 'resume.html', body: `<main id="main" class="page-shell resume-shell"><div class="resume-toolbar"><div class="page-breadcrumb"><a href="index.html">Home</a><span>/</span> Resume</div><button type="button" class="button button--outline" data-print>${icon('print')} Print / save PDF</button></div><article class="resume-sheet"><header class="resume-heading"><span class="eyebrow">SOFTWARE ENGINEER</span><h1>Lukas Bozinov<span class="text-blue">.</span></h1><p>Computer vision · Machine learning · High-performance systems</p><div class="resume-contact"><a href="mailto:${profile.email}">${profile.email}</a><span>Markham, ON, Canada</span><a href="${profile.github}">github.com/lukasboz</a><a href="${profile.linkedin}">LinkedIn</a></div></header><section class="resume-section"><h2>Profile</h2><p>Computer Science student at Western University with a 3.8 GPA and engineering experience at AMD and J.D. Power. Building software across computer vision, machine learning, driver validation, automation, and full-stack development.</p></section><section class="resume-section"><h2>Experience & education</h2>${experienceList()}</section><section class="resume-section"><h2>Selected projects</h2><div class="resume-projects">${projects.slice(0, 4).map(project => `<div><h3><a href="projects/${project.slug}.html">${project.name} ${icon('external')}</a></h3><p>${project.summary}</p><small>${project.stack.join(' · ')}</small></div>`).join('')}</div></section><section class="resume-section"><h2>Technical skills</h2><div class="resume-skills">${skillGroups.map(([title, ...skills]) => `<p><strong>${title}</strong><span>${skills.join(' · ')}</span></p>`).join('')}</div></section></article></main>` });
}

function galleryPage() {
  return page({ title: 'Project gallery', description: 'A visual index of software projects by Lukas Bozinov, from AI audio separation to computer vision and real-time applications.', current: 'gallery.html', body: `<main id="main" class="page-shell gallery-shell"><div class="page-breadcrumb"><a href="index.html">Home</a><span>/</span> Gallery</div><div class="gallery-heading"><div><span class="eyebrow">A DIFFERENT WAY TO EXPLORE</span><h1>A few things I've built<span class="text-blue">.</span></h1><p>${projects.length} projects. Different problems. The same curiosity.</p></div><a class="text-link" href="projects.html">Switch to list view ${icon('arrow')}</a></div><div class="gallery-grid">${projects.map(project => `<a class="gallery-card" href="projects/${project.slug}.html">${projectPreview(project)}<div class="gallery-card-info"><div><h2>${project.name}</h2><p>${project.category} <span>·</span> ${project.stack.slice(0, 2).join(' / ')}</p></div><span class="gallery-arrow">${icon('arrow')}</span></div></a>`).join('')}</div><p class="concept-caption">Project visuals are interface concepts that illustrate each project's focus.</p></main>` });
}

function projectPage(project, index) {
  const next = projects[(index + 1) % projects.length];
  return page({ title: project.name, description: project.summary, current: `projects/${project.slug}.html`, deep: true, body: `<main id="main" class="page-shell project-shell"><div class="page-breadcrumb"><a href="../projects.html">All work</a><span>/</span>${project.name}</div><header class="project-header"><div class="project-header-label">${projectIcon(project)}<span>${project.category}</span><span class="project-header-divider">/</span><span>PROJECT NOTES</span></div><h1>${project.name}<span class="text-${project.color}">.</span></h1><p class="project-tagline">${project.tagline}</p><p class="project-summary">${project.summary}</p><div class="project-meta"><div><span>ROLE</span><strong>${project.role}</strong></div><div><span>TYPE</span><strong>${project.type}</strong></div><div><span>BUILT WITH</span><strong>${project.stack.slice(0, 3).join(' · ')}</strong></div></div></header><figure class="project-figure">${projectPreview(project)}<figcaption>Interface concept · A visual interpretation of the project</figcaption></figure><div class="project-article-layout"><article class="project-article">${project.sections.map(([heading, ...paragraphs], i) => `<section id="section-${i}"><span class="article-section-number">0${i + 1}</span><div><h2>${heading}</h2>${paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</div></section>`).join('')}<section id="features"><span class="article-section-number">03</span><div><h2>What it does.</h2><ul class="feature-list">${project.features.map(feature => `<li>${icon('check')}<span>${escape(feature)}</span></li>`).join('')}</ul></div></section><section id="stack"><span class="article-section-number">04</span><div><h2>The tools behind it.</h2><div class="tags stack-tags">${project.tools.map(tool => `<span class="tag">${escape(tool)}</span>`).join('')}</div></div></section></article><aside class="project-sidebar"><h2>In this project</h2>${project.sections.map(([heading], i) => `<a href="#section-${i}">${heading}</a>`).join('')}<a href="#features">What it does</a><a href="#stack">The stack</a><div class="sidebar-divider"></div>${project.github ? `<a class="text-link" href="${project.github}" target="_blank" rel="noopener noreferrer">View source on GitHub ${icon('external')}</a>` : `<a class="text-link" href="../contact.html">Ask me about this project ${icon('arrow')}</a>`}<a class="text-link" href="../projects.html">All projects ${icon('arrow')}</a></aside></div><a class="next-project" href="${next.slug}.html"><div><span class="eyebrow">UP NEXT</span><h2>${next.name}</h2><p>${next.tagline}</p></div>${projectIcon(next)}${icon('arrow')}</a></main>` });
}

const pages = { 'index.html': home(), 'projects.html': workPage(), 'about.html': aboutPage(), 'contact.html': contactPage(), 'resume.html': resumePage(), 'gallery.html': galleryPage() };
for (const [index, project] of projects.entries()) pages[`projects/${project.slug}.html`] = projectPage(project, index);
pages['404.html'] = page({ title: 'Page not found', description: 'This page has wandered off. Find your way back to Lukas Bozinov’s portfolio.', current: '404.html', body: '<main id="main" class="not-found"><span class="error-number">404</span><h1>A little off the beaten path.</h1><p>This page may have moved. There’s plenty to explore back home.</p><a class="button button--blue" href="/">Back to home →</a></main>' }).replace(/(href|src)="(?!https?:|mailto:|#|\/)([^"\s]+)"/g, '$1="/$2"').replace('data-base=""', 'data-base="/"');

const searchIndex = [
  ...projects.map(project => ({ title: project.name, description: project.summary, category: project.category, url: `projects/${project.slug}.html`, keywords: `${project.slug} ${project.stack.join(' ')} ${project.tools.join(' ')} ${project.type}`, color: project.color, icon: project.icon })),
  ...[['Home', 'A little corner of the internet', 'index.html', 'portfolio home'], ['About Lukas', 'The person behind the projects', 'about.html', 'AMD Western experience education skills computer science'], ['Resume', 'Experience, education, and a printable resume', 'resume.html', 'CV PDF download education jobs'], ['Contact', 'A project, an opportunity, or just hello', 'contact.html', 'email hire linkedin github talk'], ['All work', 'Explore every project', 'projects.html', 'projects work software'], ['Gallery', 'A visual index of projects', 'gallery.html', 'images visuals gallery']].map(([title, description, url, keywords]) => ({ title, description, url, keywords, category: 'Page', color: 'blue', icon: 'file' })),
];
mkdirSync(dist, { recursive: true });
for (const [name, content] of Object.entries(pages)) {
  for (const directory of [root, dist]) {
    const destination = resolve(directory, name);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, content.replace(/[\t ]+$/gm, '') + '\n');
  }
}
writeFileSync(resolve(root, 'assets/search-index.json'), JSON.stringify(searchIndex));
for (const name of ['styles.css', 'main.js', 'assets']) cpSync(resolve(root, name), resolve(dist, name), { recursive: true });
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).filter(name => name !== '404.html').map(name => `<url><loc>https://lukasboz.github.io/${name === 'index.html' ? '' : name}</loc></url>`).join('')}</urlset>`;
for (const directory of [root, dist]) {
  writeFileSync(resolve(directory, '.nojekyll'), '');
  writeFileSync(resolve(directory, 'sitemap.xml'), sitemap + '\n');
  writeFileSync(resolve(directory, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://lukasboz.github.io/sitemap.xml\n');
}
console.log(`Built ${Object.keys(pages).length} static pages in the repository root and dist/.`);
