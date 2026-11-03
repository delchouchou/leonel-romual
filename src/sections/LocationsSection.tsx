import React, { FC } from 'react'
import { weddingSchedule } from '@/config/wedding-schedule'

const mapLink = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

const LocationsSection: FC = () => (
  <section id="lieux" className="locations-section" aria-labelledby="locations-title">
    <div className="locations-section__inner">
      <p className="locations-section__eyebrow">Nkongsamba · Cameroun</p>
      <h2 id="locations-title">Les lieux de célébration</h2>
      <p className="locations-section__intro">Retrouvez les itinéraires des cérémonies et des moments partagés.</p>
      <div className="locations-grid">
        {weddingSchedule.map((event) => (
          <article className="location-card" key={event.title}>
            <p className="location-card__date">{event.day} {event.date} · {event.time}</p>
            <h3>{event.title}</h3>
            <p>{event.place}</p>
            {event.map && <a href={mapLink(event.map)} target="_blank" rel="noopener noreferrer">Ouvrir l’itinéraire <span aria-hidden="true">↗</span></a>}
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default LocationsSection
