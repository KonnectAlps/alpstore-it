import Link from 'next/link'
import { CtaBox, FaqList, PageHero, SectionHead, Steps } from '@/components/blocks'
import { Configurator } from '@/components/configurator'
import { JsonLd } from '@/components/json-ld'
import { ACTIVATION, CONTROLS, IP_MODES, MANAGEMENT, SIM_FAQ, SIM_TERMS_FAQ, TIERS } from '@/content/sim'
import { breadcrumbLd, faqLd, pageMeta, serviceLd } from '@/lib/seo'

const DESC =
  'Configura le SIM IoT solo dati per la tua azienda: SIM o eSIM, 4G o NB-IoT, IP pubblico o privato statico o CG-NAT, da 500 MB a 1 TB o in pool fino a 5 TB. Gestite da KonnectAlps o in autonomia.'

export const metadata = pageMeta({ title: 'SIM IoT ed eSIM per aziende: configura e richiedi offerta', description: DESC, path: '/sim-iot/' })

export default function SimIotPage() {
  return (
    <>
      <JsonLd
        items={[
          serviceLd('SIM IoT gestite per aziende', DESC, '/sim-iot/'),
          faqLd([...SIM_TERMS_FAQ, ...SIM_FAQ]),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'SIM IoT', path: '/sim-iot/' },
          ]),
        ]}
      />
      <PageHero
        crumbs={[{ name: 'SIM IoT' }]}
        cmd={<>&gt; alpstore sim --configura</>}
        overline="SIM ed eSIM IoT · già disponibili"
        title={<>Una SIM IoT, configurata come serve a te<em>.</em></>}
        lead="Scegli formato, rete, indirizzo IP, traffico e gestione. Ti prepariamo l’offerta e attiviamo le SIM. I prezzi online arriveranno: per ora ti rispondiamo noi, entro un giorno lavorativo."
      >
        <div className="ctas">
          <a className="btn btn-p" href="#configura">Configura <span className="arr">&gt;</span></a>
          <a className="btn btn-s" href="#domande">Domande frequenti</a>
        </div>
      </PageHero>

      <section className="section" id="configura" aria-labelledby="cfg-title">
        <div className="wrap">
          <SectionHead overline="01 · Configuratore" id="cfg-title" title={<>Componi la SIM che ti serve<em>.</em></>} lead="Parti da un caso oppure scegli ogni opzione. Il riepilogo a destra diventa la tua richiesta d’offerta." />
          <Configurator />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="02 · Traffico" title={<>Da 500 MB a 1 TB, oppure in pool<em>.</em></>} lead="Il taglio si sceglie per ogni SIM. Con il pool, un unico pacchetto fino a 5 TB al mese è condiviso tra più SIM: chi consuma di più prende da lì. Oltre il volume la SIM non si blocca, il traffico extra si paga a consumo. Gli usi indicati sono esempi." />
          <div className="tiers reveal">
            {TIERS.map((t) => (
              <div key={t.label}>
                <b className={t.label === 'Pool' ? 'live' : ''}>{t.label}</b>
                <span>{t.use}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="03 · Indirizzo IP" title={<>Raggiungibile solo da chi deve<em>.</em></>} lead="Tre modi di collegare la SIM alla rete. Se hai dubbi, scegli l’IP privato in VPN: è il più sicuro." />
          <div className="grid g3">
            {IP_MODES.map((m, i) => (
              <div className="card reveal" key={m.code} style={{ ['--d' as string]: `${i * 0.06}s`, borderColor: i === 0 ? 'var(--live-line)' : undefined }}>
                <span className={`k ${m.tone === 'mint' ? 'mint' : m.tone === 'muted' ? 'dim' : ''}`}>● {m.code}{i === 0 ? ' · CONSIGLIATO' : ''}</span>
                <span className="t">{m.title}</span>
                <p>{m.text}</p>
                <ul className="bullets" style={{ marginTop: 6 }}>
                  {m.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="04 · Gestione" title={<>La gestiamo noi, o la gestisci tu<em>.</em></>} />
          <div className="grid g2" style={{ gap: 16 }}>
            {MANAGEMENT.map((m, i) => (
              <div className={`track reveal${i === 0 ? ' hl' : ''}`} key={m.code} style={{ ['--d' as string]: `${i * 0.08}s` }}>
                <header>
                  <span className={`k ${i === 0 ? '' : 'mint'}`}>● {m.code}</span>
                </header>
                <h3 className="h3" style={{ fontSize: 22 }}>{m.title}</h3>
                <p className="muted">{m.text}</p>
                <ul className="bullets">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="05 · Controlli" title={<>Sempre inclusi, e su richiesta<em>.</em></>} />
          <div className="grid g3">
            {CONTROLS.map((c, i) => (
              <div className="ctrl reveal" key={c.title} style={{ ['--d' as string]: `${(i % 3) * 0.06}s` }}>
                <span className={`k ${c.status === 'incluso' ? '' : 'mint'}`}>● {c.status.toUpperCase()}</span>
                <b>{c.title}</b>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="06 · Attivazione" title={<>Dall’offerta alla SIM accesa<em>.</em></>} />
          <Steps items={ACTIVATION} />
        </div>
      </section>

      <section className="section" id="condizioni">
        <div className="wrap faq-wrap">
          <div className="stack reveal">
            <span className="over">07 · Condizioni in breve</span>
            <h2 className="h2">Solo dati, nessun vincolo<em>.</em></h2>
            <p className="lead-sm">Le regole principali delle SIM IoT e del 5G Unlimited. Il testo completo è nelle condizioni di fornitura.</p>
            <div><Link className="link-arrow" href="/condizioni-sim/">Condizioni SIM <span className="arr">&gt;</span></Link></div>
          </div>
          <FaqList items={SIM_TERMS_FAQ} />
        </div>
      </section>

      <section className="section" id="domande">
        <div className="wrap faq-wrap">
          <div className="stack reveal">
            <span className="over">08 · Domande</span>
            <h2 className="h2">Le cose che ci chiedono<em>.</em></h2>
            <p className="lead-sm">Non trovi la risposta? Scrivici o guarda le soluzioni già pronte.</p>
            <div><Link className="link-arrow" href="/contatti/">Contatti <span className="arr">&gt;</span></Link></div>
          </div>
          <FaqList items={SIM_FAQ} />
        </div>
      </section>

      <CtaBox />
    </>
  )
}
