export type Guest = { name: string; places: number; code: string }

// Noms fictifs pour répéter le parcours sans base de données.
// Remplacer cette liste par la vraie liste avant le mariage.
export const guests: Guest[] = [
  { name: 'Aline Fotso', places: 1, code: 'aline-fotso-2026' },
  { name: 'Brice Nguema', places: 1, code: 'brice-nguema-2026' },
  { name: 'Clarisse Mbarga', places: 2, code: 'clarisse-mbarga-2026' },
  { name: 'David Kamga', places: 1, code: 'david-kamga-2026' },
  { name: 'Estelle Njoya', places: 1, code: 'estelle-njoya-2026' },
  { name: 'Fabrice Tchoumi', places: 2, code: 'fabrice-tchoumi-2026' },
  { name: 'Gisèle Mballa', places: 1, code: 'gisele-mballa-2026' },
  { name: 'Hervé Talla', places: 1, code: 'herve-talla-2026' },
  { name: 'Ingrid Ewane', places: 2, code: 'ingrid-ewane-2026' },
  { name: 'Jean Moukouri', places: 1, code: 'jean-moukouri-2026' },
  { name: 'Karine Ndom', places: 1, code: 'karine-ndom-2026' },
  { name: 'Lionel Kouam', places: 2, code: 'lionel-kouam-2026' },
  { name: 'Mireille Fomo', places: 1, code: 'mireille-fomo-2026' },
  { name: 'Nicolas Biloa', places: 1, code: 'nicolas-biloa-2026' },
  { name: 'Olivia Nguini', places: 2, code: 'olivia-nguini-2026' },
  { name: 'Patrick Mvondo', places: 1, code: 'patrick-mvondo-2026' },
  { name: 'Rachel Simo', places: 1, code: 'rachel-simo-2026' },
  { name: 'Samuel Kengne', places: 2, code: 'samuel-kengne-2026' },
  { name: 'Véronique Essomba', places: 1, code: 'veronique-essomba-2026' },
  { name: 'Yannick Mba', places: 1, code: 'yannick-mba-2026' },
]

export const normalizeGuestName = (name: string): string =>
  name.trim().replace(/\s+/g, ' ').toLocaleLowerCase('fr-FR')
