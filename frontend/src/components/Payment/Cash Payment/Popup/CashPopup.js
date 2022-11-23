import React from 'react'
import { useNavigate } from 'react-router-dom'


const CashPopup = () => {
  const navigate = useNavigate()
  const orderAgainButton = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className="overlay">
    <div className="item-cont">
      {/* <img src={qrisicon} alt="" className='bank-img' />
      <img src={qrcode} alt="" className='qr-img'/> */}
      <p className="desc">
      <p className='popup-span'>Pembayaran Berhasil ! </p>
      Terimakasih sudah memesan.Mohon tunggu pesanan anda akan segera diantarkan.
      </p>
      <button className='orderagain-btn' onClick={() => orderAgainButton()}>Click to Order Again</button>
    </div>
  </div>
  )
}

export default CashPopup