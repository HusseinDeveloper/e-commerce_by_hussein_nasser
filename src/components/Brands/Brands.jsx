import React, { useContext, useEffect, useState } from 'react'
import style from './Brands.module.css'
import { CartContext } from '../../Contexts/CartContext'
import { RotatingLines } from "react-loader-spinner";


export default function Categiores() {
  const { getBrands } = useContext(CartContext)
  const [Brand, setBrand] = useState(null)
  const [Loading, setLoading] = useState(true) 


 async function fetchBrand() {
      
        const { data } = await getBrands()
         setBrand(data.data)
         setLoading(false) 
        console.log(data);
     
    }


  useEffect(() => {
   
    fetchBrand()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
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
            Brand?.map((category) => (
              <div className="col-md-4" key={category.id}>
                <div className="my-3 border border-1 cursor-pointer">
                  <img width={250} height={250} src={category.image} alt="" />
                  <h5 className='text-center my-2'>{category.name}</h5>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}