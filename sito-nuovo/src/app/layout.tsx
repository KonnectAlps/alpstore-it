import type { Metadata, Viewport } from 'next'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { JsonLd } from '@/components/json-ld'
import { RevealObserver } from '@/components/reveal'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { SITE } from '@/content/site'
import { organizationLd, websiteLd } from '@/lib/seo'
import { THEME_INIT_SCRIPT } from '@/lib/theme-script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preload" href="/fonts/dejavu-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/dejavu-sans-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd items={[organizationLd, websiteLd]} />
      </head>
      <body>
        <a className="skip-link" href="#contenuto">
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  )
}
