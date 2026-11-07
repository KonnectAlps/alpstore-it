/** Testi e opzioni della SIM IoT: configuratore, tagli di traffico, IP, gestione, controlli, domande. */

export interface Option {
  value: string
  label: string
  hint?: string
}

export interface Group {
  key: 'form' | 'net' | 'ip' | 'gb' | 'mg'
  legend: string
  label: string
  options: Option[]
  /** Nota fissa sotto il gruppo, sempre visibile. */
  note?: string
}

export const GROUPS: Group[] = [
  {
    key: 'form',
    legend: 'Formato',
    label: 'Formato',
    options: [
      { value: 'sim', label: 'SIM', hint: 'SIM fisica multi-taglio (mini, micro, nano), per router e dispositivi.' },
      { value: 'esim', label: 'eSIM', hint: 'Profilo scaricato sul dispositivo compatibile: nessuna spedizione, attivazione rapida.' },
    ],
  },
  {
    key: 'net',
    legend: 'Rete',
    label: 'Rete',
    options: [
      { value: '4g', label: '4G', hint: 'Copertura più ampia, la scelta giusta per la maggior parte degli impianti.' },
      { value: 'nb', label: 'NB-IoT', hint: 'Pochi dati e batterie che durano anni: sensori, contatori, allarmi.' },
    ],
    note: 'Le SIM IoT sono solo dati, in 4G o NB-IoT. Il 5G per router e sedi è l’offerta a parte 5G Unlimited (CG-NAT o IP pubblico statico, uso lecito 1 TB al mese): chiedila nelle note della richiesta.',
  },
  {
    key: 'ip',
    legend: 'Indirizzo IP',
    label: 'Indirizzo IP',
    options: [
      { value: 'cgn', label: 'CG-NAT', hint: 'Il dispositivo esce su internet ma non è raggiungibile da fuori. La soluzione base.' },
      { value: 'priv', label: 'IP privato statico', hint: 'Rete dedicata raggiungibile solo in VPN: la scelta più sicura.' },
      { value: 'pub', label: 'IP pubblico statico', hint: 'Raggiungibile da internet, per accesso remoto diretto.' },
    ],
  },
  {
    key: 'gb',
    legend: 'Traffico al mese per SIM',
    label: 'Traffico',
    note: 'Oltre il volume la SIM non si blocca: il traffico in più si paga a consumo. Avviso all’80%; blocco o rallentamento solo se li chiedi per iscritto.',
    options: [
      { value: '0.5', label: '500 MB' },
      { value: '1', label: '1 GB' },
      { value: '5', label: '5 GB' },
      { value: '10', label: '10 GB' },
      { value: '50', label: '50 GB' },
      { value: '100', label: '100 GB' },
      { value: '200', label: '200 GB' },
      { value: '300', label: '300 GB' },
      { value: '500', label: '500 GB' },
      { value: '1000', label: '1 TB' },
      { value: 'pool', label: 'Pool', hint: 'Un unico pacchetto di traffico condiviso tra tutte le SIM, fino a 5 TB al mese. Oltre, progetto dedicato.' },
    ],
  },
  {
    key: 'mg',
    legend: 'Gestione',
    label: 'Gestione',
    options: [
      { value: 'ka', label: 'Gestita da KonnectAlps', hint: 'Router, configurazione e controllo li facciamo noi. Tu ricevi gli avvisi.' },
      { value: 'self', label: 'In autonomia', hint: 'Gestisci tu SIM e consumi dall’area clienti, dall’app o via API.' },
    ],
  },
]

export type ConfigState = Record<Group['key'], string> & { qty: number }

export const DEFAULT_CONFIG: ConfigState = { form: 'sim', net: '4g', ip: 'priv', gb: '5', mg: 'ka', qty: 5 }

export interface UseCase {
  id: string
  label: string
  config: ConfigState
}

/** Partenze rapide del configuratore. L'id si usa anche nei link: /sim-iot/?caso=cam#configura */
export const USE_CASES: UseCase[] = [
  { id: 'router', label: 'Router di backup', config: { form: 'sim', net: '4g', ip: 'pub', gb: '100', mg: 'ka', qty: 1 } },
  { id: 'cam', label: 'Telecamere in cantiere', config: { form: 'sim', net: '4g', ip: 'priv', gb: '300', mg: 'ka', qty: 2 } },
  { id: 'gate', label: 'Sbarra o cancello', config: { form: 'sim', net: '4g', ip: 'priv', gb: '1', mg: 'ka', qty: 1 } },
  { id: 'fleet', label: 'Flotta di mezzi', config: { form: 'esim', net: '4g', ip: 'priv', gb: 'pool', mg: 'self', qty: 10 } },
  { id: 'sensor', label: 'Sensori', config: { form: 'sim', net: 'nb', ip: 'priv', gb: '0.5', mg: 'self', qty: 20 } },
  { id: 'mobile', label: 'Sede mobile', config: { form: 'sim', net: '4g', ip: 'pub', gb: '500', mg: 'ka', qty: 2 } },
]

export interface Tier {
  label: string
  use: string
}

/** Tagli di traffico con l'uso tipico (indicativo). */
export const TIERS: Tier[] = [
  { label: '500 MB', use: 'Sensori NB-IoT, contatori, allarmi' },
  { label: '1 GB', use: 'Sbarre, cancelli, colonnine' },
  { label: '5 GB', use: 'Telemetria, PLC, localizzatori' },
  { label: '10 GB', use: 'Flotte con dati frequenti' },
  { label: '50 GB', use: 'Router di backup, POS e casse' },
  { label: '100 GB', use: 'Backup di sede, piccoli uffici' },
  { label: '200 GB', use: 'Una telecamera in diretta' },
  { label: '300 GB', use: 'Cantiere con più telecamere' },
  { label: '500 GB', use: 'Sede mobile, eventi' },
  { label: '1 TB', use: 'Linea principale in 4G (per il 5G c’è 5G Unlimited)' },
  { label: 'Pool', use: 'Traffico condiviso tra più SIM, fino a 5 TB al mese' },
]

export interface IpMode {
  code: string
  title: string
  text: string
  points: string[]
  tone: 'live' | 'mint' | 'muted'
}

export const IP_MODES: IpMode[] = [
  {
    code: 'IP-PRIV',
    title: 'IP privato statico in VPN',
    text: 'Ogni SIM ha sempre lo stesso indirizzo dentro una rete dedicata alla tua azienda. Ci arrivi solo dalla VPN.',
    points: ['Telecamere e PLC non esposti a internet', 'Accesso da sede, ufficio o app', 'La scelta che consigliamo'],
    tone: 'live',
  },
  {
    code: 'IP-PUB',
    title: 'IP pubblico statico',
    text: 'Il dispositivo è raggiungibile da internet a un indirizzo fisso. Utile quando un servizio esterno deve chiamarlo.',
    points: ['Accesso remoto diretto', 'Regole firewall sul router consigliate', 'Ideale per il backup di sede'],
    tone: 'mint',
  },
  {
    code: 'CG-NAT',
    title: 'CG-NAT',
    text: 'Il dispositivo esce su internet e invia i suoi dati, ma nessuno può raggiungerlo da fuori.',
    points: ['Soluzione base, nessuna configurazione', 'Sensori che inviano a un cloud', 'Localizzatori e telemetria'],
    tone: 'muted',
  },
]

export interface Mode {
  code: string
  title: string
  text: string
  points: string[]
}

export const MANAGEMENT: Mode[] = [
  {
    code: 'MANAGED',
    title: 'Gestita da KonnectAlps',
    text: 'Pensiamo noi a tutto: scelta del router, configurazione, VPN, regole e controllo continuo. Se qualcosa cambia ti avvisiamo e interveniamo.',
    points: ['Router e antenne già configurati', 'Monitoraggio dal nostro NOC', 'Un referente tecnico unico', 'Avvisi su traffico, silenzio e anomalie'],
  },
  {
    code: 'SELF',
    title: 'In autonomia',
    text: 'Hai già i tuoi apparati o un tuo team tecnico. Ti diamo le SIM e gli strumenti per gestirle da solo.',
    points: ['Area clienti web e app', 'Consumi, stato e posizione di ogni SIM', 'API per collegare i tuoi sistemi', 'Attivazioni, sospensioni e soglie in autonomia'],
  },
]

export interface Control {
  title: string
  text: string
  status: 'incluso' | 'su richiesta'
}

/** Controlli sulle SIM. Quelli "su richiesta" sono da confermare con il fornitore prima della pubblicazione. */
export const CONTROLS: Control[] = [
  { title: 'Soglie di traffico', text: 'Avviso all’80% e al 100%. Nessun blocco: oltre il volume il traffico extra si paga a consumo, così il sito non resta senza dati.', status: 'incluso' },
  { title: 'Silenzio anomalo', text: 'La macchina non trasmette da ore: per noi è un guasto e ti avvisiamo.', status: 'incluso' },
  { title: 'Picco anomalo', text: 'Un contatore che di colpo manda cento volte i dati di sempre. Lo vedi subito.', status: 'incluso' },
  { title: 'Blocco IMEI', text: 'La SIM funziona solo nel suo apparato. Messa in un telefono, si ferma.', status: 'su richiesta' },
  { title: 'Destinazioni consentite', text: 'Il sensore parla solo con il suo server. Tutto il resto resta chiuso.', status: 'su richiesta' },
  { title: 'Blocco o rallentamento a soglia', text: 'Se preferisci un tetto rigido, al raggiungimento del volume la SIM si blocca o rallenta. Solo su tua richiesta scritta.', status: 'su richiesta' },
  { title: 'Roaming spento', text: 'Se non serve si spegne: una porta di abuso in meno.', status: 'su richiesta' },
]

export interface Step {
  n: string
  title: string
  text: string
}

export const ACTIVATION: Step[] = [
  { n: '01', title: 'Configura', text: 'Rete, traffico, indirizzo IP, gestione e quantità. Ti prepariamo l’offerta.' },
  { n: '02', title: 'Documenti', text: 'Condizioni e modulo d’ordine firmati, visura e documento del legale rappresentante: la legge chiede l’identificazione per ogni SIM.' },
  { n: '03', title: 'Consegna', text: 'Entro 30 giorni fino a 5 SIM, entro 90 oltre. SIM e router arrivano già configurati, con VPN e regole pronte.' },
  { n: '04', title: 'Controllo', text: 'Dall’area clienti vedi tutto. Se qualcosa cambia, ti avvisiamo noi.' },
]

export interface Faq {
  q: string
  a: string
}

export const SIM_FAQ: Faq[] = [
  {
    q: 'Cos’è una SIM IoT gestita?',
    a: 'È una SIM dati per macchine e dispositivi: router, telecamere, sensori, sbarre, mezzi. KonnectAlps la configura, la controlla e interviene se qualcosa non va. Se preferisci, la gestisci tu dall’area clienti.',
  },
  {
    q: 'Che differenza c’è tra IP pubblico, privato statico e CG-NAT?',
    a: 'Con l’IP pubblico statico raggiungi il dispositivo da internet, per esempio un router o un server. Con l’IP privato statico i dispositivi stanno in una rete dedicata raggiungibile solo in VPN: è la scelta più sicura. Il CG-NAT è la soluzione base, quando il dispositivo deve solo uscire su internet.',
  },
  {
    q: 'Meglio SIM o eSIM?',
    a: 'La SIM fisica va bene per quasi tutti i router e i dispositivi. L’eSIM è comoda quando l’apparato la supporta: nessuna spedizione e attivazione più rapida, utile soprattutto per flotte e prodotti connessi.',
  },
  {
    q: 'Quando serve NB-IoT?',
    a: 'Per sensori e contatori che mandano pochi dati e funzionano a batteria. NB-IoT consuma pochissimo e arriva bene anche dentro gli edifici e nei locali tecnici. Non è adatto a video o a traffico continuo.',
  },
  {
    q: 'Mi date anche il router?',
    a: 'Sì. Router 4G e 5G da interno e da esterno, anche dual-SIM per il backup: MikroTik, ZTE, Teltonika. Arrivano già configurati con SIM, VPN e regole. Per usare il 5G serve l’offerta a parte 5G Unlimited.',
  },
  {
    q: 'Quanto costa?',
    a: 'Ogni SIM ha un costo di attivazione, un canone mensile fisso (dovuto anche se la SIM è in un pool o non genera traffico) e un costo di disattivazione; il traffico oltre il volume incluso si paga a consumo. Gli importi sono nell’offerta: configura le SIM che ti servono e richiedila, ti rispondiamo entro un giorno lavorativo.',
  },
  {
    q: 'Le SIM sono per privati?',
    a: 'No. Il servizio è riservato a imprese, enti e professionisti con partita IVA. Per la pubblica amministrazione lavoriamo anche tramite partner.',
  },
  {
    q: 'Quali documenti servono per attivare?',
    a: 'Visura camerale e documento d’identità del legale rappresentante, più condizioni e modulo d’ordine firmati. La legge (art. 98-undetricies del Codice delle comunicazioni elettroniche) chiede l’identificazione del cliente per ogni SIM con accesso a internet, anche per quelle dei dispositivi. Il cliente risponde dell’uso delle sue SIM.',
  },
]

/** Le condizioni in breve, sulla pagina SIM IoT. Testo completo in /condizioni-sim/ (AS-01). */
export const SIM_TERMS_FAQ: Faq[] = [
  {
    q: 'Posso usare la SIM per telefonare o metterla in un telefono?',
    a: 'No. Le SIM AlpStore sono solo dati: niente chiamate vocali, niente SMS verso persone e nessun numero da chiamare. Si usano nei dispositivi IoT/M2M o nei router indicati nell’ordine, non in smartphone, tablet o PC.',
  },
  {
    q: 'In quanto tempo arrivano le SIM?',
    a: 'Entro 30 giorni dalla conferma dell’ordine e dalla verifica dei documenti per ordini fino a 5 SIM, entro 90 giorni per ordini superiori a 5 SIM. Le eSIM seguono gli stessi tempi.',
  },
  {
    q: 'C’è una durata minima? Come si disdice?',
    a: 'Nessuna durata minima. Per cessare una o più SIM scrivi via PEC o e-mail a disdette@konnectalps.it indicando le SIM. Fino a quando la richiesta non arriva il servizio resta attivo e viene fatturato; il canone è dovuto fino alla fine del mese in cui la riceviamo e per ogni SIM cessata c’è il costo di disattivazione.',
  },
  {
    q: 'Cosa succede se supero il traffico incluso?',
    a: 'La SIM non viene bloccata: un sito produttivo non deve restare senza dati. Il traffico in più si paga a consumo. Ti avvisiamo all’80% e al 100% del volume. Se preferisci un tetto rigido, il blocco o il rallentamento si attivano solo su tua richiesta scritta.',
  },
  {
    q: 'Quanto può essere grande un pool?',
    a: 'Il pool condivide un unico volume tra più SIM, fino a 5 TB al mese; per volumi maggiori facciamo un progetto dedicato. Il canone di ogni SIM resta dovuto anche dentro il pool.',
  },
  {
    q: 'E il 5G?',
    a: 'Le SIM IoT sono 4G e NB-IoT. Per router e sedi c’è l’offerta a parte 5G Unlimited: traffico senza limite di volume con uso lecito di 1 TB al mese, CG-NAT o IP pubblico statico.',
  },
]
