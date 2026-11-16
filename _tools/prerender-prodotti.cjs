// Copia statica della griglia di /prodotti/ (per chi non esegue JavaScript e per Google): apre la pagina con un server
// locale, aspetta il disegno della griglia e la scrive dentro <main id="app">. Rilanciare dopo genera-prodotti.cjs:
//   node _tools/prerender-prodotti.cjs
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/json', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  let f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0, async () => {
  const port = server.address().port;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await p.goto(`http://127.0.0.1:${port}/prodotti/`, { waitUntil: 'load' });
  await p.waitForFunction(() => document.querySelectorAll('#app article').length > 10, null, { timeout: 15000 });
  const inner = await p.$eval('#app', (e) => e.innerHTML);
  await b.close(); server.close();
  const file = path.join(ROOT, 'prodotti/index.html');
  const html = fs.readFileSync(file, 'utf8');
  const a = html.indexOf('<main id="app">') + '<main id="app">'.length;
  const z = html.indexOf('</main>', a);
  fs.writeFileSync(file, html.slice(0, a) + inner + html.slice(z));
  console.log('griglia statica aggiornata:', (inner.match(/<article/g) || []).length, 'schede');
});
