import Link from 'next/link'
import type { ReactNode } from 'react'
import { COMPANY, SITE } from '@/content/site'
import type { Faq, Step } from '@/content/sim'

export function PageHero({
  crumbs,
  overline,
  title,
  lead,
  cmd,
  children,
}: {
  crumbs?: { name: string; href?: string }[]
  overline: string
  title: ReactNode
  lead?: ReactNode
  cmd?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {crumbs ? (
          <nav className="crumbs" aria-label="Percorso">
            <Link href="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.name} style={{ display: 'contents' }}>
                <span aria-hidden="true">/</span>
                {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              </span>
            ))}
          </nav>
        ) : null}
        {cmd ? <span className="cmd">{cmd}</span> : null}
        <span className="over">{overline}</span>
        <h1 className="h1-sm">{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  )
}

export function SectionHead({ overline, title, lead, id, aside }: { overline: string; title: ReactNode; lead?: ReactNode; id?: string; aside?: ReactNode }) {
  if (aside) {
    return (
      <div className="section-head row reveal">
        <div>
          <span className="over">{overline}</span>
          <h2 className="h2" id={id}>{title}</h2>
          {lead ? <p className="lead-sm">{lead}</p> : null}
        </div>
        {aside}
      </div>
    )
  }
  return (
    <div className="section-head reveal">
      <span className="over">{overline}</span>
      <h2 className="h2" id={id}>{title}</h2>
      {lead ? <p className="lead-sm">{lead}</p> : null}
    </div>
  )
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className={`steps reveal${items.length === 3 ? ' s3' : ''}`} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((s) => (
        <li key={s.n}>
          <span className="n">{s.n}</span>
          <b>{s.title}</b>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function CtaBox({ title = 'Ti servono SIM IoT adesso?', text, cmd = 'alpstore --connect' }: { title?: string; text?: string; cmd?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-box reveal">
          <div className="stack" style={{ gap: 14, position: 'relative', zIndex: 1 }}>
            <span className="cmd">
              &gt; {cmd} <span className="cur">_</span>
            </span>
            <h2 className="h2">{title}</h2>
            <p className="lead-sm">{text ?? 'Raccontaci il progetto: quante SIM, dove, per cosa. Ti rispondiamo entro un giorno lavorativo.'}</p>
            <div className="ctas" style={{ marginTop: 6 }}>
              <Link className="btn btn-p" href="/sim-iot/#configura">
                Configura le SIM <span className="arr">&gt;</span>
              </Link>
              <a className="btn btn-s" href={SITE.prenota} target="_blank" rel="noopener noreferrer">
                Prenota una chiamata
              </a>
            </div>
          </div>
          <div className="lines">
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            <span className="dim" style={{ fontSize: 13 }}>
              {COMPANY.street}, {COMPANY.city}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** La SIM disegnata (dalla pagina "in arrivo"). Colori dai token del tema. */
export function SimSvg({ className = 'sim' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 300" aria-hidden="true" focusable="false">
      <path className="sim-body" d="M14 2 H160 L218 60 V286 a12 12 0 0 1 -12 12 H14 a12 12 0 0 1 -12 -12 V14 a12 12 0 0 1 12 -12 Z" strokeWidth="2" />
      <rect className="sim-chip" x="56" y="116" width="108" height="88" rx="10" strokeWidth="2" />
      <g className="sim-lines" strokeOpacity=".7" strokeWidth="1.6" fill="none">
        <path d="M56 146 H92 V116" />
        <path d="M164 146 H128 V116" />
        <path d="M56 174 H92 V204" />
        <path d="M164 174 H128 V204" />
        <path d="M92 146 V174 M128 146 V174" />
      </g>
      <text className="sim-t1" x="22" y="42" fontFamily="DejaVu Sans Mono, monospace" fontSize="15" fontWeight="700">IoT</text>
      <text className="sim-t2" x="22" y="270" fontFamily="DejaVu Sans Mono, monospace" fontSize="14" fontWeight="700">KonnectΛlps&gt;_</text>
      <text className="sim-t3" x="22" y="287" fontFamily="DejaVu Sans Mono, monospace" fontSize="9.5">SIM · eSIM · 4G · NB-IoT</text>
    </svg>
  )
}

export function HeroScene() {
  return (
    <div className="scene" aria-hidden="true">
      <span className="ring" />
      <span className="ring r2" />
      <span className="ring r3" />
      <SimSvg />
      <div className="chip c1" style={{ left: 0, top: 24 }}>
        CELLA FRIGO 01 · NB-IoT
        <b>3,8 °C <i>● OK</i></b>
      </div>
      <div className="chip c2" style={{ right: 0, top: 92, animationDelay: '-2s' }}>
        POMPA 02 · 4G · IP-PRIV
        <b>VPN UP <i>● 24 ms</i></b>
      </div>
      <div className="chip c3" style={{ left: 8, bottom: 56, animationDelay: '-4s' }}>
        CAM CANTIERE · 4G
        <b>86% <i className="w">● soglia</i></b>
        <span className="bar-mini"><span style={{ width: '86%' }} /></span>
      </div>
      <div className="chip c4" style={{ right: 12, bottom: 12, animationDelay: '-3s' }}>
        POOL FLOTTA · 12 SIM
        <b>412 GB <i>/ 1 TB</i></b>
      </div>
    </div>
  )
}

export function Kpis({ items }: { items: [string, string][] }) {
  return (
    <div className="kpis reveal">
      {items.map(([k, v]) => (
        <div key={k}>
          <small>{k}</small>
          <b>{v}</b>
        </div>
      ))}
    </div>
  )
}

const DASH_ROWS: { n: string; net: string; pct: number; tone: '' | 'w' | 'l'; label?: string; dot: '' | 'warn' | 'off' }[] = [
  { n: 'Cella frigo 01', net: 'NB-IoT', pct: 22, tone: 'l', dot: '' },
  { n: 'Cantiere Nord · cam', net: '4G', pct: 86, tone: 'w', dot: 'warn' },
  { n: 'Impianto pompe', net: '4G', pct: 41, tone: '', dot: '' },
  { n: 'Sbarra parcheggio', net: '4G', pct: 9, tone: 'l', dot: '' },
  { n: 'Contatore 07', net: 'NB-IoT', pct: 0, tone: '', label: 'SILENZIO 6 H', dot: 'off' },
]

/** Anteprima illustrativa dell'area clienti (dati di esempio). */
export function DashPreview() {
  return (
    <div className="dash reveal" role="img" aria-label="Anteprima illustrativa dell'area clienti: 24 SIM attive, 22 online, 2 oltre l'80% del traffico.">
      <div className="dash-top">
        <span className="dots"><i /><i /><i /></span>
        <span>AREA CLIENTI · SIM IOT</span>
        <span className="live">● 22/24 ONLINE</span>
      </div>
      <div className="dash-kpis">
        <div><small>SIM ATTIVE</small><b>24</b></div>
        <div><small>ONLINE</small><b className="live">22</b></div>
        <div><small>OLTRE 80%</small><b className="warn">2</b></div>
      </div>
      <div className="dash-rows">
        {DASH_ROWS.map((r) => (
          <div className="dash-row" key={r.n}>
            <span className={`dot ${r.dot}`} />
            <span className="n">{r.n}</span>
            <span className="net">{r.net}</span>
            <span className="meter"><span className={r.tone} style={{ width: `${Math.max(r.pct, 2)}%` }} /></span>
            <span className={`pct ${r.label ? 'warn' : r.tone === 'w' ? 'warn' : ''}`}>{r.label ? '!' : `${r.pct}%`}</span>
          </div>
        ))}
      </div>
      <div className="toast">
        <div>
          <span className="k warn">ALPSTORE · ORA</span>
          <b>Cantiere Nord all’86%</b>
          <span className="dim">Aggiungo 50 GB?</span>
        </div>
        <span className="btn btn-p">+50 GB</span>
      </div>
    </div>
  )
}
