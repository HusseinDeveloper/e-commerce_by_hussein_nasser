import React, { useContext, useEffect, useState } from 'react'
import style from './Categiores.module.css'
import { CartContext } from '../../Contexts/CartContext'
import { RotatingLines } from "react-loader-spinner";

export default function Categiores() {
  const { getCategory } = useContext(CartContext)
  const [categories, setCategories] = useState(null)
  const [Loading, setLoading] = useState(true) 

  async function fetchCategories() {
    const { data } = await getCategory()
    setCategories(data.data)
    setLoading(false) 
    console.log(data);
  }

  useEffect(() => {
    fetchCategories()
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
            categories?.map((category) => (
              <div className="col-md-4" key={category.id}>
                <div className="my-3 border border-1 cursor-pointer">
                  <img width={346} height={300} src={category.image} alt="" />
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