import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from './content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const files = readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html'));
assert.equal(files.length, projects.length + 7, 'Every portfolio page must be built.');
let links = 0;
for (const file of files) {
  const path = resolve(dist, file);
  const html = readFileSync(path, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: expected one h1`);
  assert.match(html, /<html lang="en">/, `${file}: missing language`);
  assert.match(html, /name="description"/, `${file}: missing description`);
  assert.match(html, /<main id="main"/, `${file}: missing main landmark`);
  assert.match(html, /<title>[^<]+Lukas Bozinov<\/title>/, `${file}: missing page title`);
  assert.equal(html, readFileSync(resolve(root, file), 'utf8'), `${file}: root and deploy output differ`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(target)) continue;
    assert.notEqual(target, '#', `${file}: placeholder link`);
    const [pathname, fragment] = target.split('#');
    const local = pathname.startsWith('/') ? resolve(dist, '.' + pathname) : pathname ? resolve(dirname(path), pathname) : path;
    const destination = pathname === '/' ? resolve(dist, 'index.html') : local;
    assert.ok(existsSync(destination), `${file}: missing local target ${target}`);
    if (fragment) assert.ok(readFileSync(destination, 'utf8').includes(`id="${fragment}"`), `${file}: missing anchor ${target}`);
    links++;
  }
  const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  structured.forEach(([, json]) => assert.equal(JSON.parse(json).name, 'Lukas Bozinov'));
}
for (const [, target] of readFileSync(resolve(dist, 'styles.css'), 'utf8').matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
  assert.ok(existsSync(resolve(dist, target)), `Missing CSS asset: ${target}`);
}
const index = JSON.parse(readFileSync(resolve(dist, 'assets/search-index.json'), 'utf8'));
assert.equal(index.length, projects.length + 6, 'Search should include every project and six pages.');
for (const entry of index) assert.ok(existsSync(resolve(dist, entry.url)), `Missing search destination: ${entry.url}`);
for (const project of projects) assert.ok(index.some(entry => entry.url === `projects/${project.slug}.html`));
assert.ok(existsSync(resolve(dist, '.nojekyll')));
assert.ok(existsSync(resolve(dist, 'robots.txt')));
assert.ok(existsSync(resolve(dist, 'sitemap.xml')));
console.log(`Passed: ${files.length} pages, ${links} local links/assets, all search destinations, metadata, and matching deployment output.`);
