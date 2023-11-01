import React from 'react'
import style from './MainSlider.module.css'
import BannerOne from '../../Assets/images/images/slider-image-1.jpeg'
import BannerTwo from '../../Assets/images/images/slider-image-2.jpeg'
import BannerThree from '../../Assets/images/images/slider-image-3.jpeg'
import BlogOne from '../../Assets/images/images/slider-2.jpeg'
import BlogTwo from '../../Assets/images/images/blog-img-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return <>
    
  <div className="row gx-0 mt-2 ">
    <div className="col-md-8">
    <Slider {...settings}>
      <img height={480} src={BannerTwo} alt="" />
      <img height={480} src={BlogOne} alt="" />
      <img  src={BannerThree} alt="" />
        </Slider>
    </div>
    <div className="col-md-4">
    <div className="row">
      <div className="col-md-12">
        <img height={240} className='w-100' src={BannerOne} alt="" />
      </div>
      <div className="col-md-12">
        <img height={240} className='w-100' src={BlogTwo} alt="" />
      </div>
    </div>
    </div>
  </div>

    </>
  
}
