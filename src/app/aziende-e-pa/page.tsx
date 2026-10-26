import Link from 'next/link'
import { PageHero, SectionHead, Steps } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { RequestForm, type FieldDef } from '@/components/request-form'
import { COMPANY } from '@/content/site'
import { breadcrumbLd, pageMeta, serviceLd } from '@/lib/seo'

const DESC =
  'Progetti IoT per aziende e pubblica amministrazione: flotte, prodotti connessi, varchi e parcheggi, sensori, siti remoti e backup. Sopralluogo, progetto, pilota e messa in servizio.'

export const metadata = pageMeta({ title: 'Progetti IoT per aziende e PA: richiedi un preventivo', description: DESC, path: '/aziende-e-pa/' })

const PROJECTS = [
  { k: 'FLOTTE', t: 'Flotte e mezzi', d: 'Da dieci a centinaia di mezzi, eSIM in pool, mappa e avvisi.' },
  { k: 'PRODOTTI', t: 'Prodotti connessi', d: 'SIM o eSIM dentro le tue macchine, gestite da noi o da te via API.' },
  { k: 'PA', t: 'Parcheggi e varchi', d: 'Sbarre, cancelli, colonnine e telemetria per comuni ed enti, anche tramite partner.' },
  { k: 'SENSORI', t: 'Sensori e telemetria', d: 'Celle frigo, contatori, pompe e allarmi su NB-IoT e 4G.' },
  { k: 'SITI REMOTI', t: 'Cantieri e impianti', d: 'Telecamere UniFi in VPN, router da esterno 4G o 5G Unlimited, energia e montaggio.' },
  { k: 'CONTINUITÀ', t: 'Sedi e backup', d: 'Failover automatico, bonding, SD-WAN e satellite per sedi critiche.' },
]

const FIELDS: FieldDef[] = [
  { name: 'azienda', label: 'Azienda o ente', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'piva', label: 'Partita IVA', type: 'text', required: true, rule: 'piva' },
  { name: 'nome', label: 'Nome e cognome', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'telefono', label: 'Telefono', type: 'tel', autoComplete: 'tel' },
  { name: 'quante', label: 'Quante SIM o sedi', type: 'select', options: ['1–10', '11–50', '51–200', '201–1.000', 'Oltre 1.000', 'Non lo so ancora'] },
  { name: 'cosa', label: 'Cosa ti serve', type: 'checks', required: true, options: ['Flotta', 'Prodotti connessi', 'Accessi e varchi', 'Sensori', 'Siti remoti e telecamere', 'Sede mobile e backup', 'VoIP'] },
  { name: 'progetto', label: 'Raccontaci il progetto', type: 'textarea', placeholder: 'Dove, quanti dispositivi, tempi, cosa usi oggi…' },
]

export default function AziendePage() {
  return (
    <>
      <JsonLd
        items={[
          serviceLd('Progetti IoT per aziende e PA', DESC, '/aziende-e-pa/', 'Progettazione connettività IoT'),
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Aziende e PA', path: '/aziende-e-pa/' }]),
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Aziende e PA' }]}
        cmd={<>&gt; alpstore progetto --nuovo</>}
        overline="Aziende, enti e pubblica amministrazione"
        title={<>Progetti più grandi? Li disegniamo con te<em>.</em></>}
        lead="Quando le SIM sono decine o centinaia, o le sedi sono tante, partiamo da un sopralluogo e da un pilota. Un referente tecnico unico dall’offerta alla messa in servizio."
      >
        <div className="ctas">
          <a className="btn btn-p" href="#richiesta">Richiedi un preventivo <span className="arr">&gt;</span></a>
          <Link className="btn btn-s" href="/copertura/">Verifica copertura</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Progetti" title={<>Cosa realizziamo<em>.</em></>} />
          <div className="grid g3">
            {PROJECTS.map((p, i) => (
              <div className="card reveal" key={p.k} style={{ ['--d' as string]: `${(i % 3) * 0.06}s` }}>
                <span className="k">● {p.k}</span>
                <span className="t">{p.t}</span>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Metodo" title={<>Prima si verifica, poi si installa<em>.</em></>} lead="Niente sorprese a metà progetto: copertura, apparati e traffico si provano sul campo prima del rollout." />
          <Steps
            items={[
              { n: '01', title: 'Sopralluogo', text: 'Copertura, posizione degli apparati, alimentazione. Anche da foto e planimetrie.' },
              { n: '02', title: 'Progetto', text: 'SIM, rete, IP, apparati e traffico. Offerta chiara, senza costi nascosti.' },
              { n: '03', title: 'Pilota', text: 'Pochi siti o mezzi per qualche settimana, con dati reali.' },
              { n: '04', title: 'Rollout e controllo', text: 'Kit preparati in laboratorio, installazione, monitoraggio dal NOC.' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <div className="stack reveal">
            <span className="over">Pubblica amministrazione</span>
            <h2 className="h2">Comuni ed enti<em>.</em></h2>
            <p className="lead-sm">Parcheggi, varchi, colonnine, telemetria degli impianti e telecamere. Lavoriamo direttamente con gli enti oppure attraverso partner già attivi con la PA.</p>
            <ul className="bullets">
              <li>SIM con IP privato in VPN dedicata all’ente</li>
              <li>Registro degli accessi e dei comandi</li>
              <li>Documentazione tecnica per ogni sito</li>
              <li>Fornitura anche tramite partner abilitati</li>
            </ul>
          </div>
          <div className="stack reveal" id="richiesta" style={{ ['--d' as string]: '0.08s' }}>
            <RequestForm
              kind="progetto"
              title="Richiedi un progetto o un preventivo"
              subject="Richiesta progetto IoT da alpstore.it"
              intro="vorrei un preventivo per un progetto IoT:"
              fields={FIELDS}
              submitLabel="Invia la richiesta"
            />
            <p className="note">Preferisci il telefono? <a href={COMPANY.phoneHref}>{COMPANY.phone}</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
