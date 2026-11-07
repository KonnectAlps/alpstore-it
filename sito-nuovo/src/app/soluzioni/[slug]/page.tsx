import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CtaBox, PageHero, SectionHead, Steps } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { SolutionVisual } from '@/components/solution-visual'
import { USE_CASES } from '@/content/sim'
import { SOLUTIONS, getSolution } from '@/content/solutions'
import { breadcrumbLd, pageMeta, serviceLd } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSolution((await params).slug)
  if (!s) return {}
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/soluzioni/${s.slug}/` })
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug)
  if (!s) notFound()
  const path = `/soluzioni/${s.slug}/`
  const use = USE_CASES.find((u) => u.id === s.useCase)
  const others = SOLUTIONS.filter((o) => o.slug !== s.slug)

  return (
    <>
      <JsonLd
        items={[
          serviceLd(s.metaTitle, s.metaDescription, path, s.overline),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Soluzioni', path: '/soluzioni/' },
            { name: s.overline, path },
          ]),
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Soluzioni', href: '/soluzioni/' }, { name: s.overline }]}
        cmd={<>&gt; {s.code.toLowerCase()} --status <span className="st">● disponibile</span></>}
        overline={`${s.overline} · ${s.tags}`}
        title={<>{s.title}<em>.</em></>}
        lead={s.lead}
      >
        <div className="ctas">
          <Link className="btn btn-p" href={`/sim-iot/?caso=${s.useCase}#configura`}>
            Configura {use ? `“${use.label}”` : 'le SIM'} <span className="arr">&gt;</span>
          </Link>
          <Link className="btn btn-s" href="/aziende-e-pa/#richiesta">Richiedi un progetto</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead overline="Cosa ottieni" title={<>Il servizio, in pratica<em>.</em></>} />
            <div className="grid g2">
              {s.benefits.map((b, i) => (
                <div className="ctrl reveal" key={b.title} style={{ ['--d' as string]: `${(i % 2) * 0.06}s` }}>
                  <b>{b.title}</b>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
            {s.note ? <p className="note">{s.note}</p> : null}
          </div>
          <div className="reveal" style={{ ['--d' as string]: '0.1s' }}>
            <SolutionVisual kind={s.visual} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Come funziona" title={<>Tre pezzi, configurati da noi<em>.</em></>} />
          <Steps items={s.how.map((h, i) => ({ n: `0${i + 1}`, title: h.title, text: h.text }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <div className="stack reveal">
            <span className="over">Apparati</span>
            <h2 className="h2">Cosa installiamo<em>.</em></h2>
            <p className="lead-sm">Scegliamo l’apparato in base al posto e all’uso. Arriva già configurato con SIM, VPN e regole.</p>
            <div className="grid" style={{ gap: 8 }}>
              {s.hardware.map((h) => (
                <div className="card" key={h.name} style={{ padding: 18 }}>
                  <span className="t" style={{ fontSize: 16 }}>{h.name}</span>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="stack reveal" style={{ ['--d' as string]: '0.08s' }}>
            <span className="over">Per chi</span>
            <h2 className="h2">Chi la usa già<em>.</em></h2>
            <ul className="bullets">{s.forWho.map((f) => <li key={f}>{f}</li>)}</ul>
            {use ? (
              <div className="panel" style={{ padding: 22, marginTop: 8 }}>
                <span className="k">● CONFIGURAZIONE DI PARTENZA</span>
                <p className="cfg-code" style={{ marginTop: 10 }}>
                  KA-IOT · {use.config.form.toUpperCase()} · {use.config.net === 'nb' ? 'NB-IoT' : use.config.net.toUpperCase()} · {use.config.gb === 'pool' ? 'POOL' : use.config.gb === '1000' ? '1 TB' : use.config.gb === '0.5' ? '500 MB' : `${use.config.gb} GB`} · {use.config.ip === 'priv' ? 'IP-PRIV' : use.config.ip === 'pub' ? 'IP-PUB' : 'CGNAT'} · {use.config.mg === 'ka' ? 'MANAGED' : 'SELF'}
                </p>
                <div className="ctas" style={{ marginTop: 14 }}>
                  <Link className="btn btn-p btn-sm" href={`/sim-iot/?caso=${use.id}#configura`}>Apri nel configuratore <span className="arr">&gt;</span></Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead overline="Altre soluzioni" title={<>Si combinano tra loro<em>.</em></>} />
          <div className="grid g4">
            {others.map((o) => (
              <Link key={o.slug} href={`/soluzioni/${o.slug}/`} className="card reveal">
                <span className="code">{o.code}</span>
                <span className="t" style={{ fontSize: 17 }}>{o.overline}</span>
                <span className="foot"><span className="tags">{o.tags}</span><span className="link-arrow"><span className="arr">&gt;</span></span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBox title={`${s.overline}: ne parliamo?`} />
    </>
  )
}
