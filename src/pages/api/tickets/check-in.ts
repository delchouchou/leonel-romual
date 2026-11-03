import type { NextApiRequest, NextApiResponse } from 'next'
import { isTicketStoreConfigured, requireCheckinPin, ticketStoreRequest, WeddingTicket } from '@/utils/ticket-store'

type ResponseBody = { success: boolean; status?: 'checked-in' | 'already-used' | 'invalid'; message: string; guestName?: string; partySize?: number; checkedInAt?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }
  if (!requireCheckinPin(req, res)) return
  if (!isTicketStoreConfigured()) {
    res.status(503).json({ success: false, message: 'La base de données des billets n’est pas configurée.' })
    return
  }

  const { token = '', staffName = 'Accueil' } = (req.body || {}) as { token?: string; staffName?: string }
  if (!token || token.length > 100) {
    res.status(400).json({ success: false, message: 'QR code illisible.' })
    return
  }

  try {
    const updated = await ticketStoreRequest<WeddingTicket[]>(
      `wedding_tickets?token=eq.${encodeURIComponent(token)}&checked_in_at=is.null&select=guest_name,party_size,checked_in_at`,
      {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ checked_in_at: new Date().toISOString(), checked_in_by: staffName.trim().slice(0, 80) || 'Accueil' }),
      }
    )

    if (updated.length) {
      res.status(200).json({ success: true, status: 'checked-in', message: 'Billet valide · entrée enregistrée.', guestName: updated[0].guest_name, partySize: updated[0].party_size, checkedInAt: updated[0].checked_in_at || undefined })
      return
    }

    const existing = await ticketStoreRequest<WeddingTicket[]>(
      `wedding_tickets?token=eq.${encodeURIComponent(token)}&select=guest_name,party_size,checked_in_at`
    )
    if (!existing.length) {
      res.status(404).json({ success: false, status: 'invalid', message: 'Billet inconnu · entrée refusée.' })
      return
    }
    res.status(409).json({ success: false, status: 'already-used', message: 'Billet déjà utilisé · entrée refusée.', guestName: existing[0].guest_name, partySize: existing[0].party_size, checkedInAt: existing[0].checked_in_at || undefined })
  } catch (error) {
    console.error('Wedding ticket check-in failed', error)
    res.status(503).json({ success: false, message: 'La vérification est indisponible. Ne validez pas ce billet hors ligne.' })
  }
}
