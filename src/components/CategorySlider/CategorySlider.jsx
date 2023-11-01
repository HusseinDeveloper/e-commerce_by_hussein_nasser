import React, { useEffect } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
  }

  function getSlideCat(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
  }
 
  let {data}=useQuery('getSlideCat',getSlideCat)
  

  return <>
        <h4 className='h5 mt-1 pt-2'>Shop Popular Category</h4>
      <Slider {...settings}>
         {data?.data.data.map((cat)=>(
          <img className='mt-2' height={200} key={cat._id} src={cat.image}  />
         ))}
        </Slider>
     
    </>
  
}
