/** Dati strutturati schema.org in un unico @graph. */
export function JsonLd({ items }: { items: object[] }) {
  const data = { '@context': 'https://schema.org', '@graph': items }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
