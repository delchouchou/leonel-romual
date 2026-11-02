import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const swatches = [
  { name: 'Fuchsia', hex: '#C74783' },
  { name: 'Rose poudré', hex: '#F0A7C5' },
  { name: 'Lilas', hex: '#C3B2F2' },
  { name: 'Violet', hex: '#7B51B2' },
  { name: 'Prune', hex: '#4B0E76' },
]

const DressCodeSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="dress-code" className="dress-code-section" aria-labelledby="dress-code-title">
      <div className="dress-code-editorial">
        <ScrollReveal>
          <div className="dress-code-editorial__photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="dress-code-editorial__photo"
              src={`${basePath}/images/dress-code-lilas-inspiration.png`}
              alt="Inspiration de tenues de cérémonie en rose poudré et violet, assorties à un jardin fleuri."
            />
            <span className="dress-code-editorial__photo-label">Inspiration tenue</span>
            <span className="dress-code-editorial__photo-mark" aria-hidden="true">L <i>✦</i> R</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="dress-code-editorial__content">
            <p className="dress-code-section__eyebrow">03 / {t('navDress')}</p>
            <p className="dress-code-editorial__overline">Notre univers chromatique</p>
            <h2 id="dress-code-title" className="dress-code-theme">Jardin<br /><em>de lilas</em></h2>
            <p className="dress-code-theme__copy">Une palette florale, romantique et lumineuse, inspirée des nuances qui habilleront notre célébration.</p>

            <div className="dress-code-palette">
              <p className="dress-code-palette__title">Les couleurs du jour</p>
              <ul className="wedding-palette" aria-label="Palette de couleurs du mariage">
                {swatches.map(({ name, hex }) => (
                  <li key={name}>
                    <span className="wedding-palette__swatch" style={{ backgroundColor: hex }} />
                    <span className="wedding-palette__label"><strong>{name}</strong><small>{hex}</small></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default DressCodeSection
