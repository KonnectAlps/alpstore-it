'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { COVERAGE_CENTER, DEMO_PLACES, type DemoPlace, type Level } from '@/content/coverage'
import { SITE } from '@/content/site'
import { buildMailto } from '@/lib/contact'
import { LazyMap } from './map-lazy'

const PCT: Record<Level, number> = { ottima: 92, buona: 68, 'da verificare': 30 }
const TONE: Record<Level, string> = { ottima: 'l', buona: '', 'da verificare': 'w' }

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
}

function find(q: string): DemoPlace | null {
  const n = normalize(q)
  if (!n.trim()) return null
  return [...DEMO_PLACES].sort((a, b) => b.name.length - a.name.length).find((p) => n.includes(normalize(p.name))) ?? null
}

export function CoverageCheck() {
  const [q, setQ] = useState('')
  const [place, setPlace] = useState<DemoPlace | null>(null)
  const [asked, setAsked] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setAsked(q.trim() || null)
    setPlace(find(q))
  }

  const markers = useMemo(
    () =>
      place
        ? [{ lat: place.lat, lon: place.lon, label: `${place.name} · esempio`, tone: 'live' as const, radius: 9 }]
        : DEMO_PLACES.map((p) => ({ lat: p.lat, lon: p.lon, label: p.name, tone: 'mint' as const, radius: 5 })),
    [place],
  )
  const center = useMemo(() => ({ ...COVERAGE_CENTER }), [])

  const verifyMail = buildMailto({
    kind: 'copertura',
    subject: 'Verifica copertura SIM IoT da alpstore.it',
    intro: 'vorrei verificare la copertura per questo indirizzo:',
    fields: [
      ['Indirizzo o coordinate', asked ?? ''],
      ['Tecnologia di interesse (4G, NB-IoT, 5G Unlimited)', ''],
      ['Uso previsto', ''],
      ['Azienda e partita IVA', ''],
      ['Telefono', ''],
    ],
  })

  return (
    <div className="cov">
      <div className="panel stack" style={{ padding: 24 }}>
        <form className="stack" style={{ gap: 10 }} onSubmit={onSubmit} role="search" aria-label="Verifica copertura dimostrativa">
          <label className="field" htmlFor="cov-q">
            <span className="lbl" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.16em', color: 'var(--dim)' }}>
              INDIRIZZO, COMUNE O COORDINATE
            </span>
          </label>
          <div className="cov-form">
            <input
              id="cov-q"
              className="input"
              list="cov-places"
              placeholder="Es. Via Praga 5, Trento"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            <datalist id="cov-places">
              {DEMO_PLACES.map((p) => (
                <option key={p.name} value={p.name} />
              ))}
            </datalist>
            <button className="btn btn-p" type="submit">
              Verifica <span className="arr">&gt;</span>
            </button>
          </div>
        </form>

        <div aria-live="polite" className="stack" style={{ gap: 12 }}>
          {asked === null ? (
            <p className="small">Scrivi l’indirizzo dell’impianto o del sito. Questa è una demo con alcuni comuni d’esempio: prova con Trento, Bolzano o Cavalese.</p>
          ) : place ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <b>{place.name}</b>
                <span className="pill warn">● Esempio dimostrativo</span>
              </div>
              <div className="res">
                {(['5G', '4G', 'NB-IoT'] as const).map((t) => (
                  <div key={t}>
                    <span className="tech">{t}</span>
                    <span className="meter"><span className={TONE[place.r[t]]} style={{ width: `${PCT[place.r[t]]}%` }} /></span>
                    <span className={`mono ${place.r[t] === 'da verificare' ? 'warn' : place.r[t] === 'ottima' ? 'live' : ''}`} style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      {place.r[t]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="status" style={{ borderColor: 'var(--warn-line)', background: 'transparent' }}>
              <b className="warn">NON NELLA DEMO</b> “{asked}” non è tra i comuni d’esempio. Chiedici la verifica: la facciamo noi sull’indirizzo esatto.
            </p>
          )}
          <p className="placeholder-box" style={{ color: 'var(--muted)' }}>
            Risultati d’esempio, non misure reali. La verifica completa sull’indirizzo esatto è nell’<a href={SITE.areaClienti}>area clienti/partner</a>, oppure la facciamo noi su richiesta. In quota o in zone isolate proponiamo una prova con SIM di test.
          </p>
          <div className="ctas">
            <a className="btn btn-s" href={verifyMail}>
              Chiedi la verifica
            </a>
            <a className="btn btn-s" href={SITE.areaClienti}>
              Area clienti/partner
            </a>
          </div>
        </div>
      </div>
      <LazyMap
        height={520}
        markers={markers}
        center={center}
        fit={!!place}
        label={place ? `Mappa: ${place.name}, risultato d'esempio` : 'Mappa dei comuni disponibili nella demo'}
        legend={
          <>
            <span><i className="dot mint" /> Comuni demo</span>
            <span><i className="dot" /> Risultato</span>
          </>
        }
      />
    </div>
  )
}
