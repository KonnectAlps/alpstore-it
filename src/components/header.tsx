'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Brand } from './brand'
import { useTheme } from './theme'
import { NAV, SITE } from '@/content/site'

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

function isActive(pathname: string, href: string) {
  const a = norm(pathname)
  const b = norm(href)
  return a === b || (b !== '/' && a.startsWith(b + '/'))
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'light' ? 'Passa al tema chiaro' : 'Passa al tema scuro'
  return (
    <button type="button" className="icon-btn" onClick={() => setTheme(next)} aria-label={label} title={label}>
      {next === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export function Header() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [openedAt, setOpenedAt] = useState(pathname)

  // Il menu si chiude quando cambia pagina.
  if (open && openedAt !== pathname) {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Brand />
        <nav className="nav" aria-label="Principale">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="bar-right">
          <ThemeToggle />
          <a className="btn btn-s btn-sm hide-md" href={SITE.areaClienti}>
            Area clienti
          </a>
          <Link className="btn btn-p btn-sm" href="/sim-iot/#configura">
            Richiedi offerta
          </Link>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => {
              setOpenedAt(pathname)
              setOpen((o) => !o)
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-nav" className="mobile-nav" data-open={open} inert={!open}>
        <nav className="wrap" aria-label="Menu mobile">
          <Link className="m" href="/" aria-current={norm(pathname) === '/' ? 'page' : undefined}>
            Home <span>/</span>
          </Link>
          {NAV.map((n, i) => (
            <Link key={n.href} className="m" href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
              {n.label} <span>0{i + 1}</span>
            </Link>
          ))}
          <Link className="m" href="/contatti/" aria-current={isActive(pathname, '/contatti/') ? 'page' : undefined}>
            Contatti <span>0{NAV.length + 1}</span>
          </Link>
          <div className="ctas">
            <Link className="btn btn-p" href="/sim-iot/#configura">
              Richiedi offerta <span className="arr">&gt;</span>
            </Link>
            <a className="btn btn-s" href={SITE.areaClienti}>
              Area clienti
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
