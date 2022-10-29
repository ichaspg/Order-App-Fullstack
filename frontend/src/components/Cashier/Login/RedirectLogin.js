import React from 'react'
import { useNavigate } from 'react-router-dom'
import forbiddenicon from '../../../assets/403.svg'

const RedirectLogin = () => {
  const navigate = useNavigate()
  const redirectButton = () => {
    navigate('/adminlogin')
  }
  return (
    <div className="forb-container">
      <img src={forbiddenicon} alt="forb-image" className='403-image' />
      <h3>Access Denied</h3>
      <p>You're not allowed to access this page</p>
      <button onClick={() => redirectButton()}>Go to Login Page</button>
    </div>
  )
}

export default RedirectLogin