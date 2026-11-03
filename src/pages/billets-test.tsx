import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import QRCode from '@/components/QRCode'
import { demoGuests } from '@/config/demo-guests'

const DemoTicketsPage: FC = () => {
  const [origin, setOrigin] = useState('')

  useEffect(() => setOrigin(window.location.origin), [])

  return (
    <main className="demo-tickets-page">
      <div className="demo-tickets-page__inner">
        <Link href="/"><a className="demo-tickets-page__back">← Retour au site</a></Link>
        <p className="demo-tickets-page__badge">Environnement de démonstration · Invités fictifs</p>
        <h1>Billets QR de test</h1>
        <p className="demo-tickets-page__intro">Scannez un code avec l’appareil photo d’un téléphone pour ouvrir le billet test correspondant. Chaque code est associé à un nom et à un identifiant distincts.</p>
        <div className="demo-guest-grid">
          {demoGuests.map((guest) => {
            const url = `${origin}/billet-test?code=${encodeURIComponent(guest.code)}`
            return (
              <article className="demo-guest-card" key={guest.code}>
                <QRCode value={url} title={`QR code de ${guest.name}`} />
                <div><p>{guest.code}</p><h2>{guest.name}</h2><a href={url}>{origin ? 'Ouvrir le billet' : 'Préparation du billet…'}</a></div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default DemoTicketsPage
