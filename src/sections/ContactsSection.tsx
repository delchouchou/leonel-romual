import React, { FC } from 'react'

const contacts = [
  { title: 'Accueil & orientation', number: '+237 6XX XXX 001' },
  { title: 'Cérémonies', number: '+237 6XX XXX 002' },
  { title: 'Réception & cadeaux', number: '+237 6XX XXX 003' },
]

const ContactsSection: FC = () => (
  <section id="contacts" className="contacts-section" aria-labelledby="contacts-title">
    <div className="contacts-section__inner">
      <p className="contacts-section__eyebrow">Nous sommes à votre écoute</p>
      <h2 id="contacts-title">Personnes à contacter</h2>
      <p className="contacts-section__intro">Le jour du mariage, contactez l’équipe d’accueil pour toute question ou besoin pratique.</p>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <article className="contact-card" key={contact.title}>
            <span aria-hidden="true">✦</span>
            <h3>{contact.title}</h3>
            <p>{contact.number}</p>
          </article>
        ))}
      </div>
      <p className="contacts-section__note">Les numéros affichés sont des emplacements fictifs au format camerounais ; ils seront remplacés par les vrais contacts.</p>
    </div>
  </section>
)

export default ContactsSection
