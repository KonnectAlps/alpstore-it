'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Fa comparire gli elementi .reveal quando entrano nello schermo. Senza JS restano visibili. */
export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    // In stampa tutto visibile.
    const showAll = () => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
    window.addEventListener('beforeprint', showAll)
    return () => {
      io.disconnect()
      window.removeEventListener('beforeprint', showAll)
    }
  }, [pathname])
  return null
}
