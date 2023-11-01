import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { useQuery} from 'react-query';
import { Link } from 'react-router-dom';
import '../../index.css'
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function AllProduct() {

  let {AddProductToCart}=useContext(CartContext)


  // let [isloading,setLoading]=useState(false)
  // let [Products,setProducts]=useState([])

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  async function AddCart(id){
  let {data} =await AddProductToCart(id)
  console.log(data);
  if(data.status=='success'){
    toast('Your Product Add To Cart')
  }
  }


  let {data,isLoading,isFetching}=useQuery('Home',getProducts)
 





  // useEffect(()=> {
  //   getAllProduct()
  // },[])

  // async function getAllProduct(){
  //   setLoading(true)
  //   let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data);
  //   setProducts(data.data)
  //   setLoading(false)
  // }

  return (
  <>
  {/* <h1 className=' my-4 ms-3'>All Product</h1> */}
  {isLoading?<div className="d-flex justify-content-center align-items-center"><InfinitySpin 
  width='200'
  color="#4fa94d"/>
  </div> :  <div className="row">
  <Toaster/>
 {data?.data.data.map((product) =>{
  return <div key={product._id} className="col-md-3 my-2">
      <div className="product overflow-hidden p-4">
   <Link to={`Product/${product._id}`}>
     <img className='w-100' src={product.imageCover} alt="" />
     <h5 className='font-sm text-main mt-3'>{product.category.name}</h5>
     <h3 className='h6'>{product.title.split(' ').slice(0,2).join(" ")}</h3>
     
     <div className='d-flex justify-content-between mb-2'>
     <span>{product.price}EGP</span>
     <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
    </div>
  </Link>
    <button  onClick={()=>AddCart(product._id)} className='btn bg-main btn-small w-100'>Add To Cart</button>
  </div>
  </div>
 })}
 </div> }

  </>
  )
}
