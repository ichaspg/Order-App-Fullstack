import React from 'react'
import './redirect.css'
import placed from '../../assets/placed.svg'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const handleClick = () => {
    if (user.method === 'BCA Transfer') {
      navigate('/bcatransferpayment')
    }if (user.method  === 'QRIS') {
      navigate('/qrispayment')
    }if (user.method  === 'Cash Payment') {
      navigate('/cashpayment')
    }
  }
  return (
    <div className='redirect-cont'>
      <div className="redimg-cont">
        <img src={placed} alt=""/>
      </div>
      <div className="backtobtn-cont">
        <button className='backtobtn' onClick={() => handleClick()}>Back to Payment</button>
      </div>
    </div>
  )
}

export default Redirect