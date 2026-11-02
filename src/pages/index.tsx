import React from 'react'
import { NextPage } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteNav from '@/components/SiteNav'
import WeddingHero from '@/sections/WeddingHero'
import InvitationSection from '@/sections/InvitationSection'
import CountdownSection from '@/sections/CountdownSection'
import ProgramSection from '@/sections/ProgramSection'
import DressCodeSection from '@/sections/DressCodeSection'

const Home: NextPage = () => {
  return (
    <div className="site">
      <SiteNav />
      <main>
        <WeddingHero />
        <InvitationSection />
        <ProgramSection />
        <CountdownSection />
        <DressCodeSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Home
