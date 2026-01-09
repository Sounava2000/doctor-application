import React from 'react'
import { SpecialityMenu } from '../components/SpecialityMenu'
import { Header } from '../components/Header'
import { TopDoctors } from '../components/TopDoctors'
import { Banner } from '../components/Banner'

export const Home = () => {
  return (
  <>
  <Header></Header>
   <SpecialityMenu></SpecialityMenu>
   <TopDoctors>

   </TopDoctors>
   <Banner></Banner>
  </>
  )
}
