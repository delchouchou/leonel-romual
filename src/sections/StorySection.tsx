import React, { FC } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const StorySection: FC = () => (
  <section id="histoire" className="history-section" aria-labelledby="history-title">
    <div className="history-section__inner">
      <div className="history-section__copy">
        <p className="history-section__eyebrow">Notre histoire · Leonelle &amp; Romuald</p>
        <h2 id="history-title">Deux cœurs, deux chemins,<br /><em>une seule destinée…</em></h2>
        <p>Au fil du temps, nos chemins se sont croisés, nos cœurs se sont rapprochés et notre amour a grandi. Aujourd'hui, portés par cet amour et guidés par la grâce de Dieu, nous avons choisi de nous unir pour écrire ensemble les plus belles pages de notre histoire.</p>
        <p>Main dans la main, nous faisons le vœu de nous aimer, de nous soutenir et de nous choisir chaque jour, pour le meilleur et pour toujours.</p>
        <p>C'est avec une immense joie que nous vous annonçons notre mariage et vous invitons à célébrer avec nous le début de cette merveilleuse aventure à deux.</p>
      </div>
      <div className="history-section__image" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${basePath}/images/alliances-histoire.png`} alt="" />
      </div>
    </div>
  </section>
)

export default StorySection
