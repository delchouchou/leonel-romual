export type WeddingGift = {
  id: string
  name: string
  imageIndex: number
  amount: number | null
  minAmount?: number
  maxAmount?: number
}

// Une seule fiche par idée de cadeau ; les fourchettes restent modifiables.
export const weddingGiftList: WeddingGift[] = [
  { id: 'dish-towels', name: 'Torchons de cuisine', imageIndex: 0, amount: 5000 },
  { id: 'spatula-set', name: 'Set de spatules, cuillères et couteaux de cuisine', imageIndex: 1, amount: 22500 },
  { id: 'storage-boxes', name: 'Boîtes de conservation', imageIndex: 2, amount: 4000 },
  { id: 'kitchen-mat', name: 'Tapis de cuisine', imageIndex: 3, amount: 5000 },
  { id: 'coffee-set', name: 'Service à café', imageIndex: 4, amount: 5000 },
  { id: 'bath-towel-set', name: 'Parure de serviettes de bain', imageIndex: 5, amount: null, minAmount: 10000, maxAmount: 20000 },
  { id: 'travel-luggage', name: 'Valises de voyage', imageIndex: 6, amount: null, minAmount: 30000, maxAmount: 45000 },
  { id: 'electric-kettle', name: 'Bouilloire électrique', imageIndex: 7, amount: 10000 },
  { id: 'bedding-set', name: 'Parure de lit complète avec couette', imageIndex: 8, amount: null, minAmount: 50000, maxAmount: 60000 },
  { id: 'photo-frame', name: 'Grand portrait encadré du couple', imageIndex: 9, amount: 35000 },
  { id: 'glassware-set', name: 'Service de verres : eau, vins, champagne et whisky', imageIndex: 10, amount: null, minAmount: 15000, maxAmount: 20000 },
  { id: 'couple-watches', name: 'Montres assorties pour le couple', imageIndex: 11, amount: 20000 },
  { id: 'natural-juice-extractor', name: 'Extracteur de jus naturel', imageIndex: 12, amount: 20000 },
  { id: 'curtains', name: 'Rideaux élégants pour le salon', imageIndex: 13, amount: null, minAmount: 20000, maxAmount: 25000 },
  { id: 'ironing-board', name: 'Table à repasser avec fer', imageIndex: 14, amount: 25000 },
  { id: 'soup-tureens', name: 'Jeu de soupières assorties', imageIndex: 15, amount: null, minAmount: 20000, maxAmount: 35000 },
  { id: 'salad-bowl-set', name: 'Jeu de saladiers en verre, du grand au petit', imageIndex: 16, amount: null, minAmount: 10000, maxAmount: 20000 },
  { id: 'pots', name: 'Jeu de marmites', imageIndex: 17, amount: null, minAmount: 35000, maxAmount: 45000 },
  { id: 'serving-dishes', name: 'Service de table en porcelaine', imageIndex: 18, amount: null, minAmount: 30000, maxAmount: 45000 },
  { id: 'blender', name: 'Mixeur avec bol et moulin pour ingrédients secs', imageIndex: 19, amount: null, minAmount: 25000, maxAmount: 40000 },
  { id: 'rice-cooker', name: 'Cuiseur de riz', imageIndex: 20, amount: null, minAmount: 20000, maxAmount: 35000 },
  { id: 'air-conditioner', name: 'Climatiseur 1,25 CV · 9 000 BTU', imageIndex: 21, amount: null, minAmount: 195000, maxAmount: 210000 },
  { id: 'smart-tv', name: 'Smart TV', imageIndex: 22, amount: null, minAmount: 70000, maxAmount: 85000 },
  { id: 'cookstove', name: 'Cuisinière', imageIndex: 23, amount: null, minAmount: 80000, maxAmount: 95000 },
  { id: 'honeymoon-kribi', name: 'Voyage de noces à Kribi', imageIndex: 24, amount: null, minAmount: 100000, maxAmount: 115000 },
  { id: 'om-choice', name: 'Dépôt OM · montant au choix', imageIndex: 25, amount: null },
  { id: 'table-runners', name: 'Chemin de table, napperons et accessoires assortis', imageIndex: 26, amount: null, minAmount: 20000, maxAmount: 35000 },
  { id: 'electric-chopper', name: 'Hachoir électrique multifonction', imageIndex: 27, amount: null, minAmount: 20000, maxAmount: 35000 },
  { id: 'bedside-lamps', name: 'Paire de lampes de chevet', imageIndex: 28, amount: 15000 },
  { id: 'steam-iron', name: 'Fer à repasser vapeur', imageIndex: 29, amount: 15000 },
]
