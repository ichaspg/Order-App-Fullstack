import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = ({ total }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/checkout')
  }

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }
  return (
    <div className="cart-cont">
      <button className='cart-btn' onClick={() => handleClick()}>Place Order - {formatRupiah(total)}</button>
    </div>
  )
}

export default Cart