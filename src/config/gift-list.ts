export type WeddingGift = {
  id: string
  name: string
  amount: number | null
  minAmount?: number
  maxAmount?: number
  description: string
}

// Les cadeaux à prix fixe ont un montant unique ; les cadeaux avec fourchette
// laissent l’invité choisir un montant dans les limites indiquées.
export const weddingGiftList: WeddingGift[] = [
  { id: 'dish-towels', name: 'Lot de torchons de cuisine', amount: 2000, description: 'Un petit indispensable pour la cuisine.' },
  { id: 'spatula-set', name: 'Lot de spatules et ustensiles', amount: 3000, description: 'Pour préparer les repas du quotidien.' },
  { id: 'storage-boxes', name: 'Boîtes de conservation', amount: 4000, description: 'Pour ranger et conserver les aliments.' },
  { id: 'kitchen-mat', name: 'Tapis de cuisine', amount: 5000, description: 'Une touche pratique pour notre cuisine.' },
  { id: 'coffee-set', name: 'Service à café', amount: 5000, description: 'Pour partager un café dans notre nouveau foyer.' },
  { id: 'bed-pillows', name: 'Paire d’oreillers', amount: 5000, description: 'Pour compléter notre literie.' },
  { id: 'electric-kettle', name: 'Bouilloire électrique', amount: 10000, description: 'Un indispensable pour nos petits-déjeuners.' },
  { id: 'bed-sheets', name: 'Une paire de draps', amount: 10000, description: 'Pour notre chambre.' },
  { id: 'photo-frame', name: 'Joli cadre photo pour le couple', amount: 15000, description: 'Pour garder un beau souvenir de notre union.' },
  { id: 'glasses', name: 'Deux douzaines de verres', amount: null, minAmount: 15000, maxAmount: 20000, description: 'Pour recevoir famille et amis.' },
  { id: 'natural-juice-extractor', name: 'Extracteur de jus naturel', amount: 20000, description: 'Pour préparer des jus frais à la maison.' },
  { id: 'curtains', name: 'Jolis rideaux', amount: null, minAmount: 20000, maxAmount: 25000, description: 'Pour habiller les fenêtres de notre maison.' },
  { id: 'couple-watches', name: 'Deux montres pour le couple', amount: 20000, description: 'Un joli souvenir à porter à deux.' },
  { id: 'ironing-board', name: 'Table à repasser', amount: 25000, description: 'Pour prendre soin de nos vêtements.' },
  { id: 'plates-sets', name: 'Deux ensembles d’assiettes', amount: 30000, description: 'Pour partager de beaux repas.' },
  { id: 'pots', name: 'Jeu de marmites', amount: null, minAmount: 35000, maxAmount: 45000, description: 'Pour cuisiner dans notre nouveau foyer.' },
  { id: 'dishes-cutlery', name: 'Deux douzaines de plats avec fourchettes, cuillères et couteaux', amount: 40000, description: 'Un service complet pour recevoir.' },
  { id: 'smart-tv', name: 'Smart TV', amount: null, minAmount: 70000, maxAmount: 90000, description: 'Pour nos soirées cinéma à la maison.' },
  { id: 'cookstove', name: 'Cuisinière', amount: null, minAmount: 80000, maxAmount: 100000, description: 'Pour équiper notre cuisine.' },
  { id: 'honeymoon-kribi', name: 'Voyage de noces à Kribi', amount: null, minAmount: 100000, maxAmount: 150000, description: 'Pour notre escapade à deux au bord de la mer.' },
  { id: 'om-choice', name: 'Dépôt OM · montant au choix', amount: null, description: 'Choisissez le montant que vous souhaitez envoyer.' },
]
