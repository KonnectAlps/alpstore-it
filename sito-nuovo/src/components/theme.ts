'use client'

import { useSyncExternalStore } from 'react'

import { THEME_KEY, type Theme } from '@/lib/theme-script'

function read(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
  const set = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem(THEME_KEY, t)
    } catch {
      /* archiviazione non disponibile: il tema vale solo per questa pagina */
    }
  }
  return [theme, set]
}
