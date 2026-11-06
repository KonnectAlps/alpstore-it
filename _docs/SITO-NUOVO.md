# alpstore.it — il sito nuovo (bozza per Ezio e Alessio, 06/11/2026)

Cartella con il trattino basso: GitHub Pages non la pubblica. Documento interno.

## Principio
Semplice, bello, professionale. Ogni pagina ha **una sola azione principale**: "Richiedi l'offerta" o "Prova gratis 15 giorni". Le richieste arrivano nella console (Richieste web) e per email a commerciale@.

## Pagine
| Pagina | Contenuto | Azione |
|---|---|---|
| Home | Cosa fa AlpStore in tre righe, i 4 servizi a schede, perché noi (gestito da KonnectAlps, assistenza in Trentino-Alto Adige), ultimi articoli | Scegli il servizio |
| SIM IoT e 5G | Il configuratore di oggi (6 tagli di traffico, P.IVA obbligatoria), casi d'uso (router, telecamere, cancelli, flotte, sensori) | Richiedi l'offerta |
| DNS protetto | Due livelli: **Protezione** e **Protezione Plus**; cosa blocca, report mensile nell'area clienti, funziona anche senza IP fisso | Prova gratis 15 giorni |
| Backup 5G | Linea di riserva automatica, monitorata | Richiedi l'offerta |
| Router gestiti | MikroTik, GL.iNet, Teltonika configurati e seguiti da noi | Richiedi l'offerta |
| Articoli | Gli articoli già pubblicati (`/articoli/`), solo AlpStore | — |
| Area clienti | Pulsante verso console.alpstore.it | Accedi |
| Contatti, Privacy, Condizioni SIM | Come oggi | — |

Lingue: italiano subito, tedesco in un secondo momento (stessa struttura, testi separati).

## Come si costruisce
- Su **Vercel**, con lo stesso strumento che Alessio usa per konnectalps.it (un solo modo di lavorare).
- Testi, prezzi e articoli in file separati dalla grafica: un articolo nuovo o una frase cambiata non toccano il codice.
- Ogni modifica ha un link di anteprima: Ezio guarda, approva, poi va online.
- Il modulo di richiesta resta quello di oggi (`POST https://console.alpstore.it/api/public/leads`); per il DNS protetto si aggiunge il tipo di richiesta "prova gratuita".

## Chi fa cosa
- **Alessio**: progetto Vercel, grafica, impaginazione.
- **Chat console/sito**: contenuti delle pagine, configuratore, collegamento con la console, controlli finali.
- **Dot Social**: articoli (solo quelli approvati da Ezio e già pubblicati).
- **Ezio**: approvazione delle anteprime, spostamento del dominio alla fine.

## Passaggio
1. Sito nuovo pronto e approvato in anteprima su Vercel.
2. Dominio alpstore.it spostato su Vercel (pochi minuti, decisione di Ezio).
3. GitHub Pages resta di riserva qualche giorno, poi si spegne.

## In attesa
- Prezzi e differenze Protezione / Protezione Plus: domande a Patrick (FlashStart), bacheca konnectalps-noc #107.
- Strumento usato da Alessio per konnectalps.it.
