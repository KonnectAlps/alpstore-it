'use client'

import Link from 'next/link'
import { useId, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL, sendRequest, type RequestKind } from '@/lib/contact'

export interface FieldDef {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checks'
  required?: boolean
  full?: boolean
  options?: string[]
  placeholder?: string
  autoComplete?: string
  /** Validazione speciale. */
  rule?: 'piva'
}

type Values = Record<string, string | string[]>

function validate(f: FieldDef, v: string | string[] | undefined): string | null {
  const s = Array.isArray(v) ? v.join(', ') : (v ?? '').trim()
  if (f.required && !s) return f.type === 'checks' ? 'Scegli almeno una voce.' : 'Campo obbligatorio.'
  if (!s) return null
  if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'Indirizzo email non valido.'
  if (f.rule === 'piva' && !/^(IT)?\s?\d{11}$/i.test(s.replace(/\s/g, ''))) return 'La partita IVA ha 11 cifre.'
  return null
}

export function RequestForm({
  kind,
  subject,
  intro,
  fields,
  submitLabel = 'Invia la richiesta',
  note = 'Ti risponde un tecnico entro un giorno lavorativo.',
  title,
}: {
  kind: RequestKind
  subject: string
  intro?: string
  fields: FieldDef[]
  submitLabel?: string
  note?: string
  title?: string
}) {
  const uid = useId()
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [consentErr, setConsentErr] = useState(false)
  const [sent, setSent] = useState<null | 'mailto' | 'endpoint'>(null)
  const [fail, setFail] = useState<string | null>(null)

  const set = (name: string, v: string | string[]) => {
    setValues((s) => ({ ...s, [name]: v }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    for (const f of fields) {
      const m = validate(f, values[f.name])
      if (m) errs[f.name] = m
    }
    setErrors(errs)
    setConsentErr(!consent)
    const first = fields.find((f) => errs[f.name])
    if (first || !consent) {
      const id = first ? `${uid}-${first.name}` : `${uid}-consent`
      document.getElementById(id)?.focus()
      return
    }
    const textFields = fields.filter((f) => f.type !== 'textarea')
    const msgField = fields.find((f) => f.type === 'textarea')
    const res = await sendRequest({
      kind,
      subject,
      intro,
      fields: textFields.map((f) => [f.label, Array.isArray(values[f.name]) ? (values[f.name] as string[]).join(', ') : ((values[f.name] as string) ?? '')]),
      message: msgField ? `${msgField.label}:\n${(values[msgField.name] as string) ?? ''}` : undefined,
    })
    if (res.ok) {
      setSent(res.via)
      setFail(null)
    } else setFail(res.error)
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-label={title ?? subject}>
      {title ? <span className="over" style={{ fontSize: 11 }}>{title}</span> : null}
      <div className="form-grid">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`
          const err = errors[f.name]
          const describedBy = err ? `${id}-err` : undefined
          const common = {
            id,
            name: f.name,
            'aria-invalid': err ? true : undefined,
            'aria-describedby': describedBy,
            'aria-required': f.required || undefined,
          }
          return (
            <div className={`field${f.full || f.type === 'textarea' || f.type === 'checks' ? ' full' : ''}`} key={f.name}>
              {f.type === 'checks' ? (
                <fieldset aria-describedby={describedBy}>
                  <legend className="lbl" style={{ marginBottom: 8 }}>
                    {f.label} {f.required ? <span className="req" aria-hidden="true">*</span> : null}
                  </legend>
                  <div className="checks" id={id} tabIndex={-1}>
                    {f.options!.map((o) => {
                      const cur = (values[f.name] as string[]) ?? []
                      const oid = `${id}-${o.replace(/\W+/g, '-')}`
                      return (
                        <label className="check" key={o} htmlFor={oid}>
                          <input
                            id={oid}
                            type="checkbox"
                            checked={cur.includes(o)}
                            onChange={(e) => set(f.name, e.target.checked ? [...cur, o] : cur.filter((x) => x !== o))}
                          />
                          <span>{o}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ) : (
                <>
                  <label htmlFor={id}>
                    {f.label} {f.required ? <span className="req" aria-hidden="true">*</span> : null}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea className="textarea" {...common} placeholder={f.placeholder} value={(values[f.name] as string) ?? ''} onChange={(e) => set(f.name, e.target.value)} />
                  ) : f.type === 'select' ? (
                    <select className="select input" {...common} value={(values[f.name] as string) ?? ''} onChange={(e) => set(f.name, e.target.value)}>
                      <option value="">Scegli…</option>
                      {f.options!.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input"
                      {...common}
                      type={f.type}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      inputMode={f.rule === 'piva' ? 'numeric' : undefined}
                      value={(values[f.name] as string) ?? ''}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  )}
                </>
              )}
              {err ? (
                <span className="err" id={`${id}-err`}>
                  {err}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
      <label className="consent" htmlFor={`${uid}-consent`}>
        <input id={`${uid}-consent`} type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentErr(false) }} aria-invalid={consentErr || undefined} />
        <span>
          Ho letto l’<Link href="/privacy/">informativa privacy</Link>. I dati servono solo a rispondere a questa richiesta.
          {consentErr ? <span className="err" style={{ display: 'block' }}>Serve la conferma per inviare.</span> : null}
        </span>
      </label>
      <div className="form-foot">
        <button type="submit" className="btn btn-p">
          {submitLabel} <span className="arr">&gt;</span>
        </button>
        <span className="small">{note}</span>
      </div>
      <div aria-live="polite">
        {sent ? (
          <p className="status">
            <b>✓ PRONTA</b>{' '}
            {sent === 'mailto' ? (
              <>Si è aperta la tua mail con la richiesta già scritta: controlla e premi invia. Se non si apre, scrivi a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
            ) : (
              <>Richiesta ricevuta. Ti rispondiamo entro un giorno lavorativo.</>
            )}
          </p>
        ) : null}
        {fail ? <p className="err">Invio non riuscito ({fail}). Scrivi a {CONTACT_EMAIL}.</p> : null}
      </div>
    </form>
  )
}
