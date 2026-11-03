import type { NextApiRequest, NextApiResponse } from 'next'
import { guests, normalizeGuestName } from '@/config/guest-list'

type ResponseBody = { success: boolean; message?: string; ticket?: { guest_name: string; party_size: number; token: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): void {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }

  const guestName = typeof req.body?.guestName === 'string' ? req.body.guestName : ''
  const nameKey = normalizeGuestName(guestName)
  if (!nameKey || nameKey.length > 120) {
    res.status(400).json({ success: false, message: 'Saisissez votre nom complet.' })
    return
  }

  const matches = guests.filter((guest) => normalizeGuestName(guest.name) === nameKey)
  if (matches.length !== 1) {
    res.status(404).json({ success: false, message: 'Aucune invitation ne correspond à ce nom. Vérifiez l’orthographe ou contactez les mariés.' })
    return
  }

  res.status(200).json({
    success: true,
    ticket: { guest_name: matches[0].name, party_size: matches[0].places, token: matches[0].code },
  })
}
