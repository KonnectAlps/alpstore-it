import { CtaBox, PageHero, SectionHead } from '@/components/blocks'
import { CoverageCheck } from '@/components/coverage-check'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Verifica copertura 4G, 5G e NB-IoT',
  description:
    'Verifica se 4G, NB-IoT e 5G arrivano dove ti servono, prima di ordinare le SIM IoT o il 5G Unlimited. Demo della verifica: quella completa è nell’area clienti e partner di AlpStore.',
  path: '/copertura/',
})

const TECH = [
  { t: '5G', k: 'SOLO 5G UNLIMITED', d: 'Per router e sedi, anche come backup della linea principale, con l’offerta a parte 5G Unlimited. Copertura in crescita, migliore nei centri abitati e lungo le valli principali.' },
  { t: '4G', k: 'LA PIÙ DIFFUSA', d: 'La rete che arriva quasi ovunque. Va bene per la maggior parte di router, varchi, flotte e telemetria.' },
  { t: 'NB-IoT', k: 'POCHI DATI, ANNI DI BATTERIA', d: 'Penetra bene negli edifici e nei locali tecnici. Per sensori e contatori che mandano pochi dati.' },
]

export default function CoperturaPage() {
  return (
    <>
      <JsonLd items={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Copertura', path: '/copertura/' }])]} />
      <PageHero
        crumbs={[{ name: 'Copertura' }]}
        cmd={<>&gt; alpstore copertura --indirizzo <span className="cur">_</span></>}
        overline="Verifica copertura"
        title={<>Arriva il segnale dove ti serve<em>?</em></>}
        lead="Scrivi l’indirizzo dell’impianto o del sito. Ti diciamo quali reti arrivano e con che tecnologia, prima di ordinare."
      />
      <section className="section" style={{ paddingTop: 16, borderTop: 0 }}>
        <div className="wrap">
          <CoverageCheck />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead overline="Tecnologie" title={<>Quale rete per quale macchina<em>.</em></>} lead="Le SIM IoT lavorano in 4G e NB-IoT; il 5G è per router e sedi con 5G Unlimited. Scegliamo la tecnologia in base a cosa deve fare il dispositivo e a dove si trova." />
          <div className="grid g3">
            {TECH.map((x, i) => (
              <div className="card reveal" key={x.t} style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <span className="k">● {x.k}</span>
                <span className="t mono" style={{ fontSize: 28 }}>{x.t}</span>
                <p>{x.d}</p>
              </div>
            ))}
          </div>
          <p className="note reveal" style={{ marginTop: 20 }}>Segnale debole dentro un quadro o un locale interrato? Un’antenna da esterno risolve quasi sempre: la prevediamo noi nel progetto.</p>
        </div>
      </section>
      <CtaBox title="Vuoi la verifica sull’indirizzo esatto?" text="Mandaci indirizzo o coordinate e cosa devi collegare. Se serve, ti proponiamo una prova con SIM di test." />
    </>
  )
}
