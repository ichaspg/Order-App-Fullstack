import React, { useEffect, useState } from 'react'
import './cashpayment.css'
import cashicon from '../../../assets/cash.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CashPopup from './Popup/CashPopup'

const CashPayment = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userInfo = useSelector((state) => state.order.user)
  const [status,setStatus] = useState()
  const navigate = useNavigate()
  useEffect(() => {

    const interval = setInterval(() => {
        // Poll the server for new data.
       axios.get('http://localhost:5000/api/order/' + user._id)
       .then((res) => {
          console.log(res);
          setStatus(res.data.status)
       })
       .catch((err) => {
        console.log(err);
       })
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
    <div className='paymentdetail-cont'>
      {status ==="Paid" && <CashPopup/>}
      <div className="payment-header">
        <img src={cashicon} alt="" className='payment-header-img-cash' />
        <p className="payment-header-ttl">Cash Payment</p>
      </div>
      <div className="paymentdetail-amount">
        <p className="total-payment-ttl">Total Pembayaran</p>
        <p className="total-payment-amount">Rp.{userInfo.order.totalAllPrice}</p>
        <p className="payment-instruction">Bayar pesanan sesuai jumlah diatas </p>
        <p className="payment-desc">Segera  lakukan pembayaran anda dikasir setelah melakukan checkout.</p>
      </div>
    </div>
    </>
  )
}

export default CashPayment