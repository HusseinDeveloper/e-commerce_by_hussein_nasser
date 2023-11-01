import React, { useContext } from 'react'
import style from './Address.module.css'
import {  useFormik } from 'formik'
import { CartContext } from '../../Contexts/CartContext';




export default function Address() {
  
  let {onlinePayment,cardId}=useContext(CartContext)


 async function handleAddressSubmit(values){
    let res=await onlinePayment(cardId,`http://localhost:3000`,values)
    console.log(res?.data.session.url);
    window.location.href=res?.data.session.url
  }

  let formik =useFormik({
    initialValues:{
      details:'',
      phone :'',
      city : ''
    },
    onSubmit:handleAddressSubmit
  })


  return <>
  <div className="container">
    <form onSubmit={formik.handleSubmit}>


      <label htmlFor="details">Details :</label>
      <input type="text" id='details' onBlur={formik.handleBlur}
      value={formik.values.details} onChange={formik.handleChange} name='details'/>
  


      <label htmlFor="phone">Phone :</label>
      <input type="tel" id='phone' onBlur={formik.handleBlur}
      value={formik.values.phone} onChange={formik.handleChange} name='phone'/>
    


      <label htmlFor="city">City :</label>
      <input type="text" id='city' onBlur={formik.handleBlur}
      value={formik.values.city} onChange={formik.handleChange} name='city'/>

      <button type='submit' className='btn bg-main text-white '>Pay Now</button>
    </form>
  </div>

    </>
  
}
