import React, { FC, FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type CheckInResult = {
  success: boolean
  status?: 'checked-in' | 'already-used' | 'invalid'
  message: string
  guestName?: string
  partySize?: number
  checkedInAt?: string
}
type BarcodeResult = { rawValue: string }
type BarcodeDetectorLike = { detect: (source: HTMLVideoElement) => Promise<BarcodeResult[]> }
type WindowWithBarcodeDetector = Window & { BarcodeDetector?: new () => BarcodeDetectorLike }

const tokenFromScan = (value: string): string => {
  try {
    const parsed = new URL(value)
    return parsed.searchParams.get('code') || parsed.pathname.split('/').filter(Boolean).pop() || value
  } catch {
    return value.trim()
  }
}

const CheckInPage: FC = () => {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [staffName, setStaffName] = useState('Accueil')
  const [authorized, setAuthorized] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [result, setResult] = useState<CheckInResult | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  const detectorRef = useRef<BarcodeDetectorLike | null>(null)
  const codeFromUrl = typeof router.query.code === 'string' ? router.query.code : ''

  useEffect(() => {
    if (router.isReady && codeFromUrl) setTokenInput(codeFromUrl)
  }, [router.isReady, codeFromUrl])

  const stopCamera = (): void => {
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    detectorRef.current = null
    setCameraOpen(false)
  }

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current)
  }, [])

  const checkIn = async (rawCode: string, accessPin = pin): Promise<void> => {
    const token = tokenFromScan(rawCode)
    if (!token) return
    setBusy(true)
    setMessage('')
    setResult(null)
    try {
      const response = await fetch('/api/tickets/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-checkin-pin': accessPin },
        body: JSON.stringify({ token, staffName }),
      })
      const data = await response.json() as CheckInResult
      setResult(data)
      setTokenInput(token)
      if (!response.ok && response.status !== 409) setMessage(data.message)
    } catch {
      setMessage('Connexion impossible. Vérifiez Internet avant de laisser entrer la personne.')
    } finally {
      setBusy(false)
      stopCamera()
    }
  }

  const authorize = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/tickets', { headers: { 'x-checkin-pin': pin } })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Code d’accès incorrect.')
      setAuthorized(true)
      if (codeFromUrl) await checkIn(codeFromUrl, pin)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Accès refusé.')
    } finally {
      setBusy(false)
    }
  }

  const submitCode = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await checkIn(tokenInput)
  }

  const startCamera = async (): Promise<void> => {
    setMessage('')
    const Detector = (window as WindowWithBarcodeDetector).BarcodeDetector
    if (!Detector) {
      setMessage('Le scan intégré n’est pas pris en charge par ce navigateur. Utilisez l’appareil photo du téléphone pour ouvrir le billet, puis le lien « Équipe d’accueil : vérifier ce billet », ou saisissez son code ici.')
      return
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
      detectorRef.current = new Detector()
      setCameraOpen(true)
      await new Promise<void>((resolve) => { window.requestAnimationFrame(() => resolve()) })
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current
        await videoRef.current.play()
      }
      const scan = async (): Promise<void> => {
        if (!videoRef.current || !detectorRef.current) return
        try {
          const codes = await detectorRef.current.detect(videoRef.current)
          if (codes.length) {
            await checkIn(codes[0].rawValue)
            return
          }
        } catch {
          setMessage('Le QR n’a pas pu être lu. Réessayez ou saisissez le code manuellement.')
        }
        animationRef.current = window.requestAnimationFrame(() => { void scan() })
      }
      animationRef.current = window.requestAnimationFrame(() => { void scan() })
    } catch {
      stopCamera()
      setMessage('Autorisez l’accès à la caméra ou saisissez le code du billet manuellement.')
    }
  }

  return (
    <main className="demo-tickets-page">
      <div className="demo-tickets-page__inner checkin-page">
        <Link href="/"><a className="demo-tickets-page__back">← Retour au site</a></Link>
        <p className="demo-tickets-page__badge">Espace réservé à l’accueil</p>
        <h1>Contrôle des entrées</h1>
        <p className="demo-tickets-page__intro">Scannez le QR présenté par l’invité. Le système affiche son nom, le nombre de places et refuse les billets déjà utilisés.</p>

        {!authorized ? (
          <form className="gift-pledge-form ticket-admin-login" onSubmit={authorize}>
            <label>Code privé de l’équipe d’accueil
              <input type="password" autoComplete="current-password" required value={pin} onChange={(event) => setPin(event.target.value)} />
            </label>
            <button type="submit" disabled={busy}>{busy ? 'Vérification…' : 'Ouvrir le contrôle'}</button>
            {message && <p className="gift-pledge-form__feedback" role="alert">{message}</p>}
          </form>
        ) : (
          <>
            <div className="checkin-tools">
              <label>Nom de l’agent d’accueil
                <input value={staffName} maxLength={80} onChange={(event) => setStaffName(event.target.value)} />
              </label>
              <button type="button" onClick={cameraOpen ? stopCamera : startCamera}>{cameraOpen ? 'Arrêter le scan' : 'Scanner avec la caméra'}</button>
              {cameraOpen && <video ref={videoRef} className="checkin-camera" playsInline muted />}
              <form className="checkin-manual-form" onSubmit={submitCode}>
                <label>Ou collez le code / lien du billet
                  <input value={tokenInput} onChange={(event) => setTokenInput(event.target.value)} placeholder="Code du QR ou lien du billet" required />
                </label>
                <button type="submit" disabled={busy}>{busy ? 'Vérification…' : 'Vérifier le billet'}</button>
              </form>
            </div>
            {message && <p className="gift-pledge-form__feedback" role="alert">{message}</p>}
            {result && (
              <section className={`checkin-result checkin-result--${result.status || 'invalid'}`} aria-live="polite">
                <p className="checkin-result__status">{result.message}</p>
                {result.guestName && <h2>{result.guestName}</h2>}
                {result.partySize && <p>{result.partySize} place{result.partySize > 1 ? 's' : ''} associée{result.partySize > 1 ? 's' : ''} à ce billet.</p>}
                {result.checkedInAt && <p>Heure du scan : {new Date(result.checkedInAt).toLocaleString('fr-FR')}</p>}
              </section>
            )}
            <Link href="/gestion-billets"><a className="demo-ticket-card__staff-link">Gérer la liste des invités et des billets</a></Link>
          </>
        )}
      </div>
    </main>
  )
}

export default CheckInPage
