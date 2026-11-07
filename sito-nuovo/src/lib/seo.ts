import type { Metadata } from 'next'
import { COMPANY, SITE } from '@/content/site'
import type { Faq } from '@/content/sim'

/** Metadati di pagina: titolo, descrizione, canonical e OpenGraph sempre su https://alpstore.it */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
}): Metadata {
  const url = `${SITE.url}${path}`
  const fullTitle = path === '/' ? title : `${title} · ${SITE.name}`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title: fullTitle,
      description,
      images: [{ url: `${SITE.url}/og.png`, width: 1200, height: 630, alt: 'AlpStore by KonnectAlps: SIM IoT gestite per aziende' }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [`${SITE.url}/og.png`] },
  }
}

export const ORG_ID = 'https://konnectalps.it/#org'

export const organizationLd = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: COMPANY.legalName,
  url: SITE.konnectalps + '/',
  logo: `${SITE.url}/icon-512.png`,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  vatID: `IT${COMPANY.vat}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.street,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.province,
    addressCountry: COMPANY.country,
  },
  brand: { '@type': 'Brand', name: 'AlpStore' },
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#site`,
  name: SITE.name,
  url: `${SITE.url}/`,
  inLanguage: 'it-IT',
  publisher: { '@id': ORG_ID },
}

export function serviceLd(name: string, description: string, path: string, serviceType = 'Connettività IoT M2M') {
  return {
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: `${SITE.url}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Italia' },
    audience: { '@type': 'BusinessAudience' },
  }
}

export function faqLd(items: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
  }
}
