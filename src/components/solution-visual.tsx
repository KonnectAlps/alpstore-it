import { DEMO_FLEET } from '@/content/coverage'
import type { SolutionVisual as V } from '@/content/solutions'
import { LazyMap } from './map-lazy'

function Fleet() {
  return (
    <div className="stack" style={{ gap: 12 }}>
      <LazyMap
        height={400}
        markers={DEMO_FLEET.map((v) => ({ lat: v.lat, lon: v.lon, label: `${v.name} · ${v.net} · ${v.state}`, tone: v.ok ? 'live' : 'warn' }))}
        label="Mappa d'esempio della flotta: cinque mezzi tra Trento, Rovereto, Pergine, Cavalese e Bolzano"
        legend={
          <>
            <span><i className="dot" /> Segnale buono</span>
            <span><i className="dot warn" /> Segnale debole</span>
          </>
        }
      />
      <div className="term" aria-label="Elenco d'esempio dei mezzi">
        {DEMO_FLEET.map((v) => (
          <div key={v.name}>
            <span className="w">{v.name.padEnd(14, ' ')}</span> <span className="c">{v.net}</span> · {v.ok ? <span className="g">● {v.state}</span> : <span className="a">● {v.state}</span>}
          </div>
        ))}
        <div className="c">{'// dati di esempio'}</div>
      </div>
    </div>
  )
}

function Gates() {
  return (
    <div className="term" role="img" aria-label="Esempio di registro accessi di una sbarra di parcheggio">
      <div><span className="m">varchi@alpstore</span>:~$ <span className="w">stato --sito parcheggio-nord</span></div>
      <div>SBARRA INGRESSO · 4G · IP-PRIV · <span className="g">● online 18 ms</span></div>
      <div>SBARRA USCITA · 4G · IP-PRIV · <span className="g">● online 21 ms</span></div>
      <div>CANCELLO CARRAIO · 4G · IP-PRIV · <span className="a">● nessuna risposta da 4 min</span></div>
      <div><span className="m">varchi@alpstore</span>:~$ <span className="w">registro --oggi</span></div>
      <div><span className="c">07:58</span> ingresso · badge 0142 · <span className="g">aperta</span></div>
      <div><span className="c">08:12</span> ingresso · portineria (remoto) · <span className="g">aperta</span></div>
      <div><span className="c">09:30</span> uscita · targa letta · <span className="g">aperta</span></div>
      <div><span className="m">varchi@alpstore</span>:~$ <span className="w">apri --varco ingresso</span></div>
      <div className="g">✓ comando inviato · registrato</div>
      <div className="c" style={{ marginTop: 6 }}>{'// anteprima illustrativa, dati di esempio'}</div>
    </div>
  )
}

function Cams() {
  return (
    <div className="viz" role="img" aria-label="Esempio di sito remoto: quattro telecamere visibili in VPN e tre sensori">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, gap: 8, flexWrap: 'wrap' }}>
        <span className="k mint">CANTIERE VIA VERDI · 4G</span>
        <span className="pill live">● VPN</span>
      </div>
      <div className="cam-grid">
        {['CAM 01 · INGRESSO', 'CAM 02 · GRU', 'CAM 03 · DEPOSITO', 'CAM 04 · RECINZIONE'].map((c) => (
          <div className="cam" key={c}>
            <span>{c}</span>
            <span className="rec">● REC</span>
          </div>
        ))}
      </div>
      <div className="sensors">
        <div className="sensor">CELLA FRIGO<b>3,8 °C</b><span className="live">● OK</span></div>
        <div className="sensor">PORTA MAGAZZINO<b>chiusa</b><span className="live">● OK</span></div>
        <div className="sensor">TRAFFICO MESE<b>212 GB</b><span className="warn">● 71%</span></div>
      </div>
    </div>
  )
}

function Failover() {
  return (
    <div className="viz" role="img" aria-label="Esempio di failover: la fibra è caduta, il router è passato automaticamente sul 5G Unlimited; il satellite è pronto come riserva">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: 8, flexWrap: 'wrap' }}>
        <span className="k mint">SEDE · NEGOZIO CENTRO</span>
        <span className="pill warn">● FAILOVER ATTIVO</span>
      </div>
      <div className="flow">
        <div className="flow-node off"><small>LINEA PRINCIPALE</small><b>Fibra</b><span className="warn mono" style={{ fontSize: 12 }}>● giù da 3 min</span></div>
        <div className="flow-node on"><small>BACKUP · SIM 1</small><b>5G Unlimited · IP pubblico</b><span className="live mono" style={{ fontSize: 12 }}>● in uso · 32 ms</span></div>
        <div className="flow-node"><small>RISERVA</small><b>SIM 2 · satellite</b><span className="mint mono" style={{ fontSize: 12 }}>● pronta</span></div>
      </div>
      <div className="term" style={{ marginTop: 16 }}>
        <div><span className="c">10:41:07</span> fibra · <span className="a">perdita di segnale</span></div>
        <div><span className="c">10:41:11</span> router · <span className="g">passaggio a 5G Unlimited</span> · casse e POS online</div>
        <div><span className="c">10:41:12</span> NOC KonnectAlps · <span className="m">guasto aperto con il fornitore</span></div>
        <div className="c">{'// anteprima illustrativa'}</div>
      </div>
    </div>
  )
}

function Routers() {
  return (
    <div className="term" role="img" aria-label="Esempio di scheda di preparazione di un router">
      <div><span className="m">lab@konnectalps</span>:~$ <span className="w">prepara --router 5g-esterno --sim 2</span></div>
      <div>firmware · <span className="g">aggiornato</span></div>
      <div>SIM 1 · 5G Unlimited · IP-PUB · <span className="g">● registrata</span></div>
      <div>SIM 2 · 4G · altro operatore · <span className="g">● pronta</span></div>
      <div>VPN verso sede · <span className="g">● up</span></div>
      <div>filtro DNS · <span className="g">attivo</span></div>
      <div>firewall · <span className="g">solo porte autorizzate</span></div>
      <div>monitoraggio NOC · <span className="g">collegato</span></div>
      <div className="g">✓ pronto per la spedizione · etichetta stampata</div>
      <div className="c" style={{ marginTop: 6 }}>{'// anteprima illustrativa'}</div>
    </div>
  )
}

export function SolutionVisual({ kind }: { kind: V }) {
  switch (kind) {
    case 'fleet':
      return <Fleet />
    case 'gates':
      return <Gates />
    case 'cams':
      return <Cams />
    case 'failover':
      return <Failover />
    case 'routers':
      return <Routers />
  }
}
