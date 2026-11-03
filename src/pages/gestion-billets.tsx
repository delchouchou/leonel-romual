import React, { FC, FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import QRCode from '@/components/QRCode'
import type { WeddingTicket } from '@/interfaces/ticket'

const TicketAdminPage: FC = () => {
  const [pin, setPin] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [tickets, setTickets] = useState<WeddingTicket[]>([])
  const [guestName, setGuestName] = useState('')
  const [partySize, setPartySize] = useState(1)
  const [origin, setOrigin] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => setOrigin(window.location.origin), [])

  const fetchTickets = async (accessPin: string): Promise<WeddingTicket[]> => {
    const response = await fetch('/api/tickets', { headers: { 'x-checkin-pin': accessPin } })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || 'Impossible de charger la liste.')
    return result.tickets as WeddingTicket[]
  }

  const authorize = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      setTickets(await fetchTickets(pin))
      setAuthorized(true)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Accès refusé.')
      setIsError(true)
    } finally {
      setBusy(false)
    }
  }

  const createTicket = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-checkin-pin': pin },
        body: JSON.stringify({ guestName, partySize }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Impossible de créer le billet.')
      setTickets((current) => [...current, result.ticket as WeddingTicket])
      setGuestName('')
      setPartySize(1)
      setMessage(`Billet nominatif créé pour ${result.ticket.guest_name}.`)
      setIsError(false)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Impossible de créer le billet.')
      setIsError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="demo-tickets-page">
      <div className="demo-tickets-page__inner">
        <Link href="/"><a className="demo-tickets-page__back">← Retour au site</a></Link>
        <p className="demo-tickets-page__badge">Espace privé · équipe des mariés</p>
        <h1>Gestion des billets</h1>
        {!authorized ? (
          <form className="gift-pledge-form ticket-admin-login" onSubmit={authorize}>
            <p>Entrez le code privé de l’équipe pour afficher les invités et créer leurs billets.</p>
            <label>Code de l’équipe
              <input type="password" required autoComplete="current-password" value={pin} onChange={(event) => setPin(event.target.value)} />
            </label>
            <button type="submit" disabled={busy}>{busy ? 'Vérification…' : 'Ouvrir la gestion'}</button>
            {message && <p className="gift-pledge-form__feedback" role="alert">{message}</p>}
          </form>
        ) : (
          <>
            <form className="gift-pledge-form ticket-create-form" onSubmit={createTicket}>
              <h2>Créer une invitation nominative</h2>
              <label>Nom complet de l’invité
                <input required maxLength={120} value={guestName} onChange={(event) => setGuestName(event.target.value)} />
              </label>
              <label>Nombre de places associées
                <input type="number" min={1} max={10} required value={partySize} onChange={(event) => setPartySize(Number(event.target.value))} />
              </label>
              <button type="submit" disabled={busy}>{busy ? 'Création…' : 'Créer le billet QR'}</button>
              {message && <p className={`gift-pledge-form__feedback${isError ? '' : ' gift-pledge-form__feedback--success'}`} role="status">{message}</p>}
            </form>
            <p className="demo-tickets-page__intro">Chaque billet est rattaché à un nom, à un nombre de places et à un QR unique. Les 20 premières entrées sont des invités fictifs pour essayer le parcours.</p>
            <div className="demo-guest-grid">
              {tickets.map((ticket) => {
                const url = `${origin}/billet/${encodeURIComponent(ticket.token)}`
                return (
                  <article className="demo-guest-card" key={ticket.id}>
                    <QRCode value={url} title={`QR code de ${ticket.guest_name}`} />
                    <div>
                      <p>{ticket.is_demo ? 'INVITÉ FICTIF' : 'INVITÉ'}</p>
                      <h2>{ticket.guest_name}</h2>
                      <p>{ticket.party_size} place{ticket.party_size > 1 ? 's' : ''} · {ticket.checked_in_at ? 'Entrée validée' : 'Pas encore entré'}</p>
                      <a href={url}>Ouvrir / télécharger le billet</a>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default TicketAdminPage
