import React from 'react'
import style from './Gured.module.css'
import { Navigate } from 'react-router-dom'


export default function Gured(props) {

if(localStorage.getItem('useTaken') != null){

return props.children
}else {

    return <Navigate to={'/Login'} />
}

}
