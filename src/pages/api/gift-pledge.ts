import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { weddingGiftList } from '@/config/gift-list'

type GiftPledgeRequest = {
  fullName?: string
  giftId?: string
  transactionReference?: string
}

type GiftPledgeResponse = { success: boolean; message: string }

const escapeHtml = (value: string): string => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GiftPledgeResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
    return
  }

  const { fullName = '', giftId = '', transactionReference = '' } = (req.body || {}) as GiftPledgeRequest
  const guestName = fullName.trim()
  const reference = transactionReference.trim()
  const gift = weddingGiftList.find((item) => item.id === giftId)

  if (!guestName || guestName.length > 120 || !reference || reference.length > 100 || !gift) {
    res.status(400).json({ success: false, message: 'Vérifiez votre nom, le cadeau et la référence du transfert.' })
    return
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = Number(process.env.SMTP_PORT) || 587
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notificationEmail = process.env.GIFT_NOTIFICATION_EMAIL

  if (!smtpUser || !smtpPass || !notificationEmail) {
    res.status(503).json({ success: false, message: 'La réception des confirmations de cadeaux n’est pas encore configurée.' })
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    })
    const safeName = escapeHtml(guestName)
    const safeReference = escapeHtml(reference)
    const amount = new Intl.NumberFormat('fr-FR').format(gift.amount)

    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: notificationEmail,
      subject: `Cadeau de mariage : ${gift.name} · ${amount} FCFA`,
      text: `Nom : ${guestName}\nCadeau choisi : ${gift.name}\nPrix : ${amount} FCFA\nRéférence du paiement : ${reference}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#43264f"><h2>Cadeau choisi</h2><p><strong>Invité(e) :</strong> ${safeName}</p><p><strong>Cadeau :</strong> ${escapeHtml(gift.name)}</p><p><strong>Prix :</strong> ${amount} FCFA</p><p><strong>Référence du paiement :</strong> ${safeReference}</p></div>`,
    })

    res.status(200).json({ success: true, message: 'Cadeau signalé aux mariés.' })
  } catch (error) {
    console.error('Gift contribution notification failed', error)
    res.status(502).json({ success: false, message: 'La notification n’a pas pu être envoyée. Réessayez ou contactez les mariés.' })
  }
}
