import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminLogin from '../../Cashier/Login/AdminLogin'
import RedirectLogin from '../../Cashier/Login/RedirectLogin'
import Redirect from '../../Redirect/Redirect'


const useAuth = () => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  return admin
}
const AuthRoute = () => {
  // const admin = JSON.parse(localStorage.getItem('admin'))
  // const [token,setToken] = useState('')
  // useEffect(() => {
  //   if (admin?.token === null) {
  //     setToken(false)
  //   }if (admin?.token) {
  //     setToken(admin)
  //   }
  // },[admin])
  const auth = useAuth()
  return (
    auth ? <Outlet/> : <RedirectLogin/>)
}

export default AuthRoute