export type WeddingGift = {
  id: string
  name: string
  amount: number
  description: string
}

// Gift ideas are contributions to the couple's shared fund, not reserved physical items.
export const weddingGiftList: WeddingGift[] = [
  { id: 'coffee-set', name: 'Service à café', amount: 5000, description: 'Pour partager un café dans notre nouveau foyer.' },
  { id: 'photo-album', name: 'Album photo', amount: 7500, description: 'Pour conserver les souvenirs de notre nouvelle vie.' },
  { id: 'bed-linen', name: 'Linge de lit', amount: 10000, description: 'Pour notre chambre.' },
  { id: 'kitchen-utensils', name: 'Ustensiles de cuisine', amount: 12500, description: 'Pour préparer de bons repas chez nous.' },
  { id: 'table-lamp', name: 'Lampe de chevet', amount: 15000, description: 'Une touche chaleureuse pour notre foyer.' },
  { id: 'dinnerware', name: 'Service de table', amount: 17500, description: 'Pour recevoir notre famille et nos amis.' },
  { id: 'curtains', name: 'Rideaux', amount: 20000, description: 'Pour habiller les fenêtres de notre maison.' },
  { id: 'electric-kettle', name: 'Bouilloire électrique', amount: 22500, description: 'Un indispensable pour nos petits-déjeuners.' },
  { id: 'blender', name: 'Mixeur', amount: 25000, description: 'Pour préparer nos recettes préférées.' },
  { id: 'cookware', name: 'Batterie de cuisine', amount: 27500, description: 'Pour cuisiner ensemble à la maison.' },
  { id: 'standing-fan', name: 'Ventilateur', amount: 30000, description: 'Pour rendre notre maison plus confortable.' },
  { id: 'microwave', name: 'Four à micro-ondes', amount: 35000, description: 'Un coup de pouce pour équiper notre cuisine.' },
  { id: 'sofa-fund', name: 'Canapé pour le salon', amount: 40000, description: 'Pour nos moments de détente à la maison.' },
  { id: 'washing-machine', name: 'Lave-linge', amount: 45000, description: 'Pour notre quotidien à deux.' },
  { id: 'dining-table', name: 'Table à manger', amount: 50000, description: 'Pour partager de beaux repas.' },
  { id: 'fridge-fund', name: 'Réfrigérateur', amount: 60000, description: 'Pour conserver nos repas et provisions.' },
  { id: 'home-project', name: 'Meuble de rangement', amount: 75000, description: 'Pour organiser notre nouveau foyer.' },
  { id: 'honeymoon-luggage', name: 'Bagages de voyage', amount: 85000, description: 'Pour emporter nos affaires en voyage.' },
  { id: 'honeymoon-night', name: 'Nuit de voyage de noces', amount: 100000, description: 'Pour une escapade à deux.' },
  { id: 'honeymoon-fund', name: 'Voyage de noces', amount: 150000, description: 'Pour notre première aventure de jeunes mariés.' },
]
