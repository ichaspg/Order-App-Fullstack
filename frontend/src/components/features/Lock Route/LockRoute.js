import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Redirect from '../../Redirect/Redirect'


const LockRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [status,setStatus] = useState(true)
  useEffect(() => {
    if (user?.status === null) {
    setStatus(true)
  } if (user?.status === 'Ordering') {
    setStatus(true)
  }if (user?.status === 'Waiting for Payment') {
    setStatus(false)
  }
  },[user])
  return (
    status ? <Outlet/> : <Redirect/>)
}

export default LockRoute