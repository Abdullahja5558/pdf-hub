import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <HowItWorks />
      <Footer/>
    </>
  )
}

export default page