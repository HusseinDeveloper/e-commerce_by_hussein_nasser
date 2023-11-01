import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {

let {setUseToken}=useContext(UserContext)

useEffect(()=>{


  if(localStorage.getItem('useTaken')!=null){
    setUseToken(localStorage.getItem('useTaken'))
  }
},[])


  return <>
     <Navbar/>

     <div className="container">
     <Outlet/>
     </div>

     <div>
    <Offline>
      <div className='you are offline (surprise!)'>
       <i className='fas fa-wifi'></i>you are offline (surprise!)
      </div>
    </Offline>
  </div>


    </>
  
}
