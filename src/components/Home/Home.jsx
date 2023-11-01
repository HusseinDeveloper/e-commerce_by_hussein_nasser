import React from 'react'

import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
import Products from '../Products/Products'


export default function Home() {
  return <>
<Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart Home</title>
                
            </Helmet>

  <MainSlider/>
  <CategorySlider/>


      <Products/>
    </>

}
