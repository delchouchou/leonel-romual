import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import QRCode from '@/components/QRCode'

type GuestTicket = { guest_name: string; party_size: number; token: string; checked_in_at: string | null }

const GuestTicketPage: FC = () => {
  const router = useRouter()
  const [ticket, setTicket] = useState<GuestTicket | null>(null)
  const [error, setError] = useState('')
  const [origin, setOrigin] = useState('')
  const [loading, setLoading] = useState(true)
  const token = typeof router.query.token === 'string' ? router.query.token : ''

  useEffect(() => {
    setOrigin(window.location.origin)
    if (!router.isReady || !token) return
    let active = true
    fetch(`/api/tickets/${encodeURIComponent(token)}`)
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Billet introuvable.')
        if (active) setTicket(result.ticket as GuestTicket)
      })
      .catch((loadError) => {
        if (active) setError(loadError instanceof Error ? loadError.message : 'Billet introuvable.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [router.isReady, token])

  const ticketUrl = ticket && origin ? `${origin}/billet/${encodeURIComponent(ticket.token)}` : ''

  return (
    <main className="demo-ticket-page">
      <article className="demo-ticket-card">
        <p className="demo-tickets-page__badge">Billet nominatif</p>
        {loading ? <p>Chargement du billet…</p> : error || !ticket ? (
          <><h1>Billet introuvable</h1><p>{error || 'Ce lien ne correspond à aucun billet.'}</p><Link href="/mon-billet"><a>Retrouver mon billet avec mon nom</a></Link></>
        ) : (
          <>
            <p className="demo-ticket-card__theme">Jardin de lilas</p>
            <h1>Leonelle <span>&amp;</span> Romuald</h1>
            <p className="demo-ticket-card__guest">Invité(e) : <strong>{ticket.guest_name}</strong></p>
            <p>Jeudi 17 &amp; vendredi 18 décembre 2026<br />Nkongsamba, Cameroun</p>
            <p className="demo-ticket-card__code">{ticket.party_size} place{ticket.party_size > 1 ? 's' : ''} · Billet personnel</p>
            {ticketUrl && <QRCode value={ticketUrl} title={`QR code d’entrée de ${ticket.guest_name}`} />}
            {ticket.checked_in_at && <p className="demo-ticket-card__used" role="status">Entrée déjà enregistrée.</p>}
            <button className="demo-ticket-card__download" type="button" onClick={() => window.print()}>Télécharger mon billet (PDF)</button>
            <p className="demo-ticket-card__warning">Présentez ce code à l’équipe d’accueil. Il sera vérifié une seule fois.</p>
            <Link href={`/controle-acces?code=${encodeURIComponent(ticket.token)}`}><a className="demo-ticket-card__staff-link">Équipe d’accueil : vérifier ce billet</a></Link>
          </>
        )}
      </article>
    </main>
  )
}

export default GuestTicketPage
