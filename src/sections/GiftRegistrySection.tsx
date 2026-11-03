import React, { FC, FormEvent, useState } from 'react'
import { weddingGiftList, WeddingGift } from '@/config/gift-list'

const formatAmount = (amount: number): string => new Intl.NumberFormat('fr-FR').format(amount)

const GiftRegistrySection: FC = () => {
  const [showList, setShowList] = useState(false)
  const [selected, setSelected] = useState<WeddingGift | null>(null)
  const [fullName, setFullName] = useState('')
  const [transactionReference, setTransactionReference] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const chooseGift = (gift: WeddingGift): void => {
    setSelected(gift)
    setFeedback('')
    setIsSuccess(false)
  }

  const submitPledge = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!selected) return
    setSending(true)
    setFeedback('')
    try {
      const response = await fetch('/api/gift-pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, giftId: selected.id, transactionReference }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'La déclaration du cadeau a échoué.')
      setFeedback('Merci ! Les mariés ont reçu le nom, le cadeau choisi, le montant et la référence du transfert.')
      setIsSuccess(true)
      setFullName('')
      setTransactionReference('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Impossible d’enregistrer ce cadeau pour le moment.')
      setIsSuccess(false)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="cadeaux" className="gift-registry-section" aria-labelledby="gift-registry-title">
      <div className="gift-registry-section__inner">
        <p className="gift-registry-section__eyebrow">Une attention pour notre nouvelle vie</p>
        <h2 id="gift-registry-title">Votre présence est notre plus beau cadeau</h2>
        <p className="gift-registry-section__intro">Pour celles et ceux qui souhaitent nous témoigner une attention particulière, nous avons préparé une liste de cadeaux sous forme de contributions financières. Choisissez, selon vos moyens, l’idée et le montant qui vous conviennent. Votre geste nous aidera à concrétiser nos projets tout en nous évitant d’avoir à transporter et à stocker de nombreux cadeaux le jour du mariage. Merci de tout cœur pour votre générosité.</p>
        <p className="gift-registry-section__note gift-registry-section__note--intro">La liste est masquée pour vous laisser découvrir les idées seulement si vous souhaitez offrir un cadeau. Choisissez le montant qui vous convient ; le cadeau sélectionné représente votre contribution au projet des mariés.</p>
        <button
          type="button"
          className="gift-list-toggle"
          aria-expanded={showList}
          aria-controls="gift-options-list"
          onClick={() => { setShowList((visible) => !visible); setSelected(null); setFeedback('') }}
        >
          {showList ? 'Masquer la liste' : 'Choisir un cadeau'} <span aria-hidden="true">{showList ? '−' : '＋'}</span>
        </button>

        {showList && (
          <div id="gift-options-list" className="gift-registry-content">
            <p className="gift-registry-section__note">20 idées de cadeaux · montants en FCFA. Plusieurs invités peuvent choisir la même idée : le versement est destiné aux mariés.</p>
            <div className="gift-options">
              {weddingGiftList.map((gift, index) => (
                <article className={`gift-option${selected?.id === gift.id ? ' gift-option--selected' : ''}`} key={gift.id}>
                  <span className="gift-option__number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{gift.name}</h3>
                  <p>{gift.description}</p>
                  <strong>{formatAmount(gift.amount)} FCFA</strong>
                  <button type="button" onClick={() => chooseGift(gift)} aria-pressed={selected?.id === gift.id}>
                    {selected?.id === gift.id ? 'Sélectionné' : 'Choisir ce cadeau'}
                  </button>
                </article>
              ))}
            </div>

            {selected && (
              <form className="gift-pledge-form" onSubmit={submitPledge}>
                <p className="gift-pledge-form__eyebrow">Votre choix</p>
                <h3>{selected.name} · {formatAmount(selected.amount)} FCFA</h3>
                <p>Après avoir effectué le dépôt du montant choisi, indiquez votre nom et la référence de transaction. Les mariés pourront ainsi associer votre contribution au cadeau sélectionné.</p>
                <label>
                  Votre nom complet
                  <input required maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" />
                </label>
                <label>
                  Référence du transfert
                  <input required maxLength={100} value={transactionReference} onChange={(event) => setTransactionReference(event.target.value)} />
                </label>
                <button type="submit" disabled={sending}>{sending ? 'Envoi…' : 'Signaler mon dépôt aux mariés'}</button>
                {feedback && <p className={`gift-pledge-form__feedback${isSuccess ? ' gift-pledge-form__feedback--success' : ''}`} role="status">{feedback}</p>}
              </form>
            )}
            <p className="gift-registry-section__note">Le numéro ou lien Mobile Money pour effectuer le dépôt sera ajouté dès que les coordonnées des mariés seront disponibles.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default GiftRegistrySection
