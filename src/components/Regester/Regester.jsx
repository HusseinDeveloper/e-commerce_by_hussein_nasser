import React, { useState } from 'react'
import style from './Regester.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Bars } from 'react-loader-spinner'
import { Navigate, useNavigate } from 'react-router-dom'


// validate بالايد
// function validate(value){
//   let errors={}
//   let emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/


// if(value.name.length == ''){
//   errors.name="Name is reqerd"
// }else if(value.name.length < 10){
//     errors.name="Name Length Must be More Than 10"
//   }else if(value.name.length >= 20){
//     errors.name="Name Length Must be Less Than 20 Char"
//   }

//   if(value.email.length == ''){
//     errors.email="email is reqerd"
//   }else if(!emailRegex.test(value.email)){
//     errors.email='email is not valid'
//    }

//   return errors;
// }



export default function Regester() {
    let navigate =useNavigate()
  let [isloading,setLoading]=useState(false)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // yup
// string min max required
  const validationSchema=yup.object({
    name:yup.string('Must be string').min(3,'length more than 3').max(15,'length more less 15').required('name is required'),
    email:yup.string().email('Email is not valid').required('Email is required'),
    phone:yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,20}/,"password is not matches")
    .required('Please Enter your password'),
    rePassword:yup.string().oneOf([yup.ref('password'),null],'password is not match').required('RePassword is required')
  })




   async function sendData(value){

    setLoading(true);
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
    .catch((err)=>{
      console.log(err.response.data.message);
      // setErr(err.response.data.message)
      setLoading(false);
    })
    if(data.message == "success"){
      setLoading(false);
      navigate('/Login')
    }
   setLoading(false)
    console.log(data);
  }
  

  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    // validate, validate is بالايد
    validationSchema,  // validate yup
    onSubmit:sendData
  })

  return <>

      <div className="w-75 mx-auto my-4">
        <h2>Regester Now :</h2>
      <form onSubmit={formik.handleSubmit}>

           <label htmlFor="userName">Name :</label>
        <input id='userName' className='form-control' onBlur={formik.handleBlur} 
        value={formik.values.name} onChange={formik.handleChange} type="text" name='name' />
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div> :"" }
        


           <label htmlFor="userEmail">Email :</label>
        <input id='userEmail' className='form-control' onBlur={formik.handleBlur} 
        value={formik.values.email} onChange={formik.handleChange} type="email" name='email' />
       {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div> :"" }


        <label htmlFor="userPhone">Phone :</label>
        <input type="tel" className='form-control' id='userPhone' name='phone' onChange={formik.handleChange} 
        value={formik.values.phone} onBlur={formik.handleBlur}/>
        {formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div> :"" }


<label htmlFor="userPas">Password :</label>
        <input type="password" className='form-control' id='userPas' name='password' onChange={formik.handleChange} 
        value={formik.values.password} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div> :"" }


<label htmlFor="userRepas">RePassword :</label>
        <input type="password" className='form-control' id='userRepas' name='rePassword' onChange={formik.handleChange} 
        value={formik.values.rePassword} onBlur={formik.handleBlur}/>
        {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div> :"" }

  {isloading ? <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}/> :
      <button type='submit' className='btn btn-primary mt-2'>Regester</button>}
      </form>
      </div>
    </>
  
}
