import React from 'react'
import {Brands,DesignCategories} from "../components"
import Carousel from '../components/landingPage/Carousel'
import NavBar from '../components/navBar/NavBar'

export default function LandingPage() {
  return (
    <div>
        <Carousel/>
        <DesignCategories/>
        <Brands/>

    </div>
  )
}
