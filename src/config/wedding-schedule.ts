export type WeddingEvent = {
  day: string
  date: string
  time: string
  title: string
  place: string
  map?: string
}

// Horaires provisoires : les mettre à jour ici dès confirmation des familles.
export const weddingSchedule: WeddingEvent[] = [
  { day: 'Jeudi', date: '17 décembre 2026', time: '10h00', title: 'Mariage traditionnel · Dote', place: 'Lieu à préciser' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '09h00', title: 'Cérémonie civile', place: 'Mairie de Nkongsamba 2ème', map: 'Mairie de Nkongsamba 2ème, Ekangté-Mbeng, Nkongsamba, Cameroun' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '11h00', title: 'Cérémonie religieuse', place: 'EEC Grand Temple de Nkongsamba', map: 'EEC Grand Temple de Nkongsamba, Cameroun' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '13h30', title: 'Vin d’honneur', place: "SAM’S HÔTEL · Nkongsamba", map: '4.9678142,9.9354132' },
  { day: 'Vendredi', date: '18 décembre 2026', time: '19h00', title: 'Soirée & réception', place: "SAM’S HÔTEL · Nkongsamba", map: '4.9678142,9.9354132' },
]
