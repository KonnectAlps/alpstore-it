import Link from 'next/link'
import { Brand } from './brand'
import { COMPANY, SITE } from '@/content/site'
import { SOLUTIONS } from '@/content/solutions'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Brand cursor={false} />
            <p>Lo store di KonnectAlps per le aziende: SIM IoT gestite e tutto quello che ci si collega, configurato e controllato da noi.</p>
            <p className="mono" style={{ fontSize: 13 }}>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <br />
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            </p>
          </div>
          <div>
            <h2>Prodotti</h2>
            <ul>
              <li><Link href="/sim-iot/">SIM IoT</Link></li>
              {SOLUTIONS.map((s) => (
                <li key={s.slug}><Link href={`/soluzioni/${s.slug}/`}>{s.overline}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Azienda</h2>
            <ul>
              <li><Link href="/aziende-e-pa/">Aziende e PA</Link></li>
              <li><Link href="/partner/">Partner e wholesale</Link></li>
              <li><Link href="/copertura/">Copertura</Link></li>
              <li><Link href="/chi-siamo/">Chi siamo</Link></li>
              <li><Link href="/contatti/">Contatti</Link></li>
            </ul>
          </div>
          <div>
            <h2>Accessi</h2>
            <ul>
              <li><a href={SITE.areaClienti}>Area clienti</a></li>
              <li><a href={SITE.areaPartner}>Area partner</a></li>
              <li><a href={SITE.supporto}>Assistenza tecnica</a></li>
              <li><a href={SITE.konnectalps}>konnectalps.it</a></li>
              <li><Link href="/condizioni-sim/">Condizioni SIM</Link></li>
              <li><Link href="/privacy/">Privacy</Link></li>
              <li><Link href="/cookie/">Cookie</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            AlpStore by {COMPANY.legalName} · {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city} · P.IVA {COMPANY.vat}
          </span>
          <span>Servizi riservati a imprese ed enti con partita IVA</span>
        </div>
      </div>
    </footer>
  )
}
