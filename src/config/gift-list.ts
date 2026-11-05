export type WeddingGift = {
  id: string
  name: string
  amount: number | null
  minAmount?: number
  maxAmount?: number
}

// Cadeaux à prix fixe ou à fourchette, selon le choix proposé aux invités.
export const weddingGiftList: WeddingGift[] = [
  { id: 'dish-towels', name: 'Lot de torchons de cuisine', amount: 2000 },
  { id: 'spatula-set', name: 'Lot de spatules et ustensiles', amount: 3000 },
  { id: 'storage-boxes', name: 'Boîtes de conservation', amount: 4000 },
  { id: 'kitchen-mat', name: 'Tapis de cuisine', amount: 5000 },
  { id: 'coffee-set', name: 'Service à café', amount: 5000 },
  { id: 'one-pillow', name: 'Un oreiller', amount: 2500 },
  { id: 'pair-of-pillows', name: 'Une paire d’oreillers', amount: 5000 },
  { id: 'electric-kettle', name: 'Bouilloire électrique', amount: 10000 },
  { id: 'pair-of-sheets', name: 'Une paire de draps', amount: 10000 },
  { id: 'bed-sheet', name: 'Un drap', amount: 5000 },
  { id: 'photo-frame', name: 'Joli cadre photo pour le couple', amount: 15000 },
  { id: 'glasses-dozen', name: 'Une douzaine de verres', amount: null, minAmount: 7500, maxAmount: 10000 },
  { id: 'glasses-two-dozen', name: 'Deux douzaines de verres', amount: null, minAmount: 15000, maxAmount: 20000 },
  { id: 'couple-watches', name: 'Deux montres pour le couple', amount: 20000 },
  { id: 'one-watch', name: 'Une montre', amount: 10000 },
  { id: 'natural-juice-extractor', name: 'Extracteur de jus naturel', amount: 20000 },
  { id: 'curtains', name: 'Jolis rideaux', amount: null, minAmount: 20000, maxAmount: 25000 },
  { id: 'ironing-board', name: 'Table à repasser', amount: 25000 },
  { id: 'plates-set', name: 'Un ensemble d’assiettes', amount: 15000 },
  { id: 'two-plates-sets', name: 'Deux ensembles d’assiettes', amount: 30000 },
  { id: 'salad-bowl', name: 'Saladier', amount: null, minAmount: 4500, maxAmount: 7500 },
  { id: 'pots', name: 'Jeu de marmites', amount: null, minAmount: 35000, maxAmount: 45000 },
  { id: 'dishes-cutlery-dozen', name: 'Une douzaine de plats avec fourchettes, cuillères et couteaux', amount: 20000 },
  { id: 'dishes-cutlery-two-dozen', name: 'Deux douzaines de plats avec fourchettes, cuillères et couteaux', amount: 40000 },
  { id: 'blender', name: 'Mixeur / blender', amount: null, minAmount: 25000, maxAmount: 40000 },
  { id: 'rice-cooker', name: 'Cuiseur de riz', amount: null, minAmount: 20000, maxAmount: 35000 },
  { id: 'air-conditioner', name: 'Climatiseur 1,25 CV · 9 000 BTU', amount: null, minAmount: 195000, maxAmount: 210000 },
  { id: 'smart-tv', name: 'Smart TV', amount: null, minAmount: 70000, maxAmount: 85000 },
  { id: 'cookstove', name: 'Cuisinière', amount: null, minAmount: 80000, maxAmount: 95000 },
  { id: 'honeymoon-kribi', name: 'Voyage de noces à Kribi', amount: null, minAmount: 100000, maxAmount: 115000 },
  { id: 'om-choice', name: 'Dépôt OM · montant au choix', amount: null },
]
