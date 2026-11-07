import Link from 'next/link'
import { PageHero } from '@/components/blocks'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: 'Cookie Policy', description: 'Cookie e strumenti simili usati da alpstore.it, sito di KonnectAlps S.r.l.', path: '/cookie/' })

export default function CookiePage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Cookie' }]} overline="Documenti legali" title="Cookie Policy" />
      <section className="section" style={{ paddingTop: 8, borderTop: 0 }}>
        <div className="wrap prose">
          <p>
            Questa pagina descrive cookie e strumenti simili usati da alpstore.it. Il titolare del trattamento è KonnectAlps S.r.l., Via Praga 5,
            38121 Trento (TN), P.IVA 02805640220. Per qualsiasi richiesta: <a href="mailto:privacy@konnectalps.it">privacy@konnectalps.it</a>.
            Le informazioni complete sul trattamento dei dati sono nell’<Link href="/privacy/">informativa privacy</Link>.
          </p>

          <h2>01 · Cookie</h2>
          <p>
            alpstore.it non installa cookie: né tecnici, né di analisi, né di profilazione o marketing. Non usa strumenti di statistica né
            pubblicità di terze parti. Per questo il sito non mostra un banner di consenso.
          </p>

          <h2>02 · Memoria locale del browser</h2>
          <p>
            La scelta del tema chiaro o scuro viene salvata solo nel browser del visitatore (memoria locale, “localStorage”). Non viene inviata a
            KonnectAlps né ad altri, non serve a riconoscere il visitatore e si cancella dalle impostazioni del browser. È uno strumento
            strettamente necessario a una funzione richiesta dall’utente e non richiede consenso.
          </p>

          <h2>03 · Mappe</h2>
          <p>
            Le pagine con una mappa (per esempio Copertura e Flotte) mostrano immagini della mappa fornite da CARTO, con dati © OpenStreetMap.
            Per scaricarle il browser del visitatore si collega ai server di CARTO, che ricevono l’indirizzo IP e i dati tecnici della richiesta,
            come per qualsiasi immagine su Internet. Il sito non chiede a CARTO di installare cookie. Il trattamento da parte di CARTO è
            regolato dalla sua informativa: <a href="https://carto.com/privacy" target="_blank" rel="noopener noreferrer">carto.com/privacy</a>.
          </p>

          <h2>04 · Link esterni</h2>
          <p>
            Il pulsante WhatsApp e i link verso altri siti (per esempio konnectalps.it) portano su servizi di terzi, che applicano le proprie
            regole su cookie e dati. Sul sito non è incorporato alcun loro script: il collegamento avviene solo se il visitatore apre il link.
          </p>

          <h2>05 · Modifiche</h2>
          <p>
            Se in futuro il sito userà strumenti di analisi, chat o contenuti esterni che installano cookie, questa pagina verrà aggiornata e,
            quando la legge lo richiede, verrà chiesto il consenso prima di attivarli.
          </p>

          <p className="muted">Ultimo aggiornamento: 25/10/2026.</p>
        </div>
      </section>
    </>
  )
}
