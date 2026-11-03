import React, { FC, FormEvent, useState } from 'react'
import QRCode from '@/components/QRCode'

type GuestTicket = { guest_name: string; party_size: number; token: string }

const MyTicketPage: FC = () => {
  const [guestName, setGuestName] = useState('')
  const [ticket, setTicket] = useState<GuestTicket | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState('')

  React.useEffect(() => setOrigin(window.location.origin), [])

  const findTicket = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setTicket(null)
    try {
      const response = await fetch('/api/tickets/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Impossible de retrouver votre invitation.')
      setTicket(result.ticket as GuestTicket)
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : 'Impossible de retrouver votre invitation.')
    } finally {
      setLoading(false)
    }
  }

  const ticketUrl = ticket && origin
    ? `${origin}/billet/${encodeURIComponent(ticket.token)}`
    : ''

  return (
    <main className="demo-ticket-page">
      <section className="demo-ticket-card my-ticket-card">
        <p className="demo-tickets-page__badge">Invitation nominative</p>
        <p className="demo-ticket-card__theme">Jardin de lilas</p>
        <h1>Leonelle <span>&amp;</span> Romuald</h1>
        {!ticket ? (
          <>
            <p>Inscrivez le nom utilisé sur votre invitation pour retrouver votre billet.</p>
            <form className="gift-pledge-form" onSubmit={findTicket}>
              <label>Votre nom complet
                <input autoComplete="name" required maxLength={120} value={guestName} onChange={(event) => setGuestName(event.target.value)} />
              </label>
              <button type="submit" disabled={loading}>{loading ? 'Recherche…' : 'Afficher mon billet'}</button>
              {error && <p className="gift-pledge-form__feedback" role="alert">{error}</p>}
            </form>
          </>
        ) : (
          <>
            <p className="demo-ticket-card__guest">Billet au nom de <strong>{ticket.guest_name}</strong></p>
            <p>Jeudi 17 &amp; vendredi 18 décembre 2026<br />Nkongsamba, Cameroun</p>
            <p className="demo-ticket-card__code">{ticket.party_size} place{ticket.party_size > 1 ? 's' : ''} · Billet personnel</p>
            {ticketUrl && <QRCode value={ticketUrl} title={`QR code d’entrée de ${ticket.guest_name}`} />}
            <button className="demo-ticket-card__download" type="button" onClick={() => window.print()}>Télécharger mon billet (PDF)</button>
            <p className="demo-ticket-card__warning">Présentez ce QR code à l’équipe d’accueil. Il sera validé une seule fois à l’entrée.</p>
            <button type="button" className="my-ticket-card__reset" onClick={() => setTicket(null)}>Rechercher un autre nom</button>
          </>
        )}
      </section>
    </main>
  )
}

export default MyTicketPage
