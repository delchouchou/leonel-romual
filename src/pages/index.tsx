import React from 'react'
import { NextPage } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteNav from '@/components/SiteNav'
import WeddingHero from '@/sections/WeddingHero'
import InvitationSection from '@/sections/InvitationSection'
import CountdownSection from '@/sections/CountdownSection'
import DressCodeSection from '@/sections/DressCodeSection'
import StorySection from '@/sections/StorySection'
import LocationsSection from '@/sections/LocationsSection'
import GiftRegistrySection from '@/sections/GiftRegistrySection'
import ContactsSection from '@/sections/ContactsSection'

const Home: NextPage = () => {
  return (
    <div className="site">
      <SiteNav />
      <main>
        <WeddingHero />
        <StorySection />
        <InvitationSection />
        <CountdownSection />
        <LocationsSection />
        <GiftRegistrySection />
        <ContactsSection />
        <DressCodeSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Home
