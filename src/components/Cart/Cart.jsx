import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Contexts/CartContext'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner";

export default function Cart() {
  let [CartData, setCartData] = useState(null)
  let { getProductCart, removeItem, updateItem } = useContext(CartContext)
  let [Loading, setLoading] = useState(true)

  async function getCartData() {
    let { data } = await getProductCart()
    setCartData(data)
    setLoading(false)
    console.log(data);
  }

  useEffect(() => {
    getCartData()
  }, [])

  async function removeCartData(id) {
    let { data } = await removeItem(id)
    console.log(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateItem(id, count)
    setCartData(data)
    console.log(data);
  }

  return (
    <>
      {Loading ? (
        <div className="bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
            strokeColor="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        CartData ? (
          <div className='bg-body-tertiary my-3 mx-auto w-75 p-4'>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Shop Cart</title>
            </Helmet>
            <h3>Shop Cart</h3>
            <h4 className='h5 text-main'> Cart Items : {CartData.numOfCartItems}</h4>
            <h5 className='text-main mb-5'>Total Price : {CartData.data.totalCartPrice}</h5>
            {CartData.data.products.map((item) => (
              <div key={item._id} className="row my-3">
                <div className="col-md-2">
                  <img className='w-75' src={item.product.imageCover} alt="" />
                </div>
                <div className="col-md-10 d-flex justify-content-between">
                  <div>
                    <h5 className='h6'>{item.product.title}</h5>
                    <h5 className='text-main h6'> Price : {item.price}</h5>
                    <button onClick={() => removeCartData(item.product._id)} className='btn '><i className='fa fa-trash text-main me-1'></i> Remove</button>
                  </div>
                  <div>
                    <button onClick={() => updateCount(item.product._id, item.count + 1)} className='btn btn-brdr'> <i className='fas fa-plus'></i></button>
                    <span className='mx-2'>{item.count}</span>
                    <button onClick={() => updateCount(item.product._id, item.count - 1)} className='btn btn-brdr'> <i className='fas fa-minus'></i></button>
                  </div>
                </div>
              </div>
            ))}
            <div className=' d-flex justify-content-center'>
              <Link to="/Address" className='btn bg-main text-white w-25 m-2'>Online Payment</Link >
              <button className=' btn bg-main text-white w-25 m-2'>Cash On Delivery</button>
            </div>
          </div>
        ) : null
      )}
    </>
  )
}
