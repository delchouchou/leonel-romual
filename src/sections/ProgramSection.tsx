import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import { WeddingEvent, weddingSchedule } from '@/config/wedding-schedule'

const mapLink = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

type DayCardProps = {
  number: string
  title: string
  date: string
  events: WeddingEvent[]
  note?: string
}

const DayCard: FC<DayCardProps> = ({ number, title, date, events, note }) => (
  <article className="program-day">
    <header className="program-day__header">
      <span className="program-day__number">{number}</span>
      <div><p>{date}</p><h3>{title}</h3></div>
      <span className="program-day__flower" aria-hidden="true">✿</span>
    </header>
    {note && <p className="program-day__note">{note}</p>}
    <ol className="program-timeline">
      {events.map((event, index) => (
        <li className="program-timeline__item" key={event.title}>
          <time className="program-timeline__time">{event.time}</time>
          <span className="program-timeline__axis" aria-hidden="true"><i />{index < events.length - 1 && <b />}</span>
          <div className="program-timeline__content">
            <h4>{event.title}</h4>
            <p>{event.place}</p>
            {event.map && <a href={mapLink(event.map)} target="_blank" rel="noopener noreferrer">Voir sur la carte <span aria-hidden="true">↗</span></a>}
          </div>
        </li>
      ))}
    </ol>
  </article>
)

const ProgramSection: FC = () => {
  const { t } = useLocale()
  const thursdayEvents = weddingSchedule.filter((event) => event.day === 'Jeudi')
  const fridayEvents = weddingSchedule.filter((event) => event.day === 'Vendredi')

  return (
    <section id="program" className="section section--program" aria-labelledby="program-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">02 / {t('navProgram')}</p>
          <h2 id="program-title" className="section__title">Deux jours, un même amour</h2>
          <p className="section__lead">Retrouvons-nous à Nkongsamba pour célébrer notre union, entourés de nos familles et de nos proches.</p>
        </ScrollReveal>
        <div className="wedding-program">
          <ScrollReveal delay={0.06}><DayCard number="01" title="La dot" date="Jeudi · 17 décembre 2026" events={thursdayEvents} note="La tradition ouvre ces deux journées de célébration." /></ScrollReveal>
          <ScrollReveal delay={0.12}><DayCard number="02" title="Mariage civil & religieux" date="Vendredi · 18 décembre 2026" events={fridayEvents} /></ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ProgramSection
