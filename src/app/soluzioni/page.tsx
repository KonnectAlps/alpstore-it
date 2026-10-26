import Link from 'next/link'
import { CtaBox, PageHero, SectionHead } from '@/components/blocks'
import { Ecosystem } from '@/components/ecosystem'
import { JsonLd } from '@/components/json-ld'
import { EXTRA_AREAS, SOLUTIONS } from '@/content/solutions'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Soluzioni IoT per aziende e PA',
  description:
    'Flotte, accessi e varchi, telecamere e sensori, sede mobile e backup, router e antenne: soluzioni costruite intorno alla SIM IoT, configurate e monitorate da KonnectAlps.',
  path: '/soluzioni/',
})

export default function SoluzioniPage() {
  return (
    <>
      <JsonLd items={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Soluzioni', path: '/soluzioni/' }])]} />
      <PageHero
        crumbs={[{ name: 'Soluzioni' }]}
        cmd={<>&gt; alpstore soluzioni --elenco</>}
        overline="Soluzioni per aziende e PA"
        title={<>Ogni soluzione parte dalla stessa SIM<em>.</em></>}
        lead="La SIM IoT è il centro. Intorno mettiamo router, antenne, telecamere, sensori e varchi, scelti per il tuo caso, preparati in laboratorio e controllati dal nostro NOC."
      />

      <section className="section" style={{ paddingTop: 24, borderTop: 0 }}>
        <div className="wrap">
          <div className="grid g2" style={{ gap: 16 }}>
            {SOLUTIONS.map((s, i) => (
              <Link key={s.slug} className="card reveal" href={`/soluzioni/${s.slug}/`} style={{ padding: 28, ['--d' as string]: `${(i % 2) * 0.06}s` }}>
                <span className="code">{s.code}</span>
                <span className="k">● {s.overline}</span>
                <span className="t" style={{ fontSize: 22 }}>{s.title}</span>
                <p>{s.short}</p>
                <span className="foot">
                  <span className="tags">{s.tags}</span>
                  <span className="link-arrow">Scopri <span className="arr">&gt;</span></span>
                </span>
              </Link>
            ))}
            {EXTRA_AREAS.map((a, i) => (
              <div key={a.code} className="card reveal" style={{ padding: 28, ['--d' as string]: `${(i % 2) * 0.06}s` }}>
                <span className="code">{a.code}</span>
                <span className="k mint">● Anche</span>
                <span className="t" style={{ fontSize: 22 }}>{a.title}</span>
                <p>{a.text}</p>
                <span className="foot">
                  <span className="tags">{a.tags}</span>
                  <Link className="link-arrow" href="/contatti/">Parliamone <span className="arr">&gt;</span></Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="L’ecosistema" title={<>Un solo fornitore, un solo referente<em>.</em></>} lead="SIM, apparati, configurazione e controllo dalla stessa squadra. Se qualcosa non va, sai chi chiamare." />
          <Ecosystem />
        </div>
      </section>

      <CtaBox title="Non trovi il tuo caso?" text="Raccontaci cosa devi collegare: lo progettiamo insieme e ti proponiamo SIM, apparati e servizio." />
    </>
  )
}
