'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import type { LeafletMapProps } from './leaflet-map'

const Map = dynamic(() => import('./leaflet-map').then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => <div className="map-skel">CARICAMENTO MAPPA…</div>,
})

/** Mappa con spazio riservato (nessun salto della pagina) e legenda opzionale. */
export function LazyMap({ height = 420, legend, ...props }: LeafletMapProps & { height?: number; legend?: ReactNode }) {
  return (
    <div className="map-box" style={{ height }}>
      <Map {...props} />
      {legend ? <div className="map-legend" aria-hidden="true">{legend}</div> : null}
    </div>
  )
}
