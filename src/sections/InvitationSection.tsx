import React, { FC, useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import weddingConfig from '@/config/wedding.config'
import { weddingSchedule } from '@/config/wedding-schedule'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const FloralCorner: FC<{ className: string }> = ({ className }) => (
  <svg className={`wedding-ticket__floral ${className}`} viewBox="0 0 150 150" fill="none" aria-hidden="true">
    <path d="M4 142C27 112 26 79 49 57C69 38 95 32 136 5M19 119C49 116 72 101 87 75M46 64C43 39 31 24 13 13M71 46C78 27 96 17 117 15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M27 111C17 95 18 82 20 74C34 77 43 88 44 100M51 62C37 59 28 49 24 37C38 34 52 42 58 53M83 40C82 26 88 14 100 8C110 18 108 31 99 42M89 74C102 64 116 63 128 69C123 82 111 89 97 86" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.2" />
    <g stroke="currentColor" strokeWidth="1"><circle cx="54" cy="53" r="11"/><circle cx="54" cy="53" r="6"/><circle cx="126" cy="18" r="10"/><circle cx="126" cy="18" r="5"/><circle cx="27" cy="122" r="10"/><circle cx="27" cy="122" r="5"/></g>
    <g fill="currentColor" fillOpacity=".25"><circle cx="54" cy="39" r="5"/><circle cx="66" cy="49" r="5"/><circle cx="62" cy="64" r="5"/><circle cx="47" cy="67" r="5"/><circle cx="41" cy="51" r="5"/><circle cx="128" cy="6" r="4"/><circle cx="139" cy="17" r="4"/><circle cx="128" cy="30" r="4"/><circle cx="115" cy="19" r="4"/></g>
  </svg>
)

const WeddingInvitationCard: FC = () => {
  const { bride, groom } = weddingConfig.people
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const thursdayEvents = weddingSchedule.filter((event) => event.day === 'Jeudi')
  const fridayEvents = weddingSchedule.filter((event) => event.day === 'Vendredi')

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>): void => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -4,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 4,
    })
  }

  return (
    <article
      className="wedding-ticket"
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="wedding-ticket__photo" style={{ backgroundImage: `url(${basePath}/images/leonelle-romuald.jpg)` }} />
      <div className="wedding-ticket__frame" aria-hidden="true" />
      <FloralCorner className="wedding-ticket__floral--tl" />
      <FloralCorner className="wedding-ticket__floral--br" />

      <div className="wedding-ticket__content">
        <header className="wedding-ticket__header">
          <p className="wedding-ticket__monogram">L<span>✦</span>R</p>
          <p className="wedding-ticket__theme">Jardin de lilas</p>
          <p className="wedding-ticket__families">Les familles EBOUELE <span>&amp;</span> DJOMO</p>
          <p className="wedding-ticket__invite">ont la joie de vous inviter au mariage de leurs enfants</p>
          <h3 className="wedding-ticket__names"><span>{bride.firstName}</span><i>&amp;</i><span>{groom.firstName}</span></h3>
          <p className="wedding-ticket__welcome">et de célébrer avec eux le début d’une belle aventure</p>
        </header>

        <div className="wedding-ticket__datebar" aria-label="Les 17 et 18 décembre 2026">
          <div className="wedding-ticket__date"><span>JEUDI</span><strong>17</strong><small>DÉCEMBRE</small></div>
          <span className="wedding-ticket__date-divider" aria-hidden="true">✦</span>
          <div className="wedding-ticket__date"><span>VENDREDI</span><strong>18</strong><small>DÉCEMBRE</small></div>
          <b className="wedding-ticket__year">2026</b>
        </div>

        <div className="wedding-ticket__schedule">
          <section className="wedding-ticket__day wedding-ticket__day--thursday">
            <div className="wedding-ticket__day-heading"><span>01</span><div><small>JEUDI 17 DÉCEMBRE</small><h4>La dot</h4></div></div>
            {thursdayEvents.map((event) => (
              <div className="wedding-ticket__line wedding-ticket__line--single" key={event.title}>
                <time>{event.time}</time><div><strong>{event.title}</strong><small>Nkongsamba</small></div>
              </div>
            ))}
          </section>

          <section className="wedding-ticket__day wedding-ticket__day--friday">
            <div className="wedding-ticket__day-heading"><span>02</span><div><small>VENDREDI 18 DÉCEMBRE</small><h4>Le grand jour</h4></div></div>
            {fridayEvents.map((event) => (
              <div className="wedding-ticket__line" key={event.title}>
                <time>{event.time}</time><div><strong>{event.title}</strong><small>{event.place}</small></div>
              </div>
            ))}
          </section>
        </div>

        <footer className="wedding-ticket__footer"><span>NKONGSAMBA</span><i>✦</i><span>CAMEROUN</span></footer>
      </div>
    </article>
  )
}

const InvitationSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="invitation" className="section section--invitation" aria-labelledby="invitation-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">01 / {t('navInvitation')}</p>
          <h2 id="invitation-title" className="section__title">{t('invitationTitle')}</h2>
        </ScrollReveal>
        <div className="wedding-ticket-stage"><WeddingInvitationCard /></div>
        <p className="wedding-ticket-model-note">Ce faire-part est un aperçu téléchargeable. Pour entrer le jour du mariage, chaque invité devra présenter son billet nominatif avec son QR code unique.</p>
        <div className="wedding-ticket-actions">
          <button type="button" onClick={() => window.print()} className="wedding-ticket__print">Télécharger le faire-part (PDF)</button>
          <p className="wedding-ticket-download-help">Dans la fenêtre qui s’ouvre, choisissez « Enregistrer au format PDF ».</p>
        </div>
      </div>
    </section>
  )
}

export default InvitationSection
