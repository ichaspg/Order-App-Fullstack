import React from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectLogin = () => {
  const navigate = useNavigate()
  const redirectButton = () => {
    navigate('/adminlogin')
  }
  return (
    <div className='admin-log-cont-red' >
      <h1>Please Log In First !!</h1>
      <button className='admin-submit-btn' onClick={() => redirectButton()}>Back to Login Page</button>
    </div>
  )
}

export default RedirectLogin