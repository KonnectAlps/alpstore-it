import { PageHero } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { RequestForm, type FieldDef } from '@/components/request-form'
import { COMPANY, SITE } from '@/content/site'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Contatti',
  description: 'Contatta AlpStore by KonnectAlps: commerciale@konnectalps.it, +39 0471 840048, Via Praga 5, Trento. Offerte SIM IoT, progetti, partner e assistenza.',
  path: '/contatti/',
})

const FIELDS: FieldDef[] = [
  { name: 'argomento', label: 'Argomento', type: 'select', required: true, options: ['Offerta SIM IoT', 'Progetto per azienda o ente', 'Diventare partner', 'Verifica copertura', 'Altro'] },
  { name: 'azienda', label: 'Azienda o ente', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'nome', label: 'Nome e cognome', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'telefono', label: 'Telefono', type: 'tel', autoComplete: 'tel' },
  { name: 'piva', label: 'Partita IVA', type: 'text', rule: 'piva' },
  { name: 'messaggio', label: 'Messaggio', type: 'textarea', placeholder: 'Come possiamo aiutarti?' },
]

const CHANNELS = [
  { k: 'COMMERCIALE', v: COMPANY.email, href: `mailto:${COMPANY.email}`, d: 'Offerte, progetti, partner' },
  { k: 'TELEFONO', v: COMPANY.phone, href: COMPANY.phoneHref, d: 'Lun–ven, orario d’ufficio' },
  { k: 'CHIAMATA', v: 'Prenota 30 minuti', href: SITE.prenota, d: 'Scegli tu giorno e ora', ext: true },
  { k: 'GIÀ CLIENTE', v: 'support.konnectalps.it', href: SITE.supporto, d: 'Assistenza tecnica e guasti' },
]

export default function ContattiPage() {
  return (
    <>
      <JsonLd items={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contatti', path: '/contatti/' }])]} />
      <PageHero
        crumbs={[{ name: 'Contatti' }]}
        cmd={<>&gt; alpstore --connect <span className="cur">_</span></>}
        overline="Contatti"
        title={<>Parliamo del tuo progetto<em>.</em></>}
        lead="Scrivici, chiamaci o prenota una chiamata. Ti risponde una persona tecnica entro un giorno lavorativo."
      />
      <section className="section" style={{ paddingTop: 16, borderTop: 0 }}>
        <div className="wrap split top">
          <div className="stack">
            <div className="grid g2">
              {CHANNELS.map((c, i) => (
                <a key={c.k} className="card reveal" href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ ['--d' as string]: `${i * 0.05}s` }}>
                  <span className="k">● {c.k}</span>
                  <span className="t mono" style={{ fontSize: 15, wordBreak: 'break-word' }}>{c.v}</span>
                  <p>{c.d}</p>
                </a>
              ))}
            </div>
            <div className="facts reveal">
              <div><small>Sede</small><b>{COMPANY.legalName}<br />{COMPANY.street}, {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province})</b></div>
              <div><small>Partita IVA</small><b className="mono">{COMPANY.vat}</b></div>
            </div>
            <p className="note">Servizi riservati a imprese, enti e professionisti con partita IVA.</p>
          </div>
          <div className="reveal" style={{ ['--d' as string]: '0.08s' }}>
            <RequestForm kind="contatto" title="Scrivici" subject="Richiesta da alpstore.it" fields={FIELDS} submitLabel="Invia" />
          </div>
        </div>
      </section>
    </>
  )
}
