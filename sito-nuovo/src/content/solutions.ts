/** Le soluzioni costruite intorno alla SIM IoT. Ogni voce genera una pagina /soluzioni/<slug>/ */

export type SolutionVisual = 'fleet' | 'gates' | 'cams' | 'failover' | 'routers'

export interface Solution {
  slug: string
  code: string
  overline: string
  title: string
  short: string
  tags: string
  lead: string
  metaTitle: string
  metaDescription: string
  visual: SolutionVisual
  /** Configurazione di partenza nel configuratore (id di USE_CASES). */
  useCase: string
  benefits: { title: string; text: string }[]
  how: { title: string; text: string }[]
  hardware: { name: string; text: string }[]
  forWho: string[]
  note?: string
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'flotte',
    code: 'KA-IOT-F',
    overline: 'Flotte',
    title: 'Mezzi sulla mappa, SIM sotto controllo',
    short: 'Furgoni, mezzi d’opera, macchine operatrici: posizione, movimento e qualità del segnale di ogni SIM.',
    tags: '4G · eSIM · GPS · pool',
    lead: 'Ogni mezzo ha la sua SIM e il suo router. Vedi dove si trova, se si muove, com’è il segnale e quanto traffico usa, da un’unica mappa.',
    metaTitle: 'SIM IoT per flotte e mezzi',
    metaDescription:
      'SIM ed eSIM IoT per flotte aziendali: posizione, movimento e qualità del segnale di ogni mezzo su una mappa. Router con GPS configurati da KonnectAlps.',
    visual: 'fleet',
    useCase: 'fleet',
    benefits: [
      { title: 'Posizione e movimento', text: 'Ultima posizione nota, mezzo fermo o in movimento, storico degli spostamenti.' },
      { title: 'Qualità del segnale', text: 'Per ogni SIM: rete agganciata, potenza del segnale e zone dove la copertura cala.' },
      { title: 'Traffico in pool', text: 'Un unico pacchetto fino a 5 TB al mese condiviso da tutta la flotta: chi consuma di più prende dal pool.' },
      { title: 'Wi-Fi a bordo', text: 'Il router del mezzo collega tablet, terminali e telecamere di bordo.' },
    ],
    how: [
      { title: 'Router con GPS sul mezzo', text: 'MikroTik LtAP o Teltonika, alimentati dal mezzo e già configurati.' },
      { title: 'SIM o eSIM in pool', text: 'Una SIM per mezzo, traffico condiviso, IP privato in VPN.' },
      { title: 'Mappa nell’area clienti', text: 'Posizione, stato e segnale di tutta la flotta, con avvisi.' },
    ],
    hardware: [
      { name: 'MikroTik LtAP', text: 'Router 4G con GPS integrato, dual-SIM, pensato per i veicoli.' },
      { name: 'Teltonika', text: 'Router industriali per mezzi e macchine, con GPS e I/O.' },
      { name: 'Antenne da tetto', text: 'Antenne combinate LTE/5G e GPS per i mezzi.' },
    ],
    forWho: ['Trasporti e logistica', 'Imprese edili', 'Servizi a domicilio', 'Mezzi di enti e comuni'],
  },
  {
    slug: 'accessi-e-varchi',
    code: 'KA-IOT-A',
    overline: 'Accessi e varchi',
    title: 'Sbarre, cancelli e colonnine, comandati da remoto',
    short: 'Parcheggi, cancelli, colonnine: comandi da remoto e registro di chi apre. Per aziende e PA.',
    tags: '4G · IP statico · VPN',
    lead: 'La sbarra del parcheggio o il cancello del magazzino diventano un dispositivo in rete: li apri da remoto, sai chi è entrato e ricevi un avviso se qualcosa non risponde.',
    metaTitle: 'SIM IoT per controllo accessi, sbarre e cancelli',
    metaDescription:
      'Controllo accessi con SIM IoT e IP privato in VPN: sbarre di parcheggio, cancelli e colonnine comandati da remoto, con registro degli accessi. Per aziende e PA.',
    visual: 'gates',
    useCase: 'gate',
    benefits: [
      { title: 'Comando da remoto', text: 'Apertura da centrale operativa, portineria o app, anche fuori orario.' },
      { title: 'Registro degli accessi', text: 'Chi ha aperto, quando e da dove. Utile per verifiche e contestazioni.' },
      { title: 'Rete chiusa', text: 'IP privato statico in VPN: il varco non è raggiungibile da internet.' },
      { title: 'Allarme se tace', text: 'Se il varco smette di rispondere, lo sappiamo prima che ti chiamino.' },
    ],
    how: [
      { title: 'Router sul quadro', text: 'Un router 4G compatto dentro il quadro della sbarra o del cancello.' },
      { title: 'SIM con IP privato', text: 'Pochi dati al mese, IP statico in VPN, SMS e roaming spenti.' },
      { title: 'Collegamento al tuo sistema', text: 'Il controller degli accessi resta il tuo: noi lo colleghiamo in sicurezza.' },
    ],
    hardware: [
      { name: 'Router 4G compatti', text: 'MikroTik o Teltonika, alimentazione da quadro, ingressi e uscite digitali.' },
      { name: 'Antenne da esterno', text: 'Per quadri in metallo o interrati, dove il segnale non arriva.' },
    ],
    forWho: ['Parcheggi aziendali e condominiali', 'Comuni ed enti (anche tramite partner)', 'Logistica e magazzini', 'Strutture ricettive'],
    note: 'Per la pubblica amministrazione lavoriamo anche tramite partner già attivi con gli enti.',
  },
  {
    slug: 'telecamere-e-sensori',
    code: 'KA-IOT-R',
    overline: 'Telecamere e sensori',
    title: 'Siti remoti sotto controllo, senza esporli a internet',
    short: 'Cantieri, magazzini, impianti: telecamere visibili solo in VPN e sensori che avvisano se qualcosa cambia.',
    tags: '4G · NB-IoT · fino a 1 TB',
    lead: 'Telecamere UniFi che registrano sul posto e si guardano solo dalla VPN. Sensori di temperatura, porta e allarme che mandano pochi dati e avvisano quando serve.',
    metaTitle: 'Telecamere e sensori su SIM IoT per siti remoti',
    metaDescription:
      'Telecamere UniFi e sensori IoT su SIM 4G o NB-IoT per cantieri, magazzini e impianti remoti. Visibili solo in VPN, configurati e monitorati da KonnectAlps.',
    visual: 'cams',
    useCase: 'cam',
    benefits: [
      { title: 'Video solo in VPN', text: 'Le telecamere non sono raggiungibili da internet: niente porte aperte.' },
      { title: 'Registrazione sul posto', text: 'Il video resta nel sito, in rete passa solo quello che guardi.' },
      { title: 'Sensori che durano', text: 'Celle frigo, contatori, porte e allarmi su NB-IoT, a batteria per anni.' },
      { title: 'Avvisi utili', text: 'Temperatura fuori soglia, porta aperta, sito che non risponde.' },
    ],
    how: [
      { title: 'Kit per il sito', text: 'Router 4G, switch e telecamere UniFi preparati in laboratorio.' },
      { title: 'SIM con traffico adatto', text: 'Da 200 GB a 1 TB per il video, 500 MB per i sensori.' },
      { title: 'Accesso dalla VPN', text: 'Guardi telecamere e sensori da ufficio, PC o telefono.' },
    ],
    hardware: [
      { name: 'Ubiquiti UniFi', text: 'Telecamere, registratore e sensori della stessa famiglia, gestiti insieme.' },
      { name: 'Router da esterno', text: 'MikroTik o ZTE MC889, montati in alto dove il segnale è migliore. In 5G con l’offerta 5G Unlimited.' },
      { name: 'Sensori NB-IoT', text: 'Temperatura, umidità, contatti porta, contatori.' },
    ],
    forWho: ['Cantieri edili', 'Magazzini e depositi', 'Celle frigo e catena del freddo', 'Impianti tecnici e pompe'],
  },
  {
    slug: 'sede-mobile-e-backup',
    code: 'KA-IOT-B',
    overline: 'Sede mobile e backup',
    title: 'Se la fibra cade, la SIM entra da sola',
    short: 'Doppia SIM, failover automatico e satellite: la sede resta online, anche quando si sposta.',
    tags: '4G · 5G Unlimited · satellite',
    lead: 'Un router con due SIM di operatori diversi come backup della linea principale, o come linea unica per uffici temporanei, eventi e cantieri. Dove la rete mobile non arriva, aggiungiamo il satellite.',
    metaTitle: 'Backup 4G e 5G, failover e sede mobile con satellite',
    metaDescription:
      'Failover automatico su SIM 4G o 5G Unlimited con router dual-SIM e connettività satellitare per sedi, uffici temporanei, eventi e cantieri. Configurato e monitorato da KonnectAlps.',
    visual: 'failover',
    useCase: 'mobile',
    benefits: [
      { title: 'Failover automatico', text: 'La linea di backup entra in pochi secondi: casse, POS e centralino non si fermano.' },
      { title: 'Due operatori', text: 'Dual-SIM su reti diverse: se una rete ha problemi, si passa all’altra.' },
      { title: 'Satellite dove serve', text: 'In zone senza copertura mobile, il satellite diventa la linea della sede mobile.' },
      { title: 'Monitorato', text: 'Sappiamo quando la linea principale cade e quando torna, e te lo diciamo.' },
    ],
    how: [
      { title: 'Router dual-SIM', text: 'Collegato alla tua rete, prende il posto della linea principale quando serve.' },
      { title: 'SIM con IP statico', text: 'SIM 4G o 5G Unlimited con IP pubblico statico: gli stessi servizi raggiungibili anche durante il backup.' },
      { title: 'Bonding e SD-WAN', text: 'Per sedi critiche più linee si sommano: lo progettiamo su konnectalps.it.' },
    ],
    hardware: [
      { name: 'Router dual-SIM 4G e 5G', text: 'MikroTik, ZTE MC889 o Teltonika, da interno o da esterno.' },
      { name: 'Terminale satellitare', text: 'Per sedi mobili e zone isolate, integrato con il router.' },
      { name: 'Kit valigia', text: 'Router, batteria e antenne in un case: si apre e si lavora.' },
    ],
    forWho: ['Negozi e catene', 'Alberghi e strutture ricettive', 'Eventi e fiere', 'Uffici di cantiere'],
    note: '5G Unlimited è un’offerta a parte per router e sedi: traffico senza limite di volume con uso lecito di 1 TB al mese, CG-NAT o IP pubblico statico.',
  },
  {
    slug: 'router-e-antenne',
    code: 'KA-IOT-H',
    overline: 'Router e antenne',
    title: 'Router 4G e 5G, già configurati',
    short: 'MikroTik, ZTE MC889, Teltonika: da interno, da esterno e per veicoli. Arrivano pronti.',
    tags: 'MikroTik · ZTE · Teltonika',
    lead: 'Scegliamo l’apparato in base al posto e all’uso, lo prepariamo in laboratorio con SIM, VPN, filtro DNS e regole, e te lo spediamo pronto da collegare.',
    metaTitle: 'Router 4G e 5G e antenne da esterno',
    metaDescription:
      'Router 4G e 5G MikroTik, ZTE MC889 e Teltonika, antenne da esterno e LtAP con GPS. Configurati da KonnectAlps con SIM IoT o 5G Unlimited, VPN e regole, pronti da collegare.',
    visual: 'routers',
    useCase: 'router',
    benefits: [
      { title: 'Pronti da collegare', text: 'SIM inserita, VPN attiva, regole impostate: lo accendi e funziona.' },
      { title: 'Scelti per il posto', text: 'Da interno, da esterno, su palo, sul mezzo: l’apparato giusto per ogni caso.' },
      { title: 'Filtro DNS gestito', text: 'Dove c’è un router: siti malevoli e phishing bloccati con le tue regole.' },
      { title: 'Aggiornati e controllati', text: 'Firmware e sicurezza seguiti da noi, per tutta la vita dell’apparato.' },
    ],
    how: [
      { title: 'Sopralluogo o foto', text: 'Ci dici dove va il router: valutiamo segnale e montaggio.' },
      { title: 'Preparazione in laboratorio', text: 'Configurazione, test e etichetta con i dati della SIM.' },
      { title: 'Spedizione e controllo', text: 'Arriva pronto. Da lì lo teniamo d’occhio noi.' },
    ],
    hardware: [
      { name: 'MikroTik da esterno', text: 'Router 4G e 5G da palo o da facciata, per portare il segnale dove serve.' },
      { name: 'MikroTik LtAP', text: 'Router 4G con GPS per veicoli e macchine.' },
      { name: 'ZTE MC889', text: 'Router 5G da esterno ad alte prestazioni, per linee principali e backup con 5G Unlimited.' },
      { name: 'Teltonika', text: 'Router industriali e per IoT, con I/O e montaggio su guida DIN.' },
    ],
    forWho: ['Sedi senza fibra', 'Backup della linea principale', 'Impianti e macchine', 'Mezzi e veicoli'],
    note: 'Le SIM IoT sono 4G e NB-IoT, solo dati. Per i router 5G di sede c’è l’offerta a parte 5G Unlimited.',
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}

/** Altre aree mostrate nella pagina Soluzioni senza pagina dedicata. */
export const EXTRA_AREAS = [
  {
    code: 'KA-IOT-P',
    title: 'Prodotti connessi',
    text: 'SIM o eSIM dentro i tuoi prodotti. Le gestiamo noi, oppure le gestisci tu da area clienti e API.',
    tags: 'SIM · eSIM · API',
  },
  {
    code: 'KA-VOIP',
    title: 'VoIP e centralino',
    text: 'Numeri e centralino in cloud per sedi, cantieri e uffici temporanei, sulla connettività KonnectAlps. Le SIM IoT restano solo dati, senza voce.',
    tags: 'VoIP · centralino cloud',
  },
]
