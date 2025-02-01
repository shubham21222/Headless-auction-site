import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React from 'react'

const page = () => {
  return (
    <>
    <Header2/>
    <div className='mt-8'>
        <AboutSection/>
    </div>
    <Footer/>
    </>
  )
}

export default page