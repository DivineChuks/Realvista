import React from 'react'
import Hero from './_components/Hero'
import RealvistaFeatures from './_components/Features'
import RealvistaAdvantages from './_components/Advantages'
import RealvistaAllInOneSection from './_components/AllInOneSection'
import TestimonialsSection from './_components/Testimonials'
import FAQSection from './_components/FAQSection'
import AppDownloadSection from './_components/Download'
import FeaturedProperties from './_components/FeaturedProperties'
import FeaturedAgents from './_components/FeaturedAgents'
import MainHero from './_components/MainHero'

const page = () => {
  return (
    <>
      <MainHero />
      <RealvistaFeatures />
      <FeaturedProperties />
      <RealvistaAdvantages />
      <RealvistaAllInOneSection />
      <FeaturedAgents />
      <TestimonialsSection />
      <FAQSection />
      <AppDownloadSection />
    </>
  )
}

export default page