import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/blocks'
import { FEATURES } from '@/content/site'
import { pageMeta } from '@/lib/seo'

/** Shop di magliette e adesivi: segnaposto nascosto (non nel menu, non nella sitemap, noindex). */
export const metadata = pageMeta({ title: 'Negozio', description: 'Magliette e adesivi KonnectAlps. In arrivo.', path: '/negozio/', noindex: true })

export default function NegozioPage() {
  if (!FEATURES.merchShop) notFound()
  return (
    <PageHero overline="Negozio · in arrivo" title="Magliette e adesivi" lead="Presto qui il merchandising KonnectAlps.">
      <div className="ctas"><Link className="btn btn-s" href="/">Torna alla home</Link></div>
    </PageHero>
  )
}
