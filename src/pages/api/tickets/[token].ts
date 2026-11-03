import type { NextApiRequest, NextApiResponse } from 'next'
import { guests } from '@/config/guest-list'

type ResponseBody = { success: boolean; message?: string; ticket?: { guest_name: string; party_size: number; token: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>): void {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }

  const token = typeof req.query.token === 'string' ? req.query.token : ''
  const guest = guests.find((entry) => entry.code === token)
  if (!guest) {
    res.status(404).json({ success: false, message: 'Ce billet est introuvable.' })
    return
  }

  res.status(200).json({ success: true, ticket: { guest_name: guest.name, party_size: guest.places, token: guest.code } })
}
