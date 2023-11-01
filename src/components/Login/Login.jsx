import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Bars } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'


export default function Login() {
  const { setUseToken, setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  // yup
  // string min max required
  const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Please Enter your password'),
  })

  async function sendData(value) {
    setLoading(true)
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
      const { data } = response
      if (data.message === 'success') {
        localStorage.setItem('useTaken', data.token)
        setUseToken(data.token)
        setUserData(data.user)
        navigate('/') 
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: sendData,
  })

  return (
    <>
      <div className="w-75 mx-auto my-4">
        <h2>Login Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="userEmail">Email :</label>
          <input
            id="userEmail"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}

          <label htmlFor="userPas">Password :</label>
          <input
            type="password"
            className="form-control"
            id="userPas"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}
  <div className="d-flex justify-content-between align-items-center">
            <Link to='' className="h5 forget">forget your password ?</Link>
            </div>
          {isLoading ? (
            <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
          ) : (
            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
          )}
        </form>
      </div>
    </>
  )
}