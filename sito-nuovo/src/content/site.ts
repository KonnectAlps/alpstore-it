/**
 * Dati generali del sito: azienda, contatti, menu, link esterni.
 * Tutti i testi del sito stanno nella cartella `src/content/`.
 */

export const SITE = {
  url: 'https://alpstore.it',
  name: 'AlpStore by KonnectAlps',
  shortName: 'AlpStore',
  description:
    'SIM ed eSIM IoT gestite per aziende ed enti: solo dati, 4G e NB-IoT, IP statico pubblico o privato in VPN, da 500 MB a 1 TB o in pool. 5G Unlimited per router e sedi. Flotte, accessi, telecamere e backup, configurati e controllati da KonnectAlps.',
  locale: 'it_IT',
  /** Area clienti (dashboard separata). Segnaposto finché non è online. */
  areaClienti: 'https://console.alpstore.it',
  /** Area partner e wholesale: per ora porta alla stessa area, con accesso dedicato. */
  areaPartner: 'https://console.alpstore.it',
  konnectalps: 'https://konnectalps.it',
  supporto: 'https://support.konnectalps.it',
  /** Prenotazione di una chiamata (già usata sulla pagina "in arrivo"). */
  prenota: 'https://calendly.com/ezio-innocenti-konnectalps/30min',
} as const

export const COMPANY = {
  legalName: 'KonnectAlps S.r.l.',
  brand: 'KonnectAlps',
  street: 'Via Praga 5',
  postalCode: '38121',
  city: 'Trento',
  province: 'TN',
  country: 'IT',
  vat: '02805640220',
  email: 'commerciale@konnectalps.it',
  phone: '+39 0471 840048',
  phoneHref: 'tel:+390471840048',
  phoneShort: '0471 840048',
  /** WhatsApp Business short link: no phone number in the page. */
  whatsapp: 'https://wa.me/message/SSJNSYOQ22CHK1',
} as const

export interface NavItem {
  href: string
  label: string
}

export const NAV: NavItem[] = [
  { href: '/sim-iot/', label: 'SIM IoT' },
  { href: '/soluzioni/', label: 'Soluzioni' },
  { href: '/copertura/', label: 'Copertura' },
  { href: '/aziende-e-pa/', label: 'Aziende e PA' },
  { href: '/partner/', label: 'Partner' },
  { href: '/chi-siamo/', label: 'Chi siamo' },
]

/** Interruttori per sezioni non ancora pronte. */
export const FEATURES = {
  /** Shop di magliette e adesivi: pagina pronta ma nascosta (non nel menu, non nella sitemap, noindex). */
  merchShop: false,
  /** Prezzi online: finché è false ovunque compare "Richiedi offerta". */
  prices: false,
} as const
