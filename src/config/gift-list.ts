export type WeddingGift = {
  id: string
  name: string
  amount: number
  description: string
}

// Gift ideas are contributions to the couple's shared fund, not reserved physical items.
export const weddingGiftList: WeddingGift[] = [
  { id: 'coffee-set', name: 'Service à café', amount: 5000, description: 'Une participation pour les petits-déjeuners à deux.' },
  { id: 'photo-album', name: 'Album photo', amount: 7500, description: 'Pour conserver les souvenirs de notre nouvelle vie.' },
  { id: 'bed-linen', name: 'Linge de lit', amount: 10000, description: 'Une contribution pour notre chambre.' },
  { id: 'kitchen-utensils', name: 'Ustensiles de cuisine', amount: 12500, description: 'Pour préparer de bons repas à la maison.' },
  { id: 'table-lamp', name: 'Lampe de chevet', amount: 15000, description: 'Une touche chaleureuse pour notre foyer.' },
  { id: 'dinnerware', name: 'Service de table', amount: 17500, description: 'Pour recevoir famille et amis.' },
  { id: 'curtains', name: 'Rideaux', amount: 20000, description: 'Une participation pour aménager notre intérieur.' },
  { id: 'electric-kettle', name: 'Bouilloire électrique', amount: 22500, description: 'Un indispensable du quotidien.' },
  { id: 'blender', name: 'Mixeur', amount: 25000, description: 'Pour notre cuisine à deux.' },
  { id: 'cookware', name: 'Batterie de cuisine', amount: 27500, description: 'Une contribution pour cuisiner ensemble.' },
  { id: 'standing-fan', name: 'Ventilateur', amount: 30000, description: 'Pour rendre notre maison plus confortable.' },
  { id: 'microwave', name: 'Four à micro-ondes', amount: 35000, description: 'Un coup de pouce pour équiper notre cuisine.' },
  { id: 'sofa-fund', name: 'Participation au canapé', amount: 40000, description: 'Pour aménager notre salon.' },
  { id: 'washing-machine', name: 'Participation au lave-linge', amount: 45000, description: 'Pour faciliter le quotidien à la maison.' },
  { id: 'dining-table', name: 'Participation à la table à manger', amount: 50000, description: 'Pour partager de beaux repas.' },
  { id: 'fridge-fund', name: 'Participation au réfrigérateur', amount: 60000, description: 'Pour équiper notre foyer.' },
  { id: 'home-project', name: 'Projet pour notre foyer', amount: 75000, description: 'Une contribution à un projet commun.' },
  { id: 'honeymoon-luggage', name: 'Bagages de voyage', amount: 85000, description: 'Pour préparer notre voyage de noces.' },
  { id: 'honeymoon-night', name: 'Nuit de voyage de noces', amount: 100000, description: 'Une participation à notre escapade à deux.' },
  { id: 'honeymoon-fund', name: 'Voyage de noces', amount: 150000, description: 'Une contribution spéciale à notre voyage.' },
]
