/**
 * Dati della verifica di copertura DIMOSTRATIVA.
 * Nessuna API esterna: le località sono un elenco fisso e i risultati sono esempi, non misure reali.
 * La verifica vera sarà nell'area clienti/partner.
 */

export type Level = 'ottima' | 'buona' | 'da verificare'

export interface DemoPlace {
  name: string
  lat: number
  lon: number
  /** Risultato d'esempio per tecnologia. */
  r: { '5G': Level; '4G': Level; 'NB-IoT': Level }
}

export const DEMO_PLACES: DemoPlace[] = [
  { name: 'Trento', lat: 46.0679, lon: 11.1211, r: { '5G': 'ottima', '4G': 'ottima', 'NB-IoT': 'ottima' } },
  { name: 'Rovereto', lat: 45.8906, lon: 11.0402, r: { '5G': 'ottima', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Bolzano', lat: 46.4983, lon: 11.3548, r: { '5G': 'ottima', '4G': 'ottima', 'NB-IoT': 'ottima' } },
  { name: 'Merano', lat: 46.6713, lon: 11.1525, r: { '5G': 'buona', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Pergine Valsugana', lat: 46.0631, lon: 11.2383, r: { '5G': 'buona', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Riva del Garda', lat: 45.8858, lon: 10.8418, r: { '5G': 'buona', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Arco', lat: 45.9177, lon: 10.886, r: { '5G': 'buona', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Cles', lat: 46.3637, lon: 11.0346, r: { '5G': 'da verificare', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Cavalese', lat: 46.2913, lon: 11.4596, r: { '5G': 'da verificare', '4G': 'buona', 'NB-IoT': 'buona' } },
  { name: 'Tione di Trento', lat: 46.0355, lon: 10.7262, r: { '5G': 'da verificare', '4G': 'buona', 'NB-IoT': 'da verificare' } },
  { name: 'Borgo Valsugana', lat: 46.0517, lon: 11.4553, r: { '5G': 'da verificare', '4G': 'buona', 'NB-IoT': 'buona' } },
  { name: 'Bressanone', lat: 46.7153, lon: 11.6571, r: { '5G': 'buona', '4G': 'ottima', 'NB-IoT': 'buona' } },
  { name: 'Verona', lat: 45.4384, lon: 10.9916, r: { '5G': 'ottima', '4G': 'ottima', 'NB-IoT': 'ottima' } },
  { name: 'Milano', lat: 45.4642, lon: 9.19, r: { '5G': 'ottima', '4G': 'ottima', 'NB-IoT': 'ottima' } },
]

export const COVERAGE_CENTER = { lat: 46.15, lon: 11.15, zoom: 8 }

/** Dati d'esempio per la mappa della pagina Flotte. */
export const DEMO_FLEET = [
  { name: 'Furgone 04', lat: 46.0712, lon: 11.1268, state: 'in movimento', net: '5G', ok: true },
  { name: 'Furgone 07', lat: 45.8948, lon: 11.0441, state: 'fermo', net: '4G', ok: true },
  { name: 'Escavatore 02', lat: 46.0598, lon: 11.2372, state: 'in cantiere', net: '4G', ok: true },
  { name: 'Autocarro 11', lat: 46.2905, lon: 11.4572, state: 'segnale debole', net: '4G', ok: false },
  { name: 'Furgone 12', lat: 46.4945, lon: 11.3504, state: 'in movimento', net: '5G', ok: true },
]
