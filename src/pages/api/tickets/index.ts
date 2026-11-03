import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import { isTicketStoreConfigured, requireCheckinPin, ticketStoreRequest, WeddingTicket } from '@/utils/ticket-store'

type ResponseBody = { success: boolean; message?: string; tickets?: WeddingTicket[]; ticket?: WeddingTicket }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): Promise<void> {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }
  if (!requireCheckinPin(req, res)) return
  if (!isTicketStoreConfigured()) {
    res.status(503).json({ success: false, message: 'La base de données des billets n’est pas configurée.' })
    return
  }

  try {
    if (req.method === 'GET') {
      const tickets = await ticketStoreRequest<WeddingTicket[]>(
        'wedding_tickets?select=id,guest_name,party_size,token,is_demo,checked_in_at,checked_in_by,created_at&order=created_at.asc'
      )
      res.status(200).json({ success: true, tickets })
      return
    }

    const { guestName = '', partySize = 1 } = (req.body || {}) as { guestName?: string; partySize?: number }
    const cleanName = guestName.trim().replace(/\s+/g, ' ')
    const cleanPartySize = Number(partySize)
    if (!cleanName || cleanName.length > 120 || !Number.isInteger(cleanPartySize) || cleanPartySize < 1 || cleanPartySize > 10) {
      res.status(400).json({ success: false, message: 'Indiquez un nom valide et un nombre de places entre 1 et 10.' })
      return
    }

    const [ticket] = await ticketStoreRequest<WeddingTicket[]>('wedding_tickets?select=*', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ guest_name: cleanName, party_size: cleanPartySize, token: randomBytes(24).toString('hex'), is_demo: false }),
    })
    res.status(201).json({ success: true, ticket })
  } catch (error) {
    console.error('Wedding ticket list/create failed', error)
    const message = error instanceof Error ? error.message : 'Erreur de la base de données des billets.'
    if (message.includes('23505')) {
      res.status(409).json({ success: false, message: 'Un billet existe déjà pour ce nom. Vérifiez la liste avant de réessayer.' })
      return
    }
    res.status(503).json({ success: false, message })
  }
}
