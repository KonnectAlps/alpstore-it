import Link from 'next/link'
import { CtaBox, PageHero, SectionHead } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { COMPANY, SITE } from '@/content/site'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Chi siamo: KonnectAlps, l’operatore dietro AlpStore',
  description:
    'AlpStore è lo store di KonnectAlps S.r.l., operatore di connettività per aziende con sede a Trento: fibra, FWA, 5G, satellite, SIM IoT, continuità operativa e monitoraggio.',
  path: '/chi-siamo/',
})

const VALUES = [
  { k: 'UN REFERENTE', t: 'Sai chi chiamare', d: 'Dall’offerta all’assistenza parli con persone tecniche, non con un call center.' },
  { k: 'CONFIGURATO DA NOI', t: 'Arriva pronto', d: 'Router e kit si preparano in laboratorio con SIM, VPN e regole: tu li colleghi.' },
  { k: 'SOTTO CONTROLLO', t: 'Il NOC guarda per te', d: 'Monitoriamo linee, SIM e apparati. Spesso sappiamo del guasto prima del cliente.' },
  { k: 'FORNITORI SCELTI', t: 'Il prodotto giusto', d: 'Scegliamo operatori e apparati caso per caso, senza vincoli di marca.' },
]

const STACK = ['Fibra e FWA', '5G e 4G', 'Satellite', 'SIM IoT', 'Failover e bonding', 'SD-WAN', 'Filtro DNS', 'VoIP e centralino cloud']
const BRANDS = ['MikroTik', 'Huawei', 'Teltonika', 'ZTE', 'Ubiquiti UniFi', 'GL.iNet', 'FRITZ!Box']

export default function ChiSiamoPage() {
  return (
    <>
      <JsonLd items={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Chi siamo', path: '/chi-siamo/' }])]} />
      <PageHero
        crumbs={[{ name: 'Chi siamo' }]}
        cmd={<>&gt; whoami</>}
        overline="KonnectAlps S.r.l. · Trento"
        title={<>AlpStore è lo store di KonnectAlps<em>.</em></>}
        lead="KonnectAlps è un operatore di connettività per aziende con sede a Trento. Portiamo fibra, FWA, 5G e satellite a imprese, cooperative e strutture ricettive, e teniamo tutto sotto controllo dal nostro NOC. AlpStore è dove trovi le nostre SIM IoT e quello che ci si collega."
      >
        <div className="ctas">
          <a className="btn btn-s" href={SITE.konnectalps}>konnectalps.it <span className="arr">&gt;</span></a>
          <Link className="btn btn-s" href="/contatti/">Contatti</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Come lavoriamo" title={<>Pochi principi, sempre gli stessi<em>.</em></>} />
          <div className="grid g4">
            {VALUES.map((v, i) => (
              <div className="ctrl reveal" key={v.k} style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <span className="k">● {v.k}</span>
                <b>{v.t}</b>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <div className="stack reveal">
            <span className="over">Cosa facciamo</span>
            <h2 className="h2">Connettività e continuità operativa<em>.</em></h2>
            <p className="lead-sm">Linee principali e di backup, failover automatico, aggregazione di più linee e SD-WAN, con monitoraggio continuo. Sulle stesse basi nascono le SIM IoT di AlpStore.</p>
            <div className="opts" style={{ marginTop: 4 }}>
              {STACK.map((s) => <span className="pill mint" key={s}>{s}</span>)}
            </div>
            <span className="over" style={{ marginTop: 18 }}>Apparati e partner tecnologici</span>
            <div className="opts">
              {BRANDS.map((s) => <span className="pill" key={s}>{s}</span>)}
            </div>
            <p className="note">Partner MikroTik e Huawei. I marchi citati appartengono ai rispettivi proprietari.</p>
          </div>
          <div className="stack reveal" style={{ ['--d' as string]: '0.08s' }}>
            <span className="over">Dati societari</span>
            <div className="facts">
              <div><small>Ragione sociale</small><b>{COMPANY.legalName}</b></div>
              <div><small>Partita IVA</small><b className="mono">{COMPANY.vat}</b></div>
              <div><small>Sede</small><b>{COMPANY.street}, {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province})</b></div>
              <div><small>Telefono</small><b><a href={COMPANY.phoneHref}>{COMPANY.phone}</a></b></div>
              <div><small>Commerciale</small><b><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></b></div>
              <div><small>Assistenza clienti</small><b><a href={SITE.supporto}>support.konnectalps.it</a></b></div>
            </div>
          </div>
        </div>
      </section>

      <CtaBox title="Lavoriamo insieme?" text="Che tu abbia bisogno di dieci SIM o di un progetto per cento sedi, si parte da una chiamata." />
    </>
  )
}
