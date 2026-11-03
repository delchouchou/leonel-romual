import type { NextApiRequest, NextApiResponse } from 'next'
import { isTicketStoreConfigured, ticketStoreRequest, WeddingTicket } from '@/utils/ticket-store'

type ResponseBody = { success: boolean; message?: string; ticket?: Pick<WeddingTicket, 'guest_name' | 'party_size' | 'token' | 'checked_in_at'> }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }
  const token = typeof req.query.token === 'string' ? req.query.token : ''
  if (!token || token.length > 100 || !isTicketStoreConfigured()) {
    res.status(token ? 503 : 404).json({ success: false, message: 'Ce billet est introuvable.' })
    return
  }
  try {
    const tickets = await ticketStoreRequest<Pick<WeddingTicket, 'guest_name' | 'party_size' | 'token' | 'checked_in_at'>[]>(
      `wedding_tickets?select=guest_name,party_size,token,checked_in_at&token=eq.${encodeURIComponent(token)}`
    )
    if (!tickets.length) {
      res.status(404).json({ success: false, message: 'Ce billet est introuvable.' })
      return
    }
    res.status(200).json({ success: true, ticket: tickets[0] })
  } catch (error) {
    console.error('Wedding ticket read failed', error)
    res.status(503).json({ success: false, message: 'Le billet ne peut pas être chargé pour le moment.' })
  }
}
