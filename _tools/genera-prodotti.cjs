// Pagine dei singoli prodotti (/prodotti/<marca>-<modello>/) generate dall'elenco P di /prodotti/index.html.
// La pagina /prodotti/ resta identica: il nome nella scheda diventa solo un link alla pagina del prodotto.
// Prezzi IVA esclusa, senza mai nominare l'IVA (decisione di Ezio, 16/11/2026). Rilanciare dopo ogni modifica dei prodotti:
//   node _tools/genera-prodotti.cjs
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'prodotti/index.html'), 'utf8');
const pick = (name) => {
  const i = src.indexOf(`const ${name} = [`);
  const j = src.indexOf('];', i);
  return Function(`return ${src.slice(i + `const ${name} = `.length, j + 1)}`)();
};
const P = pick('P');
const CATS = Object.fromEntries(pick('CATS'));
// Vendita solo ad aziende e PA: nessun reso (Ezio, 16/11/2026). Le spese di spedizione dipendono dall'ordine: niente tariffa fissa nei dati.
const RETURNS = { '@type': 'MerchantReturnPolicy', applicableCountry: 'IT', returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted' };
const BRAND = { UNIFI: 'UniFi', TELTONIKA: 'Teltonika', MIKROTIK: 'MikroTik', ZTE: 'ZTE', HUAWEI: 'Huawei' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (p) => `${BRAND[p.brand] || p.brand} ${p.n}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const img = (u, w) => (u && /cdn\.ecomm\.ui\.com/.test(u) ? `https://images.svc.ui.com/?u=${encodeURIComponent(u)}&w=${w}&q=75` : u);
const price = (p) => (p.price ? (p.id === 'sens3' || p.from ? 'da ' : '') + p.price.toLocaleString('it-IT', { minimumFractionDigits: p.price % 1 ? 2 : 0 }) + ' €' : 'Su richiesta');

// Testa e coda del sito prese da una pagina esistente (stesso menu, piè di pagina, tema e statistiche).
const base = fs.readFileSync(path.join(ROOT, 'ip-statico/index.html'), 'utf8');
const headEnd = base.indexOf('</head>');
const mainStart = base.indexOf('<main');
const mainEnd = base.indexOf('</main>') + '</main>'.length;

function page(p) {
  const brand = BRAND[p.brand] || p.brand;
  const name = `${brand} ${p.n}`;
  const url = `https://alpstore.it/prodotti/${slug(p)}/`;
  const title = `${name}${p.price ? ' · prezzo' : ''} · AlpStore`;
  const desc = `${name}: ${p.d} Arriva configurato e monitorato da KonnectAlps.`.slice(0, 300);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: p.d,
    brand: { '@type': 'Brand', name: brand },
    category: CATS[p.c] || undefined,
    image: p.img || 'https://alpstore.it/og.png',
    url,
    ...(p.price
      ? { offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'EUR', url, availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'PriceSpecification', price: String(p.price), priceCurrency: 'EUR', valueAddedTaxIncluded: false }, seller: { '@type': 'Organization', name: 'KonnectAlps S.r.l.' }, hasMerchantReturnPolicy: RETURNS } }
      : {}),
  };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Prodotti', item: 'https://alpstore.it/prodotti/' },
    { '@type': 'ListItem', position: 2, name, item: url },
  ] };
  let head = base.slice(0, headEnd)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="product">')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  head += `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n<script type="application/ld+json">${JSON.stringify(crumbs)}</script>\n`;
  const mono = "font-family: 'KA Mono', 'DejaVu Sans Mono', monospace; font-size: 12px; letter-spacing: 0.18em; color: #c4dfd8;";
  const main = `<main style="font-family: 'KA Sans', 'DejaVu Sans', Verdana, sans-serif; color: #fff; line-height: 1.55;">
<section style="max-width: 1200px; margin: 0 auto; padding: 56px 24px 72px;">
<p style="margin: 0 0 24px; font-size: 14px;"><a href="/prodotti/" style="color: #8c8c8c; text-decoration: none;">← Tutti i prodotti</a></p>
<div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start;">
<div style="flex: 1 1 380px; min-width: 0; background: ${p.img ? '#f2f3f3' : '#1a1a1a'}; border-radius: 20px; min-height: 320px; display: flex; align-items: center; justify-content: center; padding: 28px;">${p.img ? `<img src="${esc(img(p.img, 900))}" alt="${esc(name)}" style="max-width: 100%; max-height: 380px; object-fit: contain;" onerror="this.style.display='none'">` : `<span style="${mono}">${esc(CATS[p.c] || '')}</span>`}</div>
<div style="flex: 1 1 420px; min-width: 0;">
<p style="margin: 0 0 12px; ${mono}">${esc(brand.toUpperCase())} · ${esc((CATS[p.c] || '').toUpperCase())}</p>
<h1 style="margin: 0; font-weight: 700; font-size: clamp(32px, 5vw, 52px); line-height: 1.05; letter-spacing: -0.03em;">${esc(name)}</h1>
<p style="margin: 18px 0 0; font-size: 18px; color: #bdbdbd;">${esc(p.d)} Arriva configurato, con password e aggiornamenti gestiti da noi, e nel monitoraggio.</p>
<div style="margin-top: 28px; background: #111111; border: 1px solid #363636; border-radius: 16px; padding: 20px;">
<div style="${mono}">ACQUISTO</div>
<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 8px;"><span>Apparato</span><b style="font-size: 22px;">${esc(price(p))}</b></div>
${p.brand === 'UNIFI' && p.price ? '<div style="color: #8c8c8c; font-size: 12px;">Prezzo del listino ufficiale Ubiquiti Store Europa</div>' : ''}
<div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 14px;"><span>Configurazione</span><span style="color: #bdbdbd;">preventivo a parte</span></div>
<div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 14px;"><span>Monitoraggio e assistenza</span><span style="color: #bdbdbd;">canone su richiesta</span></div>
</div>
<div style="margin-top: 14px; background: #111111; border: 1px solid #363636; border-radius: 16px; padding: 20px;"><div style="${mono}">NOLEGGIO</div><div style="margin-top: 6px; color: #bdbdbd;">Apparato, configurazione e monitoraggio in un unico canone mensile: su richiesta.</div></div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
<a href="/prodotti/" style="background: #c4dfd8; color: #000; border-radius: 10px; padding: 14px 22px; font-weight: 600; text-decoration: none;">Richiedilo dalla pagina prodotti</a>
<a href="/configuratore/" style="border: 1px solid #363636; color: #fff; border-radius: 10px; padding: 14px 22px; font-weight: 600; text-decoration: none;">Progetta la tua soluzione</a>
</div>
${p.url ? `<p style="margin: 18px 0 0; font-size: 14px;"><a href="${esc(p.url)}" target="_blank" rel="noopener" style="color: #8c8c8c;">Scheda ufficiale del produttore ↗</a></p>` : ''}
</div></div></section>
</main>`;
  return head + base.slice(headEnd, mainStart) + main + base.slice(mainEnd);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const p of P) {
  const dir = path.join(ROOT, 'prodotti', slug(p));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
  urls.push(`https://alpstore.it/prodotti/${slug(p)}/`);
}
// Sitemap: righe dei prodotti rigenerate da zero, il resto resta com'è.
const smPath = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8').replace(/\s*<url><loc>https:\/\/alpstore\.it\/prodotti\/[^<]+\/<\/loc>[^\n]*<\/url>/g, (m) => (/\/prodotti\/<\/loc>/.test(m) ? m : ''));
sm = sm.replace('</urlset>', urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>');
fs.writeFileSync(smPath, sm);
console.log(`${P.length} pagine prodotto, sitemap aggiornata`);
