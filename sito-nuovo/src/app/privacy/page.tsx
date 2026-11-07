import Link from 'next/link'
import { PageHero } from '@/components/blocks'
import { COMPANY } from '@/content/site'
import { pageMeta } from '@/lib/seo'

/** Testo approvato e pubblicato su alpstore.it/privacy/ (aggiornamento del 25/10/2026). */

const PRIVACY = 'privacy@konnectalps.it'
const PDF = '/documenti/informativa-privacy-konnectalps.pdf'

export const metadata = pageMeta({
  title: 'Informativa privacy',
  description: 'Informativa sul trattamento dei dati personali di alpstore.it e dei servizi AlpStore, KonnectAlps S.r.l.',
  path: '/privacy/',
})

const Mail = () => <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a>

const DATA: [string, string][] = [
  ['Dati di contatto e anagrafici', 'nome, cognome, ruolo, azienda, e-mail, telefono, indirizzo'],
  ['Dati fiscali e amministrativi', 'codice fiscale, partita IVA, PEC, codice SDI, coordinate bancarie, fatture e pagamenti'],
  ['Dati di identificazione', 'documento d’identità del legale rappresentante, richiesto per legge per attivare SIM e servizi di comunicazione (art. 98-undetricies D.Lgs. 259/2003)'],
  ['Dati tecnici dei servizi', 'indirizzi IP, configurazioni di rete e apparati, stato delle linee, consumi delle SIM, abbinamento SIM–dispositivo–sede, ticket di assistenza'],
  ['Dati delle aree riservate', 'e-mail di accesso, password cifrata, verifica in due passaggi, registro degli accessi e delle operazioni'],
  ['Dati dei servizi di sicurezza CyberAlps', 'domini e IP controllati, indirizzi e-mail aziendali verificati nei furti di dati noti, risultati dei controlli, esiti delle simulazioni di phishing e dei corsi'],
  ['Dati dell’assistente vocale', 'numero di telefono, nome o nickname, contenuto, sintesi o trascrizione della conversazione'],
  ['Dati di navigazione', 'pagine visitate, browser, dispositivo, IP; cookie solo come indicato nella Cookie Policy'],
]

const PURPOSES: [string, string][] = [
  ['Preventivi, contratti, attivazione ed erogazione dei servizi, assistenza', 'esecuzione del contratto o di misure precontrattuali (art. 6.1.b)'],
  ['Comunicazione dei dati agli operatori di telecomunicazione necessari per i servizi', 'esecuzione del contratto (art. 6.1.b)'],
  ['Identificazione dei titolari di SIM, fatturazione, obblighi fiscali, richieste delle autorità', 'obbligo di legge (art. 6.1.c)'],
  ['Gestione delle aree riservate, sicurezza delle reti e dei sistemi, prevenzione di frodi e abusi', 'legittimo interesse (art. 6.1.f) e contratto'],
  ['Monitoraggio degli apparati e delle linee del cliente', 'esecuzione del contratto'],
  ['Controlli di sicurezza CyberAlps, simulazioni di phishing e corsi', 'contratto con il cliente; per questi servizi agiamo come responsabile del trattamento per conto del cliente (par. 5)'],
  ['E-mail su prodotti e servizi analoghi a quelli già acquistati', 'legittimo interesse (art. 130, c. 4 Codice privacy); ci si può opporre in ogni momento'],
  ['Altre comunicazioni commerciali, nostre o di terzi', 'consenso (art. 6.1.a), revocabile in ogni momento'],
  ['Statistiche di visita del sito', 'consenso, tramite il banner dei cookie'],
  ['Assistente vocale', 'consenso dato avviando la chiamata, e legittimo interesse a migliorare il servizio'],
  ['Difesa dei diritti in sede giudiziaria', 'legittimo interesse'],
]

const RETENTION: [string, string][] = [
  ['Contratti, fatture, documenti contabili', 'durata del rapporto più 10 anni'],
  ['Dati di identificazione per le SIM', 'durata del servizio più i termini di legge'],
  ['Dati di traffico', 'conservati dagli operatori nei termini dell’art. 132 Codice privacy'],
  ['Registro degli accessi alle aree riservate', '12 mesi'],
  ['Report e risultati CyberAlps', 'durata del servizio, poi cancellati entro 90 giorni'],
  ['Dati delle simulazioni di phishing', 'durata del servizio'],
  ['Conversazioni dell’assistente vocale', 'fino a 12 mesi'],
  ['Contatti commerciali con consenso', 'fino alla revoca'],
  ['Statistiche di navigazione', 'come indicato nella Cookie Policy'],
]

function Table({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="tbl">
      <table>
        <thead>
          <tr>
            <th scope="col">{head[0]}</th>
            <th scope="col">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Privacy' }]}
        overline="Privacy · GDPR"
        title="Informativa privacy e cookie"
        lead={
          <>
            AlpStore è un marchio di {COMPANY.legalName} Questa informativa vale per alpstore.it e per i servizi AlpStore. Ultimo aggiornamento: 25/10/2026. <a href={PDF}>Versione PDF</a>.
          </>
        }
      />
      <section className="section" style={{ paddingTop: 8, borderTop: 0 }}>
        <div className="wrap prose">
          <p>
            Questa informativa è resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (“GDPR”) e del D.Lgs. 196/2003 (“Codice privacy”). Riguarda chi visita i nostri siti, i clienti e le persone che lavorano per loro (referenti, dipendenti, utenti delle aree riservate), i partner e i fornitori, e chi usa il nostro assistente vocale.
          </p>

          <h2>1. Titolare del trattamento</h2>
          <p>
            {COMPANY.legalName}, {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province}), P.IVA {COMPANY.vat}. Contatto per la privacy: <Mail />. Il Titolare non ha nominato un Responsabile della protezione dei dati (DPO), non essendo obbligato a farlo.
          </p>

          <h2>2. Quali dati trattiamo</h2>
          <Table head={['Categoria', 'Esempi']} rows={DATA} />
          <p>Non trattiamo dati di carte di pagamento: gli eventuali pagamenti con carta passano direttamente dai circuiti di pagamento.</p>

          <h2>3. Finalità e basi giuridiche</h2>
          <Table head={['Finalità', 'Base giuridica']} rows={PURPOSES} />
          <p>Senza i dati necessari al contratto o richiesti dalla legge non possiamo attivare o mantenere il servizio.</p>

          <h2>4. Come trattiamo i dati</h2>
          <p>
            Con strumenti informatici e, quando serve, cartacei, da parte di persone autorizzate e tenute alla riservatezza. Le misure comprendono: accesso alle aree riservate con verifica in due passaggi, cifratura delle comunicazioni, registro delle operazioni, backup cifrati, server nell’Unione europea, accesso ai dati limitato a chi ne ha bisogno.
          </p>

          <h2>5. Servizi per conto del cliente</h2>
          <p>
            Per i servizi gestiti (sicurezza CyberAlps, monitoraggio, SIM e connettività gestite) trattiamo dati di cui il cliente è titolare, ad esempio gli indirizzi e-mail dei suoi dipendenti. In questi casi agiamo come responsabile del trattamento (art. 28 GDPR) sulla base di un accordo firmato con il cliente, che indica dati, finalità, misure di sicurezza e sub-responsabili.
          </p>

          <h2>6. Intelligenza artificiale</h2>
          <p>
            Usiamo strumenti di intelligenza artificiale per preparare risposte, documenti e analisi tecniche: il nostro assistente interno Jarvis, che gira su un computer aziendale, i modelli Claude di Anthropic e Qwen di Alibaba Cloud, ai quali Jarvis si appoggia per le elaborazioni, e ChatGPT e Codex di OpenAI, usati dal nostro personale per testi e sviluppo del software. Con tutti questi strumenti valgono le stesse regole: prima di inviare dati sostituiamo e-mail, telefoni, indirizzi IP e MAC, partite IVA, codici fiscali e IBAN con segnaposto; password, chiavi e credenziali non vengono mai inviate. I dati riservati dei clienti non vanno mai a Qwen. Ogni risultato è verificato da una persona prima di essere usato verso i clienti.
          </p>
          <p>
            L’assistente vocale sul sito è un sistema di intelligenza artificiale: chi lo usa parla con una macchina, non con una persona. Si appoggia alla piattaforma NLPearl (nlpearl.ai).
          </p>
          <p>
            In linea con l’art. 50 del Regolamento (UE) 2024/1689 (AI Act), segnaliamo che parte dei testi e delle immagini dei nostri siti è prodotta con il supporto dell’intelligenza artificiale e rivista dal nostro personale.
          </p>

          <h2>7. A chi comunichiamo i dati</h2>
          <ul>
            <li>Operatori di telecomunicazione (rete fissa, accesso a internet, rete mobile), che agiscono come titolari autonomi per i propri obblighi.</li>
            <li>
              Fornitori che agiscono come nostri responsabili del trattamento, tra cui: gestionale e area clienti (ISP Billing), server e backup (Hetzner Online GmbH), posta elettronica e documenti (Microsoft), fatturazione elettronica, banca e servizi di pagamento, siti web (Vercel, Sanity), statistiche (Google, solo con consenso), monitoraggio degli apparati (OptiWize), filtro DNS (FlashStart), assistente vocale (NLPearl), modelli di IA con dati pseudonimizzati (Anthropic PBC per Claude; Alibaba Cloud per Qwen; OpenAI per ChatGPT e Codex) e sintesi vocale (ElevenLabs), vedi par. 6.
            </li>
            <li>Consulenti (commercialista, legali) tenuti alla riservatezza.</li>
            <li>Autorità quando la legge lo impone.</li>
          </ul>
          <p>I dati non sono diffusi. L’elenco aggiornato dei responsabili si può chiedere a <Mail />.</p>

          <h2>8. Trasferimenti fuori dallo Spazio economico europeo</h2>
          <p>
            Alcuni fornitori possono trattare dati fuori dallo SEE: ad esempio servizi web e statistiche, Anthropic e OpenAI (Stati Uniti) e Alibaba Cloud (data center di Francoforte e, solo come riserva, di Singapore). In questi casi il trasferimento avviene verso Paesi con decisione di adeguatezza della Commissione europea (compreso il EU-U.S. Data Privacy Framework per le società aderenti) oppure con le clausole contrattuali standard approvate dalla Commissione. Informazioni sulle garanzie: <Mail />.
          </p>

          <h2>9. Per quanto tempo conserviamo i dati</h2>
          <Table head={['Dati', 'Conservazione']} rows={RETENTION} />
          <p>Poi i dati vengono cancellati o resi anonimi. In caso di contenzioso li conserviamo per la sua durata.</p>

          <h2>10. I tuoi diritti</h2>
          <p>Puoi chiedere in ogni momento di:</p>
          <ul>
            <li>accedere ai tuoi dati e riceverne copia;</li>
            <li>correggerli o completarli;</li>
            <li>cancellarli, quando non servono più o il trattamento non è lecito;</li>
            <li>limitarne il trattamento;</li>
            <li>riceverli in formato strutturato e trasferirli a un altro titolare (portabilità);</li>
            <li>opporti al trattamento basato sul legittimo interesse e al marketing;</li>
            <li>revocare il consenso, senza effetti sui trattamenti già fatti.</li>
          </ul>
          <p>
            Scrivi a <Mail /> o a {COMPANY.legalName}, {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}. Rispondiamo entro 30 giorni. Puoi anche presentare reclamo al Garante per la protezione dei dati personali (
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
          </p>
          <p>Se i dati riguardano un servizio che svolgiamo per conto del tuo datore di lavoro o di un’altra azienda (par. 5), inoltriamo la richiesta all’azienda titolare.</p>

          <h2>11. Modifiche</h2>
          <p>Possiamo aggiornare questa informativa: la versione in vigore è sempre su questa pagina, con la data di aggiornamento. Per le modifiche importanti avvisiamo i clienti per e-mail.</p>

          <h2>Cookie</h2>
          <p>
            alpstore.it non usa cookie: né tecnici, né statistici, né di profilazione, e non carica script di terze parti. Il link per prenotare una chiamata porta al sito di Calendly, che ha una propria informativa. Dettagli nella pagina <Link href="/cookie/">Cookie</Link>.
          </p>
          <p>
            Il sito konnectalps.it ha la propria Cookie Policy. Le aree riservate (console.alpstore.it, partner.konnectalps.it, sec.konnectalps.it) usano solo cookie tecnici di sessione e di sicurezza, necessari per l’accesso.
          </p>
          <p className="doc-meta">
            Vedi anche: <Link href="/condizioni-sim/">Condizioni SIM</Link> · <a href={PDF}>Informativa in PDF</a>
          </p>
        </div>
      </section>
    </>
  )
}
