// Pagina /sd-wan/ (Ezio, 16/11/2026): SD-WAN e bonding delle linee. Testa, menu e piè di pagina presi da /ip-statico/.
// Niente Huawei su AlpStore (decisione di Ezio 16/11/2026). Rilanciare dopo modifiche: node _tools/genera-sdwan.cjs
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const base = fs.readFileSync(path.join(ROOT, 'ip-statico/index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const url = 'https://alpstore.it/sd-wan/';
const title = 'SD-WAN e bonding delle linee per aziende · AlpStore';
const desc = 'SD-WAN per aziende: fibra, FWA, 5G e satellite uniti in una sola connessione. Se una linea cade la sede resta online, con il bonding le linee si sommano. Teltonika WANplex o concentratore MikroTik, gestiti e monitorati da noi.';

const faq = [
  ['Che differenza c’è tra failover e bonding?', 'Con il failover, se la linea principale cade il traffico passa sull’altra in pochi secondi. Con il bonding le linee lavorano insieme: la banda si somma e, se una cade, le chiamate, le VPN e le videochiamate non si interrompono.'],
  ['Serve cambiare le linee che ho già?', 'No. L’SD-WAN lavora sopra le linee che ci sono: fibra, FWA, 5G o satellite, anche di operatori diversi. Aggiungiamo solo quello che manca, per esempio una SIM 5G come seconda linea.'],
  ['Quanto costa?', 'Il failover costa 19 € al mese per sede, con il monitoraggio compreso. Bonding e multisede li prezziamo su progetto, in base a sedi, linee e banda. Router e linee a parte, in vendita o a noleggio.'],
];

const tiers = [
  ['FAILOVER', 'SD-WAN Failover', 19, 99, ['Cambio linea automatico in pochi secondi', 'Due o più linee anche di operatori diversi', 'Avvisi e storico dei cambi di linea']],
  ['BONDING', 'SD-WAN Bonding', null, null, ['Linee sommate: più banda', 'Chiamate, VPN e videochiamate senza interruzioni', 'Teltonika WANplex o concentratore KonnectAlps']],
  ['MULTISEDE', 'SD-WAN Multisede', null, null, ['IP statico unico che non cambia', 'Sedi collegate in rete privata cifrata', 'Priorità a voce e casse']],
];
const mono = "font-family: 'KA Mono', 'DejaVu Sans Mono', monospace; font-size: 12px; letter-spacing: 0.18em; color: #c4dfd8;";
const card = (k, t, body) => `<div style="flex: 1 1 320px; min-width: 0; background: #111111; border: 1px solid #363636; border-radius: 16px; padding: 24px;">
<p style="margin: 0 0 10px; ${mono}">${k}</p>
<h3 style="margin: 0 0 12px; font-size: 22px; line-height: 1.2;">${t}</h3>
${body}
</div>`;
const li = (items) => `<ul style="margin: 0; padding-left: 18px; color: #bdbdbd;">${items.map((x) => `<li style="margin: 6px 0;">${x}</li>`).join('')}</ul>`;

const main = `<main style="font-family: 'KA Sans', 'DejaVu Sans', Verdana, sans-serif; color: #fff; line-height: 1.55;">
<section style="max-width: 1200px; margin: 0 auto; padding: 80px 24px 40px;">
<p style="margin: 0 0 14px; ${mono}">SD-WAN · BONDING · CONTINUITÀ</p>
<h1 style="margin: 0; font-weight: 700; font-size: clamp(36px, 6vw, 64px); line-height: 1.05; letter-spacing: -0.03em;">Più linee, una connessione sola.</h1>
<p style="margin: 18px 0 0; font-size: 18px; color: #bdbdbd; max-width: 760px;">Uniamo fibra, FWA, 5G e satellite, anche di operatori diversi. Se una linea cade la sede resta online; con il bonding le linee si sommano e le chiamate, le VPN e le videochiamate non si interrompono. Configuriamo tutto noi e lo teniamo nel monitoraggio.</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px;">
<a class="cta" href="/configuratore/" style="background: #c4dfd8; color: #000; border-radius: 10px; padding: 14px 22px; font-weight: 600; text-decoration: none;">Progetta la tua soluzione</a>
<a href="/prodotti/" style="border: 1px solid #363636; color: #fff; border-radius: 10px; padding: 14px 22px; font-weight: 600; text-decoration: none;">Router e SIM</a>
</div>
</section>
<section style="max-width: 1200px; margin: 0 auto; padding: 56px 24px;">
<h2 style="margin: 0 0 22px; font-size: 34px; line-height: 1.1;">Due modi, scelti in base alla sede</h2>
<div style="display: flex; flex-wrap: wrap; gap: 18px;">
${card('TELTONIKA · WANPLEX', 'Bonding nel cloud Teltonika', `<p style="margin: 0 0 12px; color: #bdbdbd;">Sui router Teltonika compatibili attiviamo WANplex dal sistema di gestione remota (RMS): le linee vengono unite pacchetto per pacchetto, senza apparati in più in sede.</p>
${li(['Linee 4G/5G, fisse e satellite insieme', 'Failover senza cadere VPN e videochiamate', 'Attivazione da remoto, nessun intervento in sede', 'Ideale per una o poche sedi, cantieri e mezzi'])}`)}
${card('KONNECTALPS · MIKROTIK', 'SD-WAN con il nostro concentratore', `<p style="margin: 0 0 12px; color: #bdbdbd;">Il router in sede (Teltonika o MikroTik) porta tutte le linee, cifrate, al nostro concentratore MikroTik: l’uscita su internet è una sola, con un IP statico che non cambia qualunque linea stia lavorando.</p>
${li(['IP statico unico per centralino, telecamere e accessi da remoto', 'Più sedi collegate tra loro in rete privata', 'Priorità a voce e casse sul traffico normale', 'Ideale per catene di negozi, uffici e hotel'])}`)}
</div>
</section>
<section style="max-width: 1200px; margin: 0 auto; padding: 56px 24px;">
<h2 style="margin: 0 0 22px; font-size: 34px; line-height: 1.1;">Prezzi</h2>
<div style="display: flex; flex-wrap: wrap; gap: 18px;">
${tiers.map(([k, t, can, att, body]) => card(k, t, (can ? `<p style="margin: 0 0 6px; font-size: 30px; font-weight: 700;">${can} €<span style="font-size: 15px; font-weight: 400; color: #8c8c8c;"> /mese per sede</span></p><p style="margin: 0 0 12px; color: #8c8c8c; font-size: 14px;">Attivazione ${att} €</p>` : `<p style="margin: 0 0 6px; font-size: 30px; font-weight: 700;">Su progetto</p><p style="margin: 0 0 12px; color: #8c8c8c; font-size: 14px;">In base a sedi, linee e banda</p>`) + li(body))).join('\n')}
</div>
<p style="margin: 16px 0 0; color: #8c8c8c; font-size: 14px;">Monitoraggio h24 compreso. Router e linee a parte, in vendita o a noleggio. <a href="/configuratore/" style="color: #c4dfd8;">Chiedi un progetto</a>.</p>
</section>
<section style="max-width: 1200px; margin: 0 auto; padding: 56px 24px;">
<h2 style="margin: 0 0 22px; font-size: 34px; line-height: 1.1;">Come lavoriamo</h2>
<div style="display: flex; flex-wrap: wrap; gap: 18px;">
${card('1 · ANALISI', 'Le linee che ci sono', '<p style="margin: 0; color: #bdbdbd;">Guardiamo le linee della sede e la copertura 4G/5G, e proponiamo la seconda linea se manca.</p>')}
${card('2 · CONFIGURAZIONE', 'Pronto da collegare', '<p style="margin: 0; color: #bdbdbd;">Il router arriva configurato e provato: in sede basta collegarlo.</p>')}
${card('3 · MONITORAGGIO', 'Sempre sotto controllo', '<p style="margin: 0; color: #bdbdbd;">Ogni linea è nel monitoraggio h24: stato, consumi e cambi di linea li vedi dalla console.</p>')}
</div>
</section>
<section style="max-width: 1200px; margin: 0 auto; padding: 56px 24px 80px;">
<h2 style="margin: 0 0 18px; font-size: 34px; line-height: 1.1;">Domande frequenti</h2>
<style>details.faq{border-bottom:1px solid #262626;padding:16px 0}details.faq summary{cursor:pointer;font-weight:600;font-size:18px}details.faq p{margin:10px 0 0;color:#bdbdbd}</style>
<div style="border-top: 1px solid #262626;">${faq.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</section>
</main>`;

const ld = [
  { '@context': 'https://schema.org', '@type': 'Service', name: 'SD-WAN e bonding delle linee', serviceType: 'SD-WAN', description: desc, url, areaServed: 'IT', provider: { '@type': 'Organization', name: 'KonnectAlps S.r.l.', url: 'https://alpstore.it/' }, offers: tiers.filter((x) => x[2]).map(([, t, can]) => ({ '@type': 'Offer', name: t, price: String(can), priceCurrency: 'EUR', priceSpecification: { '@type': 'UnitPriceSpecification', price: String(can), priceCurrency: 'EUR', unitText: 'mese per sede', valueAddedTaxIncluded: false } })) },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
];
const headEnd = base.indexOf('</head>');
let head = base.slice(0, headEnd)
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
  .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
head += ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n') + '\n';
const mainStart = base.indexOf('<main');
const mainEnd = base.indexOf('</main>') + '</main>'.length;
let tail = base.slice(mainEnd).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
fs.mkdirSync(path.join(ROOT, 'sd-wan'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'sd-wan/index.html'), head + base.slice(headEnd, mainStart) + main + tail);

const smPath = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);
sm = sm.replace(/\s*<url><loc>https:\/\/alpstore\.it\/sd-wan\/<\/loc>[^\n]*<\/url>/, '');
sm = sm.replace('</urlset>', `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>\n</urlset>`);
fs.writeFileSync(smPath, sm);
console.log('sd-wan/index.html scritta, sitemap aggiornata');
