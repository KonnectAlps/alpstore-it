/**
 * Invio delle richieste dei moduli (offerta SIM, progetto, partner, contatto, copertura).
 *
 * Oggi: si apre la mail dell'utente con il testo già scritto, indirizzata a commerciale@konnectalps.it.
 * Domani: impostare CONTACT_ENDPOINT con l'URL di un servizio (API propria, Formspree, ecc.)
 * e la stessa funzione invierà la richiesta in POST JSON, senza toccare i moduli.
 */
import { COMPANY } from '@/content/site'

export type RequestKind = 'offerta-sim' | 'progetto' | 'partner' | 'contatto' | 'copertura'

export interface ContactRequest {
  kind: RequestKind
  subject: string
  /** Righe "Etichetta: valore", nell'ordine in cui appaiono nella mail. */
  fields: [label: string, value: string][]
  /** Testo libero in fondo alla mail. */
  message?: string
  /** Frase di apertura. */
  intro?: string
}

/** URL del servizio che riceverà le richieste. `null` = si usa la mail. */
export const CONTACT_ENDPOINT: string | null = null

export const CONTACT_EMAIL = COMPANY.email

export function buildBody(req: ContactRequest): string {
  const lines = [
    'Buongiorno,',
    req.intro ?? 'vi scrivo da alpstore.it.',
    '',
    ...req.fields.map(([k, v]) => `- ${k}: ${v || ''}`),
  ]
  if (req.message !== undefined) lines.push('', req.message)
  lines.push('', 'Grazie.', '')
  return lines.join('\n')
}

export function buildMailto(req: ContactRequest): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(req.subject)}&body=${encodeURIComponent(buildBody(req))}`
}

export type SendResult = { ok: true; via: 'mailto' | 'endpoint' } | { ok: false; error: string }

/** Invia la richiesta. Con la mail apre il client di posta dell'utente. */
export async function sendRequest(req: ContactRequest): Promise<SendResult> {
  if (CONTACT_ENDPOINT) {
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req, page: window.location.pathname }),
      })
      return res.ok ? { ok: true, via: 'endpoint' } : { ok: false, error: `Errore ${res.status}` }
    } catch {
      return { ok: false, error: 'Rete non raggiungibile' }
    }
  }
  window.location.href = buildMailto(req)
  return { ok: true, via: 'mailto' }
}
