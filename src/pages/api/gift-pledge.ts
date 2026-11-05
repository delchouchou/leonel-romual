import type { NextApiRequest, NextApiResponse } from 'next'
import { weddingGiftList } from '@/config/gift-list'

type GiftPledgeRequest = {
  fullName?: string
  giftId?: string
  amount?: number
  transactionReference?: string
}

type GiftPledgeResponse = { success: boolean; message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GiftPledgeResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }

  const { fullName = '', giftId = '', amount: submittedAmount, transactionReference = '' } = (req.body || {}) as GiftPledgeRequest
  const guestName = fullName.trim()
  const reference = transactionReference.trim()
  const gift = weddingGiftList.find((item) => item.id === giftId)
  const amount = gift ? (gift.amount === null ? Number(submittedAmount) : gift.amount) : Number.NaN
  const minimum = gift?.minAmount ?? (gift?.amount === null ? 2000 : gift?.amount ?? 0)
  const maximum = gift?.maxAmount ?? (gift?.amount === null ? 1000000 : gift?.amount ?? 0)

  if (!guestName || guestName.length > 120 || !gift || !Number.isInteger(amount) || amount < minimum || amount > maximum || !reference || reference.length > 100) {
    res.status(400).json({ success: false, message: 'Vérifiez votre nom, le montant et la référence du transfert.' })
    return
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    res.status(503).json({ success: false, message: 'La feuille Google des cadeaux n’est pas encore reliée au site.' })
    return
  }

  try {
    const sheetResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'gift',
        timestamp: new Date().toISOString(),
        fullName: guestName,
        giftName: gift.name,
        amount,
        transactionReference: reference,
      }),
    })
    const sheetResult = await sheetResponse.json() as { status?: string; message?: string }
    if (!sheetResponse.ok || sheetResult.status !== 'success') {
      throw new Error(sheetResult.message || 'Google Sheets n’a pas confirmé l’enregistrement.')
    }

    res.status(200).json({ success: true, message: 'Les informations de votre cadeau ont été enregistrées dans la feuille Google des mariés.' })
  } catch (error) {
    console.error('Gift record Google Sheets failed', error)
    res.status(502).json({ success: false, message: 'L’enregistrement dans la feuille Google a échoué. Réessayez ou contactez les mariés.' })
  }
}
