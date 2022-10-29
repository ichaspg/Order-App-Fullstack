import React from 'react'
import './cashpayment.css'
import cashicon from '../../../assets/cash.png'
import { useSelector } from 'react-redux'

const CashPayment = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const onComplete = () => {
    
  }
  return (
    <div className='paymentdetail-cont'>
      <div className="payment-header">
        <img src={cashicon} alt="" className='payment-header-img-cash' />
        <p className="payment-header-ttl">Cash Payment</p>
      </div>
      <div className="paymentdetail-amount">
        <p className="total-payment-ttl">Total Pembayaran</p>
        <p className="total-payment-amount">Rp.{user.total}</p>
        <p className="payment-instruction">Bayar pesanan sesuai jumlah diatas </p>
        <p className="payment-desc">Segera  lakukan pembayaran anda dikasir setelah melakukan checkout.Tekan tombol dibawah jika anda sudah membayar pesanan anda.</p>
      </div>
      <button className='cash-btn'>Sudah Bayar</button>
    </div>
  )
}

export default CashPayment