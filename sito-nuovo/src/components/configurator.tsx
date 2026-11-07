'use client'

import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_CONFIG, GROUPS, USE_CASES, type ConfigState, type Group } from '@/content/sim'
import { SITE } from '@/content/site'
import { buildMailto, type ContactRequest } from '@/lib/contact'

const IP_CODE: Record<string, string> = { cgn: 'CGNAT', priv: 'IP-PRIV', pub: 'IP-PUB' }
const HEAVY = ['100', '200', '300', '500', '1000']

const opt = (k: Group['key'], v: string) => GROUPS.find((g) => g.key === k)!.options.find((o) => o.value === v)!
const clampQty = (n: number) => (Number.isFinite(n) && n >= 1 ? Math.min(10000, Math.floor(n)) : 1)

function readCaso(): { config: ConfigState; use: string | null } {
  if (typeof window === 'undefined') return { config: DEFAULT_CONFIG, use: null }
  const id = new URLSearchParams(window.location.search).get('caso')
  const u = USE_CASES.find((c) => c.id === id)
  return u ? { config: { ...u.config }, use: u.id } : { config: DEFAULT_CONFIG, use: null }
}

export function Configurator() {
  const [state, setState] = useState<ConfigState>(DEFAULT_CONFIG)
  const [use, setUse] = useState<string | null>(null)
  const [qtyText, setQtyText] = useState(String(DEFAULT_CONFIG.qty))
  const [ready, setReady] = useState(false)

  // Partenza da un caso passato nel link (?caso=cam). Letto una volta dopo il montaggio.
  useEffect(() => {
    const { config, use: u } = readCaso()
    const id = window.requestAnimationFrame(() => {
      if (u) {
        setState(config)
        setUse(u)
        setQtyText(String(config.qty))
      }
      setReady(true)
    })
    return () => window.cancelAnimationFrame(id)
  }, [])

  const pick = (k: Group['key'], v: string) => {
    setState((s) => ({ ...s, [k]: v }))
    setUse(null)
  }
  const setQty = (n: number) => {
    const q = clampQty(n)
    setState((s) => ({ ...s, qty: q }))
    setQtyText(String(q))
  }
  const applyUse = (id: string) => {
    const u = USE_CASES.find((c) => c.id === id)!
    setState({ ...u.config })
    setQtyText(String(u.config.qty))
    setUse(id)
  }

  const code = `KA-IOT · ${opt('form', state.form).label} · ${opt('net', state.net).label} · ${opt('gb', state.gb).label} · ${IP_CODE[state.ip]} · ${state.mg === 'ka' ? 'MANAGED' : 'SELF'} · ×${state.qty}`

  const mailto = useMemo(() => {
    const useLabel = USE_CASES.find((u) => u.id === use)?.label
    const req: ContactRequest = {
      kind: 'offerta-sim',
      subject: 'Richiesta offerta SIM IoT da alpstore.it',
      intro: 'vorrei un’offerta per SIM IoT con questa configurazione:',
      fields: [
        ['Codice', code],
        ['Formato', opt('form', state.form).label],
        ['Rete', opt('net', state.net).label],
        ['Indirizzo IP', opt('ip', state.ip).label],
        ['Traffico al mese', opt('gb', state.gb).label],
        ['Gestione', opt('mg', state.mg).label],
        ['Numero di SIM', String(state.qty)],
        ['Utilizzo previsto', useLabel ?? ''],
        ['Azienda o ente', ''],
        ['Partita IVA', ''],
        ['Telefono', ''],
      ],
      message: 'Note sul progetto:',
    }
    return buildMailto(req)
  }, [code, state, use])

  const hint = (g: Group) => {
    if (g.key === 'gb' && state.net === 'nb' && HEAVY.includes(state.gb)) return { text: 'Con NB-IoT bastano pochi MB: valuta 500 MB o 1 GB.', warn: true }
    if (g.key === 'ip' && state.ip === 'pub' && state.mg === 'self') return { text: 'Con IP pubblico in autonomia, ricordati le regole firewall sul dispositivo.', warn: true }
    return { text: opt(g.key, state[g.key]).hint ?? '', warn: false }
  }

  return (
    <div data-ready={ready}>
      <div className="uses" role="group" aria-label="Partenze rapide">
        <span className="lbl">PARTI DA UN CASO:</span>
        {USE_CASES.map((u) => (
          <button key={u.id} type="button" aria-pressed={use === u.id} onClick={() => applyUse(u.id)}>
            {u.label}
          </button>
        ))}
      </div>
      <form className="cfg" onSubmit={(e) => e.preventDefault()} aria-label="Configuratore SIM IoT">
        <div className="groups">
          {GROUPS.map((g) => {
            const h = hint(g)
            return (
              <fieldset key={g.key}>
                <legend>{g.legend}</legend>
                <div className="opts">
                  {g.options.map((o) => {
                    const id = `o-${g.key}-${o.value}`.replace('.', '_')
                    return (
                      <label className="opt" key={o.value} htmlFor={id}>
                        <input type="radio" id={id} name={g.key} value={o.value} checked={state[g.key] === o.value} onChange={() => pick(g.key, o.value)} />
                        <span>{o.label}</span>
                      </label>
                    )
                  })}
                </div>
                <p className={`hint${h.warn ? ' warn' : ''}`} aria-live="polite">
                  {h.text}
                </p>
                {g.note ? <p className="hint">{g.note}</p> : null}
              </fieldset>
            )
          })}
          <fieldset>
            <legend>Quante SIM</legend>
            <div className="qty">
              <button type="button" aria-label="Una SIM in meno" onClick={() => setQty(state.qty - 1)}>
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={10000}
                value={qtyText}
                aria-label="Numero di SIM"
                onChange={(e) => {
                  setQtyText(e.target.value)
                  const n = parseInt(e.target.value, 10)
                  if (n >= 1) setState((s) => ({ ...s, qty: clampQty(n) }))
                }}
                onBlur={() => setQty(parseInt(qtyText, 10))}
              />
              <button type="button" aria-label="Una SIM in più" onClick={() => setQty(state.qty + 1)}>
                +
              </button>
            </div>
          </fieldset>
        </div>
        <aside className="sum" aria-label="Riepilogo configurazione">
          <span className="over" style={{ fontSize: 11 }}>La tua configurazione</span>
          <div className="cfg-code" aria-live="polite">{code}</div>
          <dl className="rows">
            {GROUPS.map((g) => (
              <div key={g.key}>
                <dt>{g.label}</dt>
                <dd>{opt(g.key, state[g.key]).label}</dd>
              </div>
            ))}
            <div>
              <dt>SIM</dt>
              <dd>{state.qty}</dd>
            </div>
          </dl>
          <div className="price-row">
            <span>CANONE</span>
            <b>Su offerta</b>
          </div>
          <a className="btn btn-p" href={mailto}>
            Richiedi l’offerta <span className="arr">&gt;</span>
          </a>
          <a className="btn btn-s" href={SITE.prenota} target="_blank" rel="noopener noreferrer">
            Prenota una chiamata
          </a>
          <p className="small">Si apre la tua mail con la configurazione già scritta. Sempre inclusi: area clienti, avviso all’80%, allarme se la macchina tace. Riservato a imprese ed enti con partita IVA.</p>
        </aside>
      </form>
    </div>
  )
}
