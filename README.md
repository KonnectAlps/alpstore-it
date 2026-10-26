# alpstore-web · sito AlpStore (bozza v1)

Sito pubblico **AlpStore by KonnectAlps** (alpstore.it): SIM IoT gestite per aziende e tutto l’ecosistema intorno (router, flotte, accessi, telecamere e sensori, sede mobile e backup).

Questa è la **bozza completa** da rivedere e pubblicare. Sostituirà la pagina “in arrivo” che oggi sta in `apps/alpstore-site` (pubblicata con GitHub Pages).

- Next.js 16 (App Router, TypeScript), **esportazione statica** (`output: 'export'`): nessun server, nessun backend.
- Nessun cookie, nessuna analisi del traffico. Il tema chiaro/scuro resta nel `localStorage` del browser.
- Font DejaVu Sans / DejaVu Sans Mono ospitati nel sito (`public/fonts`, sottoinsiemi woff2, licenza in `public/fonts/LICENSE-DejaVu.txt`).
- Mappe (solo pagine Copertura e Flotte): Leaflet + basemap CARTO (Positron in chiaro, Dark Matter in scuro), caricate solo lato client.

## Avvio in locale

Serve Node.js 20.9 o più recente.

```bash
cd apps/alpstore-web
npm install
npm run dev        # http://localhost:3000
```

Altri comandi:

```bash
npm run build      # esportazione statica nella cartella out/
npm run preview    # serve out/ in locale (http://localhost:3000)
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Pubblicazione su Vercel

1. Nuovo progetto Vercel collegato al repository `KonnectAlps/piattaforma`.
2. **Root Directory**: `apps/alpstore-web`.
3. **Framework Preset**: Next.js (rilevato da solo). Build command `next build` (predefinito). Non serve impostare l’Output Directory: Vercel riconosce `output: 'export'` e pubblica `out/`.
   Se si usa il preset “Other”, impostare Build `npm run build` e Output Directory `out`.
4. Node.js 20 o 22 nelle impostazioni del progetto.
5. Nessuna variabile d’ambiente necessaria.
6. `vercel.json` aggiunge solo intestazioni di sicurezza e la cache lunga dei font.

Su qualsiasi altro hosting statico basta caricare il contenuto di `out/` (ogni pagina è `cartella/index.html`, quindi gli URL con la barra finale funzionano ovunque; `404.html` è la pagina di errore).

## Dove stanno i testi

Tutti i contenuti modificabili sono in `src/content/`:

| File | Cosa contiene |
|---|---|
| `src/content/site.ts` | dati azienda, email, telefono, menu, link (area clienti, supporto, prenotazione chiamata), interruttori `FEATURES` |
| `src/content/sim.ts` | configuratore (formato, rete, IP, traffico, gestione), casi di partenza, tagli di traffico, modalità IP e gestione, controlli, passi di attivazione, domande frequenti |
| `src/content/solutions.ts` | le cinque soluzioni (Flotte, Accessi e varchi, Telecamere e sensori, Sede mobile e backup, Router e antenne): testi, vantaggi, apparati, SEO |
| `src/content/coverage.ts` | comuni e risultati **d’esempio** della verifica copertura e mezzi d’esempio della mappa Flotte |

I testi specifici di una sola pagina (Aziende e PA, Partner, Chi siamo, Contatti, legali) sono nel file della pagina, in `src/app/<pagina>/page.tsx`.
Stili: un unico file, `src/app/globals.css`, con i token di colore NOC (scuro) e la variante chiara.

## Pagine

| URL | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/sim-iot/` | `src/app/sim-iot/page.tsx` (configuratore, tagli, IP, gestione, controlli, FAQ) |
| `/soluzioni/` e `/soluzioni/<slug>/` | `src/app/soluzioni/…` (generate da `solutions.ts`) |
| `/copertura/` | `src/app/copertura/page.tsx` (verifica **dimostrativa** + mappa) |
| `/aziende-e-pa/` | progetti e richiesta preventivo |
| `/partner/` | partner vs operatore wholesale, richiesta di adesione |
| `/chi-siamo/`, `/contatti/` | KonnectAlps, canali di contatto e modulo |
| `/privacy/`, `/cookie/` | **segnaposto** “testo legale da fornire” |
| `/negozio/` | shop magliette/adesivi: **nascosto** (`FEATURES.merchShop = false` → risponde 404, noindex, fuori da menu e sitemap) |
| 404 | `src/app/not-found.tsx` → `out/404.html` |

Link utili nei contenuti: il configuratore accetta un caso di partenza nell’URL, per esempio `/sim-iot/?caso=cam#configura` (casi: `router`, `cam`, `gate`, `fleet`, `sensor`, `mobile`).

## Moduli (richieste)

Oggi i moduli (offerta dal configuratore, preventivo, partner, contatto, verifica copertura) **aprono la mail dell’utente** con il testo già scritto, indirizzata a `commerciale@konnectalps.it`.
Tutto passa da `src/lib/contact.ts`: per usare un servizio vero basta impostare `CONTACT_ENDPOINT` con l’URL che riceve un `POST` JSON (`{ kind, subject, fields, message, page }`). I moduli non vanno toccati.

## SEO

- Titolo, descrizione, canonical `https://alpstore.it/...` e OpenGraph per ogni pagina (`src/lib/seo.ts`, immagine `public/og.png`).
- JSON-LD: Organization e WebSite su tutte le pagine; Service su home, SIM IoT, soluzioni e Aziende e PA; FAQPage su SIM IoT e Partner; BreadcrumbList sulle pagine interne.
- `sitemap.xml` e `robots.txt` generati da `src/app/sitemap.ts` e `src/app/robots.ts`.
- Dominio invariato: alpstore.it. Gli URL hanno la barra finale (`trailingSlash: true`).

## Cosa è segnaposto

- **Prezzi**: nessun prezzo nel sito, ovunque “Richiedi offerta” / “Su offerta” (`FEATURES.prices` è solo un promemoria).
- **Area clienti/partner**: link a `https://console.alpstore.it` (in `site.ts`), da confermare quando la dashboard è online.
- **Verifica copertura**: dimostrativa, comuni e risultati d’esempio, nessuna API. La nota in pagina rimanda alla verifica completa nell’area clienti/partner.
- **Anteprime** (dashboard SIM, area partner, registro varchi, failover, flotta): illustrative, con dati d’esempio dichiarati.
- **Privacy e Cookie**: testo legale da fornire.
- **Negozio**: nascosto.

Regola d'offerta (Ezio, 24/10/2026): le SIM IoT sono **4G e NB-IoT** (traffico da 500 MB a 1 TB o pool, IP CG-NAT, privato statico o pubblico statico). Il **5G** esiste solo come **5G Unlimited**, offerta a parte: traffico illimitato, IP **CG-NAT o pubblico statico** (niente IP privato). Nel configuratore, scegliendo 5G Unlimited il traffico va forzato su "illimitato" e l'IP privato va escluso: la logica è da sistemare in `SimConfigurator`. Nessun prezzo pubblicato.

Testi da far confermare a KonnectAlps prima di pubblicare:

- controlli “su richiesta” (blocco IMEI, destinazioni consentite, SMS e roaming spenti) in `sim.ts`;
- voci wholesale (portale e API, IP statici/VPN/APN dedicati, fatturazione unica mensile) in `partner/page.tsx`;
- orari del telefono in `contatti/page.tsx`;
- elenco marchi e partner tecnologici in `chi-siamo/page.tsx`.

## Prima di andare online (checklist)

- [ ] Testi legali di **Privacy** e **Cookie** forniti e inseriti.
- [ ] Listino: se i prezzi diventano pubblici, aggiungerli (oggi “Richiedi offerta”).
- [ ] Endpoint reale per i moduli in `src/lib/contact.ts` (oppure confermare l’uso della mail).
- [ ] URL definitivo dell’area clienti/partner in `src/content/site.ts`.
- [ ] Testi “da confermare” qui sopra verificati.
- [ ] `npm run build` e `npm run lint` senza errori; prova su telefono (390 px) in tema chiaro e scuro.
- [ ] Progetto Vercel creato con Root Directory `apps/alpstore-web`, dominio `alpstore.it` (e `www.alpstore.it` in redirect) aggiunto al progetto.
- [ ] **Cambio DNS da GitHub Pages a Vercel** mantenendo gli URL:
  - oggi `alpstore.it` punta a GitHub Pages (file `CNAME` nella pagina “in arrivo”, record A verso GitHub);
  - in Vercel aggiungere il dominio, poi sostituire i record A di GitHub con quelli indicati da Vercel (A `76.76.21.21` o il valore mostrato nel pannello) e `www` in CNAME verso `cname.vercel-dns.com`;
  - abbassare il TTL qualche ora prima, verificare il certificato HTTPS su Vercel, poi disattivare GitHub Pages;
  - l’unico URL pubblico di oggi è `/` (più `/robots.txt` e `/sitemap.xml`): resta uguale. Le nuove pagine sono tutte aggiuntive, quindi nessun redirect necessario.
- [ ] Inviare la nuova sitemap a Google Search Console.
