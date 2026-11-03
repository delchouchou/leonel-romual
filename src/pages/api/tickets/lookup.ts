import type { NextApiRequest, NextApiResponse } from 'next'
import { isTicketStoreConfigured, ticketStoreRequest, WeddingTicket } from '@/utils/ticket-store'

type ResponseBody = { success: boolean; message?: string; ticket?: Pick<WeddingTicket, 'guest_name' | 'party_size' | 'token'> }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }
  if (!isTicketStoreConfigured()) {
    res.status(503).json({ success: false, message: 'La liste des invités n’est pas encore disponible.' })
    return
  }

  const { guestName = '' } = (req.body || {}) as { guestName?: string }
  const nameKey = guestName.trim().replace(/\s+/g, ' ').toLocaleLowerCase('fr-FR')
  if (!nameKey || nameKey.length > 120) {
    res.status(400).json({ success: false, message: 'Saisissez votre nom complet.' })
    return
  }

  try {
    const matches = await ticketStoreRequest<Pick<WeddingTicket, 'guest_name' | 'party_size' | 'token'>[]>(
      `wedding_tickets?select=guest_name,party_size,token&guest_name_key=eq.${encodeURIComponent(nameKey)}`
    )
    if (!matches.length) {
      res.status(404).json({ success: false, message: 'Aucune invitation ne correspond à ce nom. Vérifiez l’orthographe ou contactez les mariés.' })
      return
    }
    if (matches.length > 1) {
      res.status(409).json({ success: false, message: 'Plusieurs invitations correspondent à ce nom. Contactez les mariés pour recevoir le bon billet.' })
      return
    }
    res.status(200).json({ success: true, ticket: matches[0] })
  } catch (error) {
    console.error('Wedding ticket lookup failed', error)
    res.status(503).json({ success: false, message: 'Impossible de rechercher le billet pour le moment.' })
  }
}
