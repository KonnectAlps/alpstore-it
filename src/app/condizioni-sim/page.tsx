import Link from 'next/link'
import { PageHero } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { COMPANY } from '@/content/site'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

/** Testo approvato e pubblicato su alpstore.it/condizioni-sim/ (AS-01 Rev. 1 del 25/10/2026). Stessa numerazione del PDF. */

const AS01 = '/documenti/AS-01-condizioni-sim-iot.pdf'
const AS02 = '/documenti/AS-02-modulo-ordine-sim.pdf'

export const metadata = pageMeta({
  title: 'Condizioni SIM',
  description:
    'Condizioni di fornitura delle SIM IoT 4G e NB-IoT e del 5G Unlimited di AlpStore by KonnectAlps: uso consentito, identificazione, consegna, traffico e soglie, cessazione.',
  path: '/condizioni-sim/',
})

export default function CondizioniSimPage() {
  return (
    <>
      <JsonLd items={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Condizioni SIM', path: '/condizioni-sim/' }])]} />
      <PageHero
        crumbs={[{ name: 'Condizioni SIM' }]}
        overline="AlpStore · SIM IoT"
        title="Condizioni di fornitura delle SIM IoT"
        lead={
          <>
            Rev. 1 del 25/10/2026. Documenti da firmare: <a href={AS01}>condizioni (AS-01, PDF)</a> e <a href={AS02}>modulo d’ordine (AS-02, PDF)</a>. Servizi riservati alle imprese con partita IVA.
          </>
        }
      />
      <section className="section" style={{ paddingTop: 8, borderTop: 0 }}>
        <div className="wrap prose">
          <h2>00 · Oggetto e servizi</h2>
          <p>
            Queste condizioni regolano la fornitura da parte di <strong>{COMPANY.legalName}</strong> (“KonnectAlps”), con il marchio <strong>AlpStore</strong>, di SIM ed eSIM per dati destinate a dispositivi <strong>IoT e M2M</strong> e del servizio <strong>5G Unlimited</strong>, a clienti che agiscono per scopi professionali (“Cliente”). Prezzi, tagli, quantità e durata sono quelli dell’offerta accettata, che prevale su queste condizioni solo dove lo dice espressamente. Per quanto non previsto valgono le condizioni generali di contratto KonnectAlps.
          </p>

          <h2>01 · I servizi</h2>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th scope="col">Servizio</th>
                  <th scope="col">Caratteristiche</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SIM IoT 4G</td>
                  <td>Traffico dati su rete mobile 4G/LTE. Tagli da pochi MB a 1 TB al mese per SIM, oppure pool condiviso tra più SIM fino a 5 TB al mese; per volumi maggiori si fa un progetto dedicato.</td>
                </tr>
                <tr>
                  <td>SIM NB-IoT</td>
                  <td>Traffico dati a basso consumo per sensori e contatori, dove la rete NB-IoT è disponibile.</td>
                </tr>
                <tr>
                  <td>5G Unlimited</td>
                  <td>Offerta separata per router e sedi: traffico dati senza limite di volume, nel rispetto dell’uso lecito (sez. 05).</td>
                </tr>
                <tr>
                  <td>Indirizzo IP</td>
                  <td>CG-NAT (IP condiviso) · IP statico pubblico · IP privato su APN dedicato con VPN gestita da KonnectAlps. Il 5G Unlimited prevede CG-NAT o IP statico pubblico.</td>
                </tr>
                <tr>
                  <td>Console AlpStore</td>
                  <td>Su console.alpstore.it: consumi, avvisi di soglia, blocco e riattivazione delle SIM, documenti.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="callout">
            <strong>Solo dati.</strong> Le SIM AlpStore non abilitano chiamate vocali né SMS verso persone e non hanno un numero di telefono da usare per chiamare. Velocità indicate fino a 300/50 Mbps: sono valori massimi nominali e dipendono dalla copertura.
          </p>

          <h2>02 · Uso consentito</h2>
          <p>La SIM si usa solo nei dispositivi IoT/M2M o nei router dichiarati nell’ordine e solo per le esigenze aziendali del Cliente. In particolare è vietato:</p>
          <ul>
            <li>inserire la SIM in smartphone, tablet o PC, o usarla per uso personale;</li>
            <li>generare traffico voce, VoIP verso persone o SMS massivi;</li>
            <li>usare SIM box, gateway GSM o apparati che instradano traffico di terzi;</li>
            <li>rivendere, cedere o noleggiare la SIM o il traffico a terzi senza un accordo scritto di partnership con KonnectAlps;</li>
            <li>usare la SIM per attività illecite, invio di spam, attacchi informatici, file sharing P2P o server pubblici non concordati;</li>
            <li>generare richieste di connessione in ciclo continuo: il dispositivo deve ritentare con intervalli crescenti.</li>
          </ul>
          <p>Per il 5G Unlimited è ammessa la condivisione della connessione nella rete locale della sede indicata nell’ordine.</p>

          <h2>03 · Identificazione e obblighi di legge</h2>
          <ul>
            <li>Prima dell’attivazione il Cliente fornisce i dati della società e del legale rappresentante con un documento d’identità valido, come richiesto dall’art. 98-undetricies del Codice delle comunicazioni elettroniche (D.Lgs. 259/2003).</li>
            <li>Il Cliente tiene aggiornato l’elenco SIM – dispositivo – sede nella console AlpStore.</li>
            <li>Se fa usare le SIM a terzi (es. propri clienti finali, solo se autorizzato), il Cliente ne raccoglie i dati identificativi e li consegna a KonnectAlps entro 48 ore dalla richiesta.</li>
            <li>KonnectAlps e l’operatore di rete collaborano con l’Autorità giudiziaria nei casi previsti dalla legge.</li>
          </ul>

          <h2>04 · Ordine, consegna e attivazione</h2>
          <ul>
            <li>Quantità minime, tagli e pool sono indicati nell’offerta.</li>
            <li>La consegna delle SIM fisiche o il rilascio dei profili eSIM avviene entro <strong>30 giorni</strong> dalla conferma dell’ordine e dalla verifica dei documenti per ordini fino a 5 SIM, ed entro <strong>90 giorni</strong> per ordini superiori a 5 SIM. I tempi dipendono anche dall’operatore di rete e non danno diritto a indennizzi.</li>
            <li>Ogni SIM ha un costo di attivazione e un canone mensile fisso, indicati nell’offerta. Il canone è dovuto dall’attivazione della SIM, anche se la SIM fa parte di un pool o non genera traffico. Le SIM consegnate e non attivate dal Cliente si considerano attive dopo 30 giorni dalla consegna.</li>
            <li>Le SIM sono consegnate disattivate o in stato di prova: il Cliente verifica subito il funzionamento e segnala entro 7 giorni eventuali SIM difettose.</li>
          </ul>

          <h2>05 · Traffico, soglie e uso lecito</h2>
          <ul>
            <li><strong>Tagli a volume e pool:</strong> oltre il volume incluso la SIM non viene bloccata: il traffico in più si paga a consumo al prezzo di listino, così un sito produttivo non resta mai senza dati. Nei pool il volume si calcola sul totale. Il blocco al raggiungimento del volume si attiva solo su richiesta scritta del Cliente.</li>
            <li>La console avvisa il Cliente all’80% e al 100% del volume. L’avviso è un servizio di cortesia: il Cliente resta responsabile del traffico generato.</li>
            <li><strong>5G Unlimited:</strong> il traffico è senza limite di volume, nel rispetto della soglia di uso lecito di 1 TB al mese per SIM. Al primo superamento KonnectAlps avvisa il Cliente; in caso di ripetizione può ridurre la velocità o sospendere il servizio.</li>
            <li>Un aumento improvviso e anomalo del traffico o delle connessioni è trattato come uso anomalo (sez. 07).</li>
          </ul>

          <h2>06 · Responsabilità del cliente</h2>
          <ul>
            <li>Il Cliente custodisce SIM e dispositivi e risponde di tutto il traffico generato, anche fraudolento o da parte di terzi, fino alla richiesta di blocco dalla console o a <a href="mailto:support@konnectalps.it">support@konnectalps.it</a>.</li>
            <li>In caso di furto, smarrimento o manomissione chiede subito il blocco. Il blocco è gratuito; la sostituzione della SIM è a pagamento come da listino.</li>
            <li>Usa solo apparati conformi alle norme e risponde dei contenuti trasmessi e dell’uso fatto da propri dipendenti, fornitori o clienti.</li>
            <li>Tiene indenne KonnectAlps da richieste di terzi, dell’operatore di rete o delle autorità derivanti da un uso non conforme.</li>
          </ul>

          <h2>07 · Sospensione e disattivazione</h2>
          <p>KonnectAlps può sospendere una o più SIM subito e senza preavviso in caso di:</p>
          <ul>
            <li>uso vietato, illecito o anomalo, o rischio per la rete;</li>
            <li>richiesta dell’Autorità o dell’operatore di rete;</li>
            <li>mancato pagamento o superamento del limite di credito;</li>
            <li>mancata consegna dei dati identificativi.</li>
          </ul>
          <p>Durante la sospensione per causa del Cliente i canoni restano dovuti.</p>
          <p>Le SIM senza traffico per 12 mesi possono essere disattivate con 30 giorni di preavviso via e-mail.</p>

          <h2>08 · Rete mobile e livelli di servizio</h2>
          <ul>
            <li>Il servizio usa la rete di operatori mobili terzi ed è fornito al meglio delle possibilità della rete (best effort): copertura, velocità e latenza non sono garantite e variano per luogo, ora e carico.</li>
            <li>Prima dell’attivazione il Cliente può chiedere una verifica del segnale in sede.</li>
            <li>Il roaming, dove previsto, segue l’elenco Paesi dell’offerta e può cambiare. L’uso permanente fuori dall’Italia va concordato per iscritto.</li>
            <li>KonnectAlps non risponde di interruzioni della rete dell’operatore, né della dismissione di tecnologie (es. 2G, 3G, NB-IoT) decisa dagli operatori: ne dà notizia appena la conosce.</li>
            <li>Gli eventuali livelli di servizio garantiti riguardano solo i servizi gestiti da KonnectAlps (APN privato, VPN, console) e sono indicati nell’offerta.</li>
          </ul>

          <h2>09 · Durata, cessazione e proprietà delle SIM</h2>
          <ul>
            <li>Il servizio <strong>non ha una durata minima</strong>: resta attivo e viene fatturato finché il Cliente non ne chiede la cessazione.</li>
            <li>La richiesta di cessazione si invia per PEC o per e-mail a <a href="mailto:disdette@konnectalps.it">disdette@konnectalps.it</a>, indicando le SIM interessate. Fino a quando la richiesta non arriva, il servizio resta attivo e KonnectAlps continua a fatturarlo; il canone è dovuto fino alla fine del mese in cui la richiesta viene ricevuta. Per ogni SIM cessata si applica il costo di disattivazione indicato nell’offerta.</li>
            <li>Le SIM fisiche restano di proprietà di KonnectAlps o dell’operatore: a fine contratto si restituiscono o si distruggono su richiesta. I profili eSIM e le SIM saldate vengono disattivati.</li>
            <li>KonnectAlps può modificare queste condizioni con 30 giorni di preavviso; il Cliente può recedere senza penali per le modifiche peggiorative.</li>
          </ul>

          <h2>10 · Pagamenti</h2>
          <ul>
            <li>I canoni si fatturano in anticipo, il traffico extra a fine mese. I pagamenti sono quelli indicati nell’offerta.</li>
            <li>KonnectAlps può fissare un limite di credito per Cliente e chiedere un deposito o il pagamento anticipato per nuovi clienti o grandi quantità.</li>
            <li>In caso di ritardo si applicano gli interessi di mora del D.Lgs. 231/2002. Le contestazioni delle fatture vanno inviate entro 30 giorni dal ricevimento.</li>
          </ul>

          <h2>11 · Limiti di responsabilità</h2>
          <ul>
            <li>Salvo dolo o colpa grave, KonnectAlps non risponde di danni indiretti, mancato guadagno o perdita di dati.</li>
            <li>Salvo dolo o colpa grave, la responsabilità complessiva di KonnectAlps è limitata ai canoni pagati dal Cliente negli ultimi 12 mesi per le SIM interessate.</li>
          </ul>

          <h2>12 · Dati personali e foro</h2>
          <ul>
            <li>I dati sono trattati come indicato nell’<Link href="/privacy/">informativa privacy</Link> di KonnectAlps. I dati di traffico sono conservati dagli operatori nei termini dell’art. 132 del Codice privacy.</li>
            <li>Foro competente esclusivo: Trento.</li>
          </ul>

          <h2>Accettazione</h2>
          <p>
            Firma con firma autografa (carica la scansione nella console AlpStore) oppure con firma digitale o firma con codice SMS inviata da KonnectAlps. Le SIM si attivano solo dopo la verifica del documento firmato e dell’identità del legale rappresentante.
          </p>
          <p>
            Ai sensi degli artt. 1341 e 1342 c.c. il Cliente approva specificamente le clausole: 02 Uso consentito; 04 Ordine, consegna e attivazione (decorrenza del canone); 05 Traffico, soglie e uso lecito; 06 Responsabilità del cliente; 07 Sospensione e disattivazione; 08 Rete mobile e livelli di servizio; 09 Durata, cessazione e proprietà delle SIM; 10 Pagamenti; 11 Limiti di responsabilità; 12 Foro competente.
          </p>
          <p className="doc-meta">
            Documenti: <a href={AS01}>AS-01 Condizioni di fornitura (PDF)</a> · <a href={AS02}>AS-02 Modulo d’ordine (PDF)</a>
          </p>
        </div>
      </section>
    </>
  )
}
