import type { NextApiRequest, NextApiResponse } from 'next'
import { guests } from '@/config/guest-list'

type ResponseBody = { success: boolean; status?: 'valid' | 'invalid'; message: string; guestName?: string; partySize?: number }

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): void {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, status: 'invalid', message: 'Méthode non autorisée.' })
    return
  }

  const token = typeof req.body?.token === 'string' ? req.body.token : ''
  const guest = guests.find((entry) => entry.code === token)
  if (!guest) {
    res.status(404).json({ success: false, status: 'invalid', message: 'Aucun invité ne correspond à ce QR.' })
    return
  }

  res.status(200).json({
    success: true,
    status: 'valid',
    message: 'Billet reconnu. Vérifiez le nom puis cochez l’invité sur la feuille d’entrée.',
    guestName: guest.name,
    partySize: guest.places,
  })
}
