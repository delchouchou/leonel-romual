import React, { FC, useState } from 'react'

const gifts = [
  { title: 'Un geste pour notre voyage', amount: 10000, detail: 'Une participation à notre voyage de noces.' },
  { title: 'Un coup de cœur pour notre foyer', amount: 25000, detail: 'Une contribution pour aménager notre maison.' },
  { title: 'Un beau cadeau à deux', amount: 50000, detail: 'Une participation à un projet qui nous accompagnera.' },
]

const formatAmount = (amount: number): string => new Intl.NumberFormat('fr-FR').format(amount)

const GiftRegistrySection: FC = () => {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="cadeaux" className="gift-registry-section" aria-labelledby="gift-registry-title">
      <div className="gift-registry-section__inner">
        <p className="gift-registry-section__eyebrow">Une attention pour notre nouvelle vie</p>
        <h2 id="gift-registry-title">Votre présence est notre plus beau cadeau</h2>
        <p className="gift-registry-section__intro">Si vous souhaitez nous offrir un présent, choisissez une participation qui vous ressemble. Chaque montant est une suggestion et nous vous remercions pour votre générosité.</p>
        <div className="gift-options">
          {gifts.map((gift, index) => (
            <article className={`gift-option${selected === index ? ' gift-option--selected' : ''}`} key={gift.title}>
              <span className="gift-option__number">0{index + 1}</span>
              <h3>{gift.title}</h3>
              <p>{gift.detail}</p>
              <strong>{formatAmount(gift.amount)} FCFA</strong>
              <button type="button" onClick={() => setSelected(index)} aria-pressed={selected === index}>
                {selected === index ? 'Cadeau choisi' : 'Choisir ce cadeau'}
              </button>
            </article>
          ))}
        </div>
        {selected !== null && (
          <div className="gift-transfer-note" role="status">
            <p>Vous avez choisi « {gifts[selected].title} » ({formatAmount(gifts[selected].amount)} FCFA).</p>
            <a href="#contacts">Voir les contacts pour organiser le transfert <span aria-hidden="true">↗</span></a>
          </div>
        )}
        <p className="gift-registry-section__note">Le lien de transfert Mobile Money sera ajouté lorsque les coordonnées de paiement des mariés seront disponibles.</p>
      </div>
    </section>
  )
}

export default GiftRegistrySection
