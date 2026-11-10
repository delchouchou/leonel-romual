import React, { FC, FormEvent, useState } from 'react'
import { weddingGiftList, WeddingGift } from '@/config/gift-list'

const formatAmount = (amount: number): string => new Intl.NumberFormat('fr-FR').format(amount)
const giftPrice = (gift: WeddingGift): string => {
  if (gift.minAmount !== undefined && gift.maxAmount !== undefined) {
    return `${formatAmount(gift.minAmount)} à ${formatAmount(gift.maxAmount)} FCFA`
  }
  return gift.amount === null ? 'Montant au choix' : `${formatAmount(gift.amount)} FCFA`
}
const GiftRegistrySection: FC = () => {
  const [showList, setShowList] = useState(false)
  const [selected, setSelected] = useState<WeddingGift | null>(null)
  const [fullName, setFullName] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [transactionReference, setTransactionReference] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const chooseGift = (gift: WeddingGift): void => {
    setSelected(gift)
    setCustomAmount('')
    setTransactionReference('')
    setFeedback('')
    setIsSuccess(false)
  }

  const submitPledge = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!selected) return
    const amount = selected.amount === null ? Number(customAmount) : selected.amount
    const minimum = selected.minAmount ?? (selected.amount === null ? 2000 : selected.amount)
    const maximum = selected.maxAmount ?? (selected.amount === null ? 1000000 : selected.amount)
    if (!Number.isInteger(amount) || amount < minimum || amount > maximum) {
      setFeedback(`Choisissez un montant entre ${formatAmount(minimum)} et ${formatAmount(maximum)} FCFA.`)
      setIsSuccess(false)
      return
    }
    setSending(true)
    setFeedback('')
    try {
      const response = await fetch('/api/gift-pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, giftId: selected.id, amount, transactionReference }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'La déclaration du cadeau a échoué.')
      setFeedback('Merci ! Votre choix et la référence ont été transmis aux mariés.')
      setIsSuccess(true)
      setFullName('')
      setCustomAmount('')
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
        <p className="gift-registry-section__eyebrow">Cadeaux</p>
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
            <p className="gift-registry-section__note">{weddingGiftList.length} idées de cadeaux avec leurs prix en FCFA. Vous pouvez sélectionner le cadeau qui vous plaît.</p>
            <div className="gift-options">
              {weddingGiftList.map((gift) => (
                <article className={`gift-option${selected?.id === gift.id ? ' gift-option--selected' : ''}`} key={gift.id}>
                  <img
                    className="gift-option__image"
                    src={`/images/gifts/gift-${String(gift.imageIndex).padStart(2, '0')}.webp`}
                    alt=""
                    aria-hidden="true"
                  />
                  <h3>{gift.name}</h3>
                  <strong>{giftPrice(gift)}</strong>
                  <button type="button" onClick={() => chooseGift(gift)} aria-pressed={selected?.id === gift.id}>
                    {selected?.id === gift.id ? 'Sélectionné' : 'Choisir ce cadeau'}
                  </button>
                </article>
              ))}
            </div>

            {selected && (
              <form className="gift-pledge-form" onSubmit={submitPledge}>
                <p className="gift-pledge-form__eyebrow">Votre choix</p>
                <h3>{selected.name}{selected.amount === null && selected.minAmount === undefined ? '' : ` · ${giftPrice(selected)}`}</h3>
                <div className="gift-transfer-details">
                  <span>Effectuez le dépôt puis transmettez sa référence</span>
                  <strong>+237 690 549 506</strong>
                  <p>Nom du bénéficiaire : <b>Tchapda Djomo Ornella</b></p>
                </div>
                <p>{selected.minAmount !== undefined
                  ? 'Choisissez le montant de votre cadeau dans la fourchette indiquée, effectuez le dépôt, puis saisissez votre nom et la référence de la transaction.'
                  : selected.amount === null
                    ? 'Choisissez le montant de votre dépôt, effectuez le transfert, puis saisissez votre nom et la référence de la transaction.'
                  : 'Effectuez le dépôt du montant indiqué, puis saisissez votre nom et la référence de la transaction.'}</p>
                {(selected.amount === null || selected.minAmount !== undefined) && (
                  <label>
                    Montant de votre dépôt (FCFA)
                    <input type="number" min={selected.minAmount ?? 2000} max={selected.maxAmount ?? 1000000} step={500} required value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} />
                  </label>
                )}
                <label>
                  Votre nom complet
                  <input required maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" />
                </label>
                <label>
                  Référence de la transaction Mobile Money
                  <input required maxLength={100} value={transactionReference} onChange={(event) => setTransactionReference(event.target.value)} />
                  <small className="gift-transaction-help">Indiquez la référence affichée sur le reçu ou le SMS de confirmation.</small>
                </label>
                <button type="submit" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer mon choix et la référence'}</button>
                {feedback && <p className={`gift-pledge-form__feedback${isSuccess ? ' gift-pledge-form__feedback--success' : ''}`} role="status">{feedback}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default GiftRegistrySection
