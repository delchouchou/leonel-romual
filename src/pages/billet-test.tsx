import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { demoGuests } from '@/config/demo-guests'

const STORAGE_KEY = 'wedding-demo-checked-in'

const DemoTicketPage: FC = () => {
  const router = useRouter()
  const [checkedIn, setCheckedIn] = useState(false)
  const [ready, setReady] = useState(false)
  const code = typeof router.query.code === 'string' ? router.query.code : ''
  const guest = demoGuests.find((entry) => entry.code === code)

  useEffect(() => {
    if (!router.isReady || !code) return
    const used = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as string[]
    setCheckedIn(used.includes(code))
    setReady(true)
  }, [code, router.isReady])

  const markUsed = (): void => {
    const used = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as string[]
    if (!used.includes(code)) used.push(code)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(used))
    setCheckedIn(true)
  }

  return (
    <main className="demo-ticket-page">
      <article className="demo-ticket-card">
        <p className="demo-tickets-page__badge">Démo uniquement · Données fictives</p>
        {!ready ? <p>Ouverture du billet…</p> : !guest ? (
          <><h1>Billet introuvable</h1><p>Ce code n’appartient pas à la liste de test.</p><Link href="/billets-test"><a>Voir les billets de test</a></Link></>
        ) : (
          <>
            <p className="demo-ticket-card__theme">Jardin de lilas</p>
            <h1>Leonelle <span>&amp;</span> Romuald</h1>
            <p className="demo-ticket-card__guest">Invitation de démonstration pour <strong>{guest.name}</strong></p>
            <p>Jeudi 17 &amp; vendredi 18 décembre 2026<br />Nkongsamba, Cameroun</p>
            <p className="demo-ticket-card__code">Code nominatif : {guest.code}</p>
            {checkedIn ? (
              <p className="demo-ticket-card__used" role="status">Entrée déjà enregistrée sur cet appareil.</p>
            ) : (
              <button type="button" onClick={markUsed}>Simuler le scan à l’entrée</button>
            )}
            <p className="demo-ticket-card__warning">Le registre anti-doublon de cette démo est stocké uniquement dans le navigateur utilisé pour le scan. Il ne protège pas les vrais billets.</p>
          </>
        )}
        <Link href="/billets-test"><a className="demo-ticket-card__back">← Retour à la liste de test</a></Link>
      </article>
    </main>
  )
}

export default DemoTicketPage
