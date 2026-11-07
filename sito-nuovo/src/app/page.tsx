import Link from 'next/link'
import { CtaBox, DashPreview, HeroScene, Kpis, SectionHead, Steps } from '@/components/blocks'
import { Ecosystem } from '@/components/ecosystem'
import { JsonLd } from '@/components/json-ld'
import { ACTIVATION, CONTROLS, USE_CASES } from '@/content/sim'
import { SITE } from '@/content/site'
import { EXTRA_AREAS, SOLUTIONS } from '@/content/solutions'
import { pageMeta, serviceLd } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'SIM IoT gestite per aziende · AlpStore by KonnectAlps',
  description: SITE.description,
  path: '/',
})

export default function Home() {
  return (
    <>
      <JsonLd
        items={[
          serviceLd(
            'SIM IoT gestite per aziende',
            'SIM ed eSIM IoT solo dati 4G e NB-IoT con IP pubblico o privato statico o CG-NAT, traffico da 500 MB a 1 TB o in pool fino a 5 TB, gestite da KonnectAlps oppure in autonomia. Per router e sedi, l’offerta a parte 5G Unlimited.',
            '/',
          ),
        ]}
      />

      <section className="hero">
        <div className="wrap">
          <div className="copy">
            <span className="cmd">
              &gt; alpstore --iot --status <span className="st">● online</span>
            </span>
            <span className="over">Lo store di KonnectAlps · SIM IoT gestite</span>
            <h1 className="h1">
              La SIM per le tue macchine<em>.</em>
              <br />
              <span className="muted" style={{ fontSize: '0.62em', letterSpacing: '-0.02em', display: 'inline-block', marginTop: 10 }}>
                Controllata. Protetta. Sotto soglia.
              </span>
            </h1>
            <p className="lead">
              Router, contatori, celle frigo, cantieri, sbarre e mezzi. SIM ed eSIM solo dati 4G e NB-IoT con IP statico, configurate da noi e tenute sotto controllo; per router e sedi c’è 5G Unlimited. Ti avvisiamo prima che il traffico sfori o se una macchina smette di parlare.
            </p>
            <div className="ctas">
              <Link className="btn btn-p" href="/sim-iot/#configura">
                Configura le SIM <span className="arr">&gt;</span>
              </Link>
              <Link className="btn btn-s" href="/aziende-e-pa/#richiesta">
                Parla con un tecnico
              </Link>
            </div>
            <p className="note">Per imprese ed enti con partita IVA · risposta entro un giorno lavorativo</p>
          </div>
          <HeroScene />
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 72 }}>
        <Kpis
          items={[
            ['Reti', '4G · NB-IoT'],
            ['Indirizzo', 'IP statico + VPN'],
            ['Controllo', 'Avviso all’80%'],
            ['Traffico', '500 MB → 1 TB · pool 5 TB'],
          ]}
        />
      </div>

      <section className="section">
        <div className="wrap">
          <SectionHead
            overline="00 · L’ecosistema"
            title={<>Al centro la SIM IoT. Intorno, tutto quello che ci si collega<em>.</em></>}
            lead="Ogni pezzo arriva configurato da noi e si controlla dalla stessa area clienti. Tu lo colleghi, noi lo teniamo d’occhio."
          />
          <Ecosystem />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            overline="01 · Soluzioni per aziende e PA"
            title={<>Flotte, varchi, telecamere, backup<em>.</em></>}
            lead="Ogni soluzione parte dalla stessa SIM IoT, configurata per quello che deve fare."
            aside={<Link className="link-arrow" href="/soluzioni/">Tutte le soluzioni <span className="arr">&gt;</span></Link>}
          />
          <div className="grid g3">
            {SOLUTIONS.map((s, i) => (
              <Link key={s.slug} className="card reveal" href={`/soluzioni/${s.slug}/`} style={{ ['--d' as string]: `${(i % 3) * 0.06}s` }}>
                <span className="code">{s.code}</span>
                <span className="t">{s.overline}</span>
                <p>{s.short}</p>
                <span className="foot">
                  <span className="tags">{s.tags}</span>
                  <span className="link-arrow"><span className="arr">&gt;</span></span>
                </span>
              </Link>
            ))}
            <div className="card reveal" style={{ ['--d' as string]: '0.12s' }}>
              <span className="code">{EXTRA_AREAS[0].code}</span>
              <span className="t">{EXTRA_AREAS[0].title}</span>
              <p>{EXTRA_AREAS[0].text}</p>
              <span className="foot"><span className="tags">{EXTRA_AREAS[0].tags}</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            overline="02 · Configura"
            title={<>Parti dal tuo caso<em>.</em></>}
            lead="Scegli da dove partire: il configuratore si apre già impostato. Lo modifichi come vuoi e ci mandi la richiesta."
          />
          <div className="grid g3">
            {USE_CASES.map((u, i) => (
              <Link key={u.id} className="card reveal" href={`/sim-iot/?caso=${u.id}#configura`} style={{ ['--d' as string]: `${(i % 3) * 0.06}s` }}>
                <span className="k">● {u.config.net === 'nb' ? 'NB-IOT' : u.config.net.toUpperCase()} · {u.config.gb === 'pool' ? 'POOL' : Number(u.config.gb) >= 1000 ? '1 TB' : Number(u.config.gb) < 1 ? '500 MB' : `${u.config.gb} GB`}</span>
                <span className="t">{u.label}</span>
                <span className="foot">
                  <span className="tags">{u.config.ip === 'priv' ? 'IP privato · VPN' : u.config.ip === 'pub' ? 'IP pubblico statico' : 'CG-NAT'}</span>
                  <span className="link-arrow">Configura <span className="arr">&gt;</span></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap dash-wrap">
          <div className="stack reveal">
            <span className="over">03 · Area clienti</span>
            <h2 className="h2">Tutte le tue SIM. Una schermata<em>.</em></h2>
            <p className="lead-sm">
              Stato, IP, consumi, qualità del segnale e posizione di ogni SIM, anche se si sposta. Vedi solo le tue, da computer o dall’app, con le notifiche quando una SIM si avvicina alla soglia.
            </p>
            <ul className="bullets">
              <li>Traffico per SIM o in pool, con avviso all’80%</li>
              <li>Allarme se una macchina tace da ore</li>
              <li>Ordini, sospensioni e soglie in autonomia</li>
              <li>API per collegare i tuoi sistemi</li>
            </ul>
            <div className="ctas">
              <a className="btn btn-s" href={SITE.areaClienti}>
                Accedi all’area clienti <span className="arr">&gt;</span>
              </a>
            </div>
            <p className="note">{'// anteprima illustrativa, dati di esempio'}</p>
          </div>
          <DashPreview />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            overline="04 · Controlli per le macchine"
            title={<>Una macchina fa sempre lo stesso. Quando cambia, lo sai<em>.</em></>}
            lead="Le SIM IoT non sono telefoni: i controlli sono più stretti e partono da soli."
          />
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
          <SectionHead overline="05 · Attivazione" title={<>Colleghi i cavi. Funziona<em>.</em></>} />
          <Steps items={ACTIVATION} />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid g2" style={{ gap: 16 }}>
          <div className="track hl reveal">
            <span className="k">● AZIENDE E PA</span>
            <h2 className="h3" style={{ fontSize: 24 }}>Progetti più grandi? Li disegniamo con te.</h2>
            <p className="muted">Più sedi, centinaia di SIM, parcheggi e varchi per comuni ed enti. Sopralluogo, progetto, pilota e messa in servizio con un referente tecnico unico.</p>
            <div className="ctas" style={{ marginTop: 'auto' }}>
              <Link className="btn btn-p" href="/aziende-e-pa/#richiesta">Richiedi un progetto <span className="arr">&gt;</span></Link>
              <Link className="btn btn-s" href="/copertura/">Verifica copertura</Link>
            </div>
          </div>
          <div className="track reveal" style={{ ['--d' as string]: '0.08s' }}>
            <span className="k mint">● PARTNER E WHOLESALE</span>
            <h2 className="h3" style={{ fontSize: 24 }}>Installi impianti o rivendi connettività?</h2>
            <p className="muted">Installatori, integratori e rivenditori: un’area tutta tua con condizioni dedicate e la vista tecnica sui tuoi clienti. Operatori: SIM IoT in wholesale.</p>
            <div className="ctas" style={{ marginTop: 'auto' }}>
              <Link className="btn btn-s" href="/partner/">Diventa partner <span className="arr">&gt;</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBox />
    </>
  )
}
