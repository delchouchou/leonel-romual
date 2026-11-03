import type { NextApiRequest, NextApiResponse } from 'next'
import { timingSafeEqual } from 'crypto'
import type { WeddingTicket } from '@/interfaces/ticket'

export const isTicketStoreConfigured = (): boolean =>
  Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY))

export const ticketStoreRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const projectUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
  const apiKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!projectUrl || !apiKey) throw new Error('La base de données des billets n’est pas configurée.')

  // New sb_secret keys belong in `apikey` only; the legacy service_role key is a JWT.
  const authorization = apiKey.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${apiKey}` }

  const response = await fetch(`${projectUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: apiKey,
      ...authorization,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${text.slice(0, 400)}`)
  return (text ? JSON.parse(text) : null) as T
}

export const requireCheckinPin = (req: NextApiRequest, res: NextApiResponse): boolean => {
  const expectedValue = process.env.CHECKIN_PIN
  if (!expectedValue) {
    res.status(503).json({ success: false, message: 'Le code privé de l’équipe d’accueil n’est pas configuré.' })
    return false
  }

  const headerValue = req.headers['x-checkin-pin']
  const supplied = Buffer.from(Array.isArray(headerValue) ? headerValue[0] || '' : headerValue || '')
  const expected = Buffer.from(expectedValue)
  const valid = supplied.length === expected.length && timingSafeEqual(supplied, expected)
  if (!valid) {
    res.status(401).json({ success: false, message: 'Code de l’équipe incorrect.' })
    return false
  }
  return true
}
