import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Pagina non trovata · AlpStore by KonnectAlps' },
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap" style={{ display: 'grid', placeItems: 'center', gap: 28, textAlign: 'center' }}>
        <span className="over">Errore 404</span>
        <h1 className="h1-sm">Questa pagina non risponde<em>.</em></h1>
        <div className="term" style={{ textAlign: 'left' }}>
          <div><span className="m">visitatore@alpstore</span>:~$ <span className="w">ping pagina</span></div>
          <div className="a">● nessuna risposta · 100% pacchetti persi</div>
          <div><span className="m">visitatore@alpstore</span>:~$ <span className="w">cd /</span></div>
          <div className="g">✓ torna alla home e riparti da lì</div>
        </div>
        <div className="ctas" style={{ justifyContent: 'center' }}>
          <Link className="btn btn-p" href="/">Torna alla home <span className="arr">&gt;</span></Link>
          <Link className="btn btn-s" href="/contatti/">Contatti</Link>
        </div>
      </div>
    </section>
  )
}
