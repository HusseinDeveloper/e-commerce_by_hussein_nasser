import React, {useContext ,useEffect, useState } from 'react'
import style from './ProductDetals.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import Slider from "react-slick";
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";



export default function ProductDetals() {

  let { id } = useParams()
  let [productDetals,setProductDetals] =useState()
  let [isLodaing,setLoading] =useState([])
  let {AddProductToCart}=useContext(CartContext)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getProductDetals(x) {
    setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
    setLoading(false)
    setProductDetals(data.data)
  }

  useEffect(()=>{
    getProductDetals(id)
  },[])

  async function AddCart(id){
    let {data} =await AddProductToCart(id)
    console.log(data);
    if(data.status=='success'){
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    }




  return <>


  {!isLodaing? <div className="row align-items-center">
      <div className="col-md-3">
        <Toaster/>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{productDetals?.title}</title>
                
            </Helmet>
        <Slider {...settings}>
    {productDetals?.images.map((img)=>{
     return <img key={productDetals._id} className='w-100' src={img} alt="" />
    })}
        </Slider>
      </div>
      <div className="col-md-9">
     <h4>{productDetals?.title}</h4>
     <p>{productDetals?.description}</p>
     <h5 className='text-main'>{productDetals?.category?.name}</h5>
     <div className=' d-flex justify-content-between '>
     <span>price : {productDetals?.price}</span>
     <span><i className='fas fa-star rating-color'></i> {productDetals?.ratingsAverage}</span>
     </div>
      <button onClick={()=>AddCart(productDetals._id)} className='btn form-control bg-main text-white mt-3'>Add To Cart</button>
      </div>
    </div>: <div className='text-center py-5 my-5'> <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/></div>}
    
  </>

}
