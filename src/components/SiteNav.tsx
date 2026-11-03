import React, { FC, useCallback, useState } from 'react'
import { useLocale } from '@/context/locale-context'

const NAV_ITEMS = [
  { href: '#home', labelKey: 'navHome' },
  { href: '#histoire', labelKey: 'navStory' },
  { href: '#invitation', labelKey: 'navInvitation' },
  { href: '#lieux', labelKey: 'navLocations' },
  { href: '#cadeaux', labelKey: 'navGifts' },
  { href: '#contacts', labelKey: 'navContacts' },
  { href: '#dress-code', labelKey: 'navDress' },
  { href: '/mon-billet', labelKey: 'navMyTicket' },
] as const

const SiteNav: FC = () => {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  const closeMenu = useCallback(() => setOpen(false), [])

  const handleNavClick = (): void => {
    closeMenu()
  }

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a href="#home" className="site-nav__brand" onClick={handleNavClick}>
          L & R
        </a>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          aria-label={open ? t('navClose') : t('navOpen')}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav-menu" className={`site-nav__menu${open ? ' site-nav__menu--open' : ''}`} aria-label={t('menu')}>
          <ul className="site-nav__list">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <li key={href}>
                <a href={href} onClick={handleNavClick}>
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteNav
