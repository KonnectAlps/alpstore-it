'use client'

/**
 * Mappa Leaflet con basemap CARTO (Positron in chiaro, Dark Matter in scuro) su dati OpenStreetMap.
 * Caricata solo lato client e solo nelle pagine che la usano. Se le tessere non arrivano restano i punti.
 */
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { useTheme } from './theme'

export interface MapMarker {
  lat: number
  lon: number
  label: string
  tone?: 'live' | 'warn' | 'mint'
  radius?: number
}

export interface LeafletMapProps {
  markers: MapMarker[]
  center?: { lat: number; lon: number; zoom: number }
  /** Se vero adatta la vista ai punti. */
  fit?: boolean
  label: string
}

export function LeafletMap({ markers, center, fit = true, label }: LeafletMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [theme] = useTheme()

  useEffect(() => {
    let disposed = false
    let map: import('leaflet').Map | null = null
    void import('leaflet').then((L) => {
      if (disposed || !ref.current) return
      map = L.map(ref.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false })
      const style = theme === 'dark' ? 'dark_all' : 'light_all'
      L.tileLayer(`https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`, {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map)
      map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>')
      const css = getComputedStyle(document.documentElement)
      const color = (t: MapMarker['tone']) => css.getPropertyValue(t === 'warn' ? '--warn' : t === 'mint' ? '--mint' : '--live').trim()
      for (const m of markers) {
        const c = color(m.tone)
        L.circleMarker([m.lat, m.lon], { radius: m.radius ?? 7, color: c, weight: 2, fillColor: c, fillOpacity: 0.85 })
          .bindTooltip(m.label, { direction: 'top', offset: [0, -6] })
          .addTo(map)
      }
      if (fit && markers.length > 1) map.fitBounds(L.latLngBounds(markers.map((m) => [m.lat, m.lon] as [number, number])).pad(0.25), { maxZoom: 14 })
      else if (fit && markers.length === 1) map.setView([markers[0].lat, markers[0].lon], 12)
      else if (center) map.setView([center.lat, center.lon], center.zoom)
    })
    return () => {
      disposed = true
      map?.remove()
    }
  }, [markers, center, fit, theme])

  return <div ref={ref} className="map" role="img" aria-label={label} />
}
