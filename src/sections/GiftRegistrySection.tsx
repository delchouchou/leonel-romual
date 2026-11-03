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
      setFeedback('Merci ! Les informations de votre cadeau ont été envoyées à l’adresse de contact des mariés.')
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
        <p className="gift-registry-section__intro">Votre présence est notre plus beau cadeau. Si vous souhaitez tout de même nous offrir un présent, nous avons préparé une liste d’idées. Pour vous éviter de vous encombrer avec le transport d’un paquet le jour du mariage, vous pouvez choisir le cadeau qui vous plaît et nous l’offrir à distance. Cliquez sur « Choisir un cadeau » pour découvrir la liste.</p>
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
            <p className="gift-registry-section__note">20 idées de cadeaux avec leurs prix en FCFA. Vous pouvez sélectionner le cadeau qui vous plaît.</p>
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
                <p>Après avoir effectué le transfert avec les coordonnées communiquées par les mariés, indiquez votre nom et la référence du paiement. Ces informations leur permettront d’identifier le cadeau que vous avez offert.</p>
                <label>
                  Votre nom complet
                  <input required maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" />
                </label>
                <label>
                  Référence du paiement
                  <input required maxLength={100} value={transactionReference} onChange={(event) => setTransactionReference(event.target.value)} />
                </label>
                <button type="submit" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer les informations aux mariés'}</button>
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
