import React from 'react'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Categiores from './components/Categiores/Categiores'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Regester from './components/Regester/Regester'
import ProductDetals from './components/ProductDetals/ProductDetals'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Market from './components/Market/Market'
import NotFound from './components/NotFound/NotFound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserContextProvider from './Contexts/UserContext'
import Gured from './components/Gured/Gured'
import CartContextProvider from './Contexts/CartContext'
import Address from './components/Address/Address'
import Order from './components/Order/Order'
import Wish from './components/Wish/Wish'


let Routers=createBrowserRouter([
  {path:'/',element:<Layout/>,children :[
    {index:true,element:<Gured><Home/></Gured>},
    {path:'Brands',element:<Gured><Brands/></Gured>},
    {path:'Categiores',element:<Gured><Categiores/></Gured> },
    {path:'/Cart',element:<Gured><Cart/></Gured>},
    {path:'Product/:id',element:<Gured><ProductDetals/></Gured>},
    {path:'Products',element:<Gured><Products/></Gured>},
    {path:'Brands',element:<Gured><Brands/></Gured>},
    {path:'Wish',element:<Gured><Wish/></Gured>},
    {path:'Address',element:<Gured><Address/></Gured>},
    {path:'allorders',element:<Gured><Order/></Gured>},
    {path:'Regester',element:<Regester/>},
    {path:'Login',element:<Login/>},
    {path:'Logout',element:<Logout/>},
    {path:'Market',element:<Market/>},
    {path:'*',element:<Gured><NotFound/></Gured>},
  ]}
])
export default function App() {
  return (
    <div>
      <UserContextProvider>
        <CartContextProvider>
    <RouterProvider router={Routers}/>
    </CartContextProvider>
    </UserContextProvider>
    </div>
      )
}
