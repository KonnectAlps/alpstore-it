import Link from 'next/link'

const LEFT = [
  { href: '/soluzioni/router-e-antenne/', k: 'Router e antenne', t: 'MikroTik, LtAP con GPS, ZTE MC889, Teltonika' },
  { href: '/soluzioni/telecamere-e-sensori/', k: 'Telecamere e sensori', t: 'Kit UniFi visibili solo in VPN, sensori NB-IoT' },
  { href: '/soluzioni/accessi-e-varchi/', k: 'Accessi e varchi', t: 'Sbarre, cancelli, colonnine, registro di chi apre' },
]
const RIGHT = [
  { href: '/soluzioni/flotte/', k: 'Flotte', t: 'Posizione, movimento e segnale sulla mappa' },
  { href: '/soluzioni/sede-mobile-e-backup/', k: 'Sede mobile e backup', t: 'Dual-SIM, failover automatico, satellite' },
  { href: '/soluzioni/', k: 'VoIP e prodotti connessi', t: 'Centralino in cloud, eSIM nei tuoi prodotti, API' },
]

function Node({ href, k, t, d }: { href: string; k: string; t: string; d: number }) {
  return (
    <Link className="eco-node reveal" href={href} style={{ ['--d' as string]: `${d * 0.07}s` }}>
      <span className="k">● {k}</span>
      <span>{t}</span>
    </Link>
  )
}

export function Ecosystem() {
  return (
    <div className="eco">
      <div className="eco-col">
        {LEFT.map((n, i) => (
          <Node key={n.k} {...n} d={i} />
        ))}
      </div>
      <div className="eco-core reveal" aria-hidden="true">
        <svg viewBox="0 0 360 360">
          <circle className="orbit" cx="180" cy="180" r="170" />
          <circle className="orbit-2" cx="180" cy="180" r="120" />
          <circle className="orbit" cx="180" cy="180" r="72" />
          <g className="spin">
            <circle className="sat" cx="180" cy="10" r="5" />
            <circle className="sat-live" cx="350" cy="180" r="4" />
            <circle className="sat" cx="60" cy="300" r="4" />
          </g>
          <g className="spin-r">
            <circle className="sat-live" cx="180" cy="60" r="4" />
            <circle className="sat" cx="76" cy="240" r="3.5" />
            <circle className="sat" cx="290" cy="230" r="3.5" />
          </g>
        </svg>
        <div className="eco-center">
          <div>
            <span className="k">AL CENTRO</span>
            <b>SIM IoT</b>
            <small>SIM · eSIM · 4G · NB-IoT</small>
          </div>
        </div>
      </div>
      <div className="eco-col">
        {RIGHT.map((n, i) => (
          <Node key={n.k} {...n} d={i + 3} />
        ))}
      </div>
    </div>
  )
}
