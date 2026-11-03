import React, { FC } from 'react'

const contacts = [
  { title: 'Contact 1', number: '+237 98703686', tel: '+23798703686' },
  { title: 'Contact 2', number: '+237 6 93 73 17 62', tel: '+237693731762' },
  { title: 'Contact 3', number: '+237 6 55 52 30 61', tel: '+237655523061' },
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
