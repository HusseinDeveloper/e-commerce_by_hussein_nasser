import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext=createContext()

export default function CartContextProvider({children}){

    let [cardId,setCardId]=useState(null)

    const headers ={
        token:localStorage.getItem('useTaken')
       }

    function AddProductToCart(id){
      return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
          productId:id
        },
        {
            headers
        }).then(res=>res)
        .catch(err=>err)
        
    }


    function getProductCart(){
        return  axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {
              headers
          }).then(res=>res)
          .catch(err=>err)
          
      }

       function removeItem(id){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers
        }).then(res=>res)
        .catch(err=>err)
     }

     function updateItem(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
        ,{

            count
        }
        ,{
           headers
         }).then(res=>res)
         .catch(err=>err)
      }

     function onlinePayment(cardId,url,values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`
        ,{
            shippingAddress:values
        }
        ,{
           headers
         }).then(res=>res)
         .catch(err=>err)
      }


      async function getCard(){

        let {data}=await getProductCart()
       
        setCardId(data?.data._id)
       
    }

    useEffect(()=>{
        getCard()
    },[])






    function getBrands(){
        return  axios.get('https://ecommerce.routemisr.com/api/v1/brands',
          {
              headers
          }).then(res=>res)
          .catch(err=>err)
          
      }





    function getCategory(){
        return  axios.get('https://ecommerce.routemisr.com/api/v1/categories',
          {
              headers
          }).then(res=>res)
          .catch(err=>err)
          
      }



    return <CartContext.Provider value={{getCategory,getBrands,AddProductToCart,cardId,getProductCart,removeItem,updateItem,onlinePayment}}>
        {children}
    </CartContext.Provider>
}