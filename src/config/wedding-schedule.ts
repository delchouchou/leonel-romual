export type WeddingEvent = {
  day: string
  date: string
  time: string
  title: string
  place: string
  map?: string
}

// Le vin d’honneur précède le mariage religieux.
export const weddingSchedule: WeddingEvent[] = [
  { day: 'Jeudi', date: '17 décembre 2026', time: '18h00', title: 'Mariage traditionnel · Dot', place: 'Maison familiale (entrée du Semil) · Nkongsamba' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '10h00', title: 'Cérémonie civile', place: 'Mairie de Nkongsamba 2ème', map: 'Mairie de Nkongsamba 2ème, Nkongsamba, Cameroun' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '12h00', title: 'Vin d’honneur', place: 'Maison familiale (entrée du Semil) · Nkongsamba' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '14h00', title: 'Mariage religieux', place: 'Paroisse du Grand Temple · Nkongsamba', map: 'EEC Grand Temple de Nkongsamba, Nkongsamba, Cameroun' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '19h30', title: 'Soirée & réception', place: "SAM’S HÔTEL · Nkongsamba", map: 'SAM’S Hôtel, Nkongsamba, Cameroun' },
]
