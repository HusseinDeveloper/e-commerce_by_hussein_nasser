import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../Assets/images/images/freshcart-logo.svg'
import { UserContext } from '../../Contexts/UserContext'


export default function Navbar() {
  const navigate = useNavigate()

  let {useToken,setUseToken}=useContext(UserContext)

    function handelLogout(){
             localStorage.removeItem('useTaken')
            setUseToken(null);
            navigate('Login')
          
    }
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">
      <img src={logo} alt=""/></Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {useToken? <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home </Link>
        </li>
   
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="Cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Wish">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Categiores">Categiores</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Brands">Brands</Link>
        </li>
      </ul>  </ul>:null }
     
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {useToken? <>
        <li className="nav-item">
           <Link className="nav-link" to='Cart'><i className="fa-solid fa-cart-shopping"></i> </Link>
        </li>  <li className="nav-item">
          <Link to={'/Login'} className="nav-link"
           onClick={()=>{
              handelLogout()
           }}>Logout</Link>
        </li>
      </>    : <>
           
       <li className="nav-item">
          <Link className="nav-link" to="Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Regester">Regestar</Link>
        </li>
      </>}

      </ul>
    </div>
  </div>
</nav>
    </>
  
}
