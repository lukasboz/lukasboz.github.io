import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
if (!existsSync(resolve(root, 'index.html'))) {
  console.error('Run npm run build before starting the preview.');
  process.exit(1);
}
const server = createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  let target = resolve(root, `.${pathname}`);
  if (target !== resolve(root) && !target.startsWith(resolve(root) + sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html');
  let status = 200;
  if (!existsSync(target) || !statSync(target).isFile()) {
    target = resolve(root, '404.html');
    status = 404;
  }
  response.writeHead(status, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (request.method === 'HEAD') response.end();
  else createReadStream(target).pipe(response);
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
server.on('error', error => { console.error(error.message); process.exit(1); });
