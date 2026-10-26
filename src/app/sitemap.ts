import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'
import { SOLUTIONS } from '@/content/solutions'

export const dynamic = 'force-static'

const LAST = new Date('2026-10-25')

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ['/', 1],
    ['/sim-iot/', 0.9],
    ['/soluzioni/', 0.8],
    ...SOLUTIONS.map((s) => [`/soluzioni/${s.slug}/`, 0.7] as [string, number]),
    ['/copertura/', 0.6],
    ['/aziende-e-pa/', 0.7],
    ['/partner/', 0.7],
    ['/chi-siamo/', 0.5],
    ['/contatti/', 0.5],
    ['/condizioni-sim/', 0.3],
    ['/privacy/', 0.1],
    ['/cookie/', 0.1],
  ]
  return pages.map(([p, priority]) => ({ url: `${SITE.url}${p}`, lastModified: LAST, priority }))
}
