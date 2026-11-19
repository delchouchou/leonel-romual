import React, { FC } from 'react'

const contacts = [
  { title: 'Contact 1', number: '+237 6 98 93 18 72', tel: '+237698931872' },
  { title: 'Contact 2', number: '+237 6 98 51 64 04', tel: '+237698516404' },
  { title: 'Contact 3', number: '+237 6 98 23 88 33', tel: '+237698238833' },
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
            <p><a href={`tel:${contact.tel}`}>{contact.number}</a></p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default ContactsSection
