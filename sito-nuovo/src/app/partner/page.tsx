import { FaqList, PageHero, SectionHead, Steps } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { RequestForm, type FieldDef } from '@/components/request-form'
import { SITE } from '@/content/site'
import type { Faq } from '@/content/sim'
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Partner e wholesale: rivendi le SIM IoT',
  description:
    'Installatori, integratori e rivenditori: diventa partner AlpStore con condizioni dedicate e vista tecnica sui tuoi clienti. Operatori: SIM IoT in wholesale da KonnectAlps.',
  path: '/partner/',
})

const FAQ: Faq[] = [
  { q: 'Chi può diventare partner?', a: 'Installatori di impianti, telecamere e cancelli, elettricisti, integratori di sistemi, rivenditori IT e consulenti con partita IVA che portano connettività ai propri clienti.' },
  { q: 'Che differenza c’è tra partner e wholesale?', a: 'Il partner vende e installa ai suoi clienti con il nostro supporto, e noi restiamo il fornitore del servizio. Il wholesale è per operatori e ISP che rivendono le SIM con il proprio marchio e gestiscono direttamente i clienti finali.' },
  { q: 'Ci sono minimi d’acquisto?', a: 'Le condizioni dipendono dal tipo di collaborazione e dai volumi. Ne parliamo in una prima chiamata, senza impegno.' },
  { q: 'Chi fa l’assistenza ai clienti?', a: 'Come partner scegli tu: puoi seguire il primo livello e passarci i casi tecnici, oppure lasciare a noi tutta l’assistenza.' },
]

const FIELDS: FieldDef[] = [
  { name: 'tipo', label: 'Tipo di collaborazione', type: 'select', required: true, options: ['Partner (installatore, integratore, rivenditore)', 'Operatore wholesale (ISP, MVNO, telco)', 'Non lo so ancora'] },
  { name: 'azienda', label: 'Azienda', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'piva', label: 'Partita IVA', type: 'text', required: true, rule: 'piva' },
  { name: 'nome', label: 'Nome e cognome', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'telefono', label: 'Telefono', type: 'tel', autoComplete: 'tel' },
  { name: 'settore', label: 'Di cosa ti occupi', type: 'checks', options: ['Impianti elettrici', 'Telecamere e sicurezza', 'Cancelli e automazioni', 'Integrazione IT', 'Rivendita', 'Telecomunicazioni'] },
  { name: 'note', label: 'Clienti, volumi, zona', type: 'textarea', placeholder: 'Quanti clienti segui, in che zona, che volumi prevedi…' },
]

export default function PartnerPage() {
  return (
    <>
      <JsonLd items={[faqLd(FAQ), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Partner', path: '/partner/' }])]} />
      <PageHero
        crumbs={[{ name: 'Partner' }]}
        cmd={<>&gt; alpstore partner --richiedi</>}
        overline="Partner e wholesale"
        title={<>Installi impianti o rivendi connettività<em>?</em></>}
        lead="Elettricisti, installatori di telecamere e cancelli, integratori, rivenditori: avrai un’area tutta tua con condizioni dedicate e la vista tecnica sui tuoi clienti. Per gli operatori c’è il wholesale."
      >
        <div className="ctas">
          <a className="btn btn-p" href="#richiesta">Chiedi di entrare <span className="arr">&gt;</span></a>
          <a className="btn btn-s" href={SITE.areaPartner}>Area partner</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Due strade" title={<>Partner o operatore wholesale<em>.</em></>} />
          <div className="grid g2" style={{ gap: 16 }}>
            <div className="track hl reveal">
              <header><span className="k">● PARTNER</span><span className="pill">Installatori · integratori · rivenditori</span></header>
              <h3 className="h3" style={{ fontSize: 22 }}>Tu installi, noi configuriamo e controlliamo</h3>
              <p className="muted">Proponi SIM IoT, router, telecamere e varchi ai tuoi clienti. Noi prepariamo i kit, attiviamo le SIM e teniamo d’occhio tutto.</p>
              <ul className="bullets">
                <li>Condizioni partner dedicate per SIM IoT e linee</li>
                <li>I tuoi clienti in un’unica lista: SIM, consumi, stato</li>
                <li>Ordini a nome dei clienti, kit spediti già configurati</li>
                <li>Supporto tecnico di secondo livello</li>
              </ul>
            </div>
            <div className="track reveal" style={{ ['--d' as string]: '0.08s' }}>
              <header><span className="k mint">● WHOLESALE</span><span className="pill">ISP · MVNO · operatori</span></header>
              <h3 className="h3" style={{ fontSize: 22 }}>SIM IoT per la tua offerta</h3>
              <p className="muted">Sei un operatore e vuoi aggiungere SIM IoT gestite al tuo catalogo, con il tuo marchio e i tuoi clienti.</p>
              <ul className="bullets">
                <li>Listino wholesale riservato</li>
                <li>Portale e API per attivazioni, sospensioni e consumi</li>
                <li>IP statici, VPN e APN dedicati su richiesta</li>
                <li>Fatturazione unica e mensile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="stack reveal">
            <span className="over">Area partner · in arrivo</span>
            <h2 className="h2">Tutti i tuoi clienti, in una porta<em>.</em></h2>
            <p className="lead-sm">SIM, consumi e stato di ogni cliente; ordini e richieste direttamente dall’area; chiavi API per collegare i tuoi sistemi.</p>
          </div>
          <div className="term reveal" role="img" aria-label="Esempio dell'area partner" style={{ ['--d' as string]: '0.08s' }}>
            <div><span className="m">partner@alpstore</span>:~$ <span className="w">clienti --sim</span></div>
            <div>Idraulica Rossi · 4 SIM · <span className="g">● online</span></div>
            <div>Condominio Le Torri · 2 SIM · <span className="g">● online</span></div>
            <div>Cantiere Via Verdi · 1 SIM · <span className="a">● 82% traffico</span></div>
            <div><span className="m">partner@alpstore</span>:~$ <span className="w">ordina --sim 5 --rete 4g</span></div>
            <div className="g">✓ richiesta inviata a KonnectAlps</div>
            <div className="c" style={{ marginTop: 6 }}>{'// anteprima illustrativa, dati di esempio'}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Come si entra" title={<>Tre passi<em>.</em></>} />
          <Steps
            items={[
              { n: '01', title: 'Richiesta', text: 'Compili il modulo: chi sei, che clienti segui, che volumi prevedi.' },
              { n: '02', title: 'Chiamata', text: 'Ci conosciamo, definiamo condizioni e modalità di lavoro.' },
              { n: '03', title: 'Accesso', text: 'Ricevi le credenziali dell’area partner e partiamo dal primo cliente.' },
            ]}
          />
        </div>
      </section>

      <section className="section" id="richiesta">
        <div className="wrap faq-wrap">
          <div className="stack reveal">
            <span className="over">Domande</span>
            <h2 className="h2">Prima di iniziare<em>.</em></h2>
            <FaqList items={FAQ} />
          </div>
          <div className="reveal" style={{ ['--d' as string]: '0.08s' }}>
            <RequestForm kind="partner" title="Chiedi di diventare partner" subject="Richiesta partner AlpStore da alpstore.it" intro="vorrei diventare partner di AlpStore:" fields={FIELDS} submitLabel="Invia la richiesta" note="Ti ricontattiamo entro due giorni lavorativi." />
          </div>
        </div>
      </section>
    </>
  )
}
