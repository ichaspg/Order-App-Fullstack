import React, { useState } from 'react'
import './qrispayment.css'
import qrisicon from '../../../assets/qris.png'
import Popup from './Popup/Popup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../../store/orderSlice'

const QrisPayment = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userInfo = useSelector((state) => state.order.user)
  const [image, setImage] = useState()
  const [status, setStatus] = useState(user.status)
  const [userData, setuserData] = useState(user)
  const navigate = useNavigate()
  const [id, setId] = useState()
  const dispatch = useDispatch()
  console.log(userInfo);
  const onInputChange = (e) => {
    setImage(e.target.files[0])
  }
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image', image)
    axios.put('http://localhost:5000/api/order/' + user._id, formData, {
      headers: {
        "Content-type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res)
        setId(res._id)
      })
      .catch(err => {
        console.log(err)
      })
    setStatus('Checking Payment')
    setuserData({ ...user, status })
    dispatch(orderActions.userInfo({ ...user, status, orderID: id }))
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/checkredirect')
  }

  const [popup, setPopup] = useState(false)
  const handleClick = (value) => {
    setPopup(value)
  }
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  return (
    <div className='paymentdetail-cont'>
      {popup && <Popup popup={popup} handleCancel={value => handleClick(value)} />}
      <div className="payment-header">
        <img src={qrisicon} alt="" className='payment-header-img' />
        <p className="payment-header-ttl">QRIS Payment</p>
      </div>
      <div className="paymentdetail-amount">
        <p className="total-payment-ttl">Total Pembayaran</p>
        <p className="total-payment-amount">{formatRupiah(userInfo.order.totalAllPrice)}</p>
        <p className="payment-instruction">Bayar pesanan sesuai jumlah diatas </p>
        <p className="payment-desc">Segera  lakukan pembayaran anda setelah melakukan checkout.Jika dalam waktu 15 menit bukti transfer belum diunggah, maka order dianggap batal dan anda akan dikembalikan ke menu utama</p>
      </div>
      <div className="payment-step-cont">
        <p className="payment-step-ttl">Cara Pembayaran</p>
        <p className='payment-step'>1.Klik tombol “Bayar Sekarang” dibawah ini <br /> <br />
          2.Akan muncul jumlah yang harus dibayar ikuti langkah pembayaran lalu laman akan menampilkan kode <br /> <br />
          3.Screenshot kode QR tadi lalu selesaikan pembayaran menggunakan aplikasi mBanking,Gopay,OVO,Dana,Shopee Pay atau aplikasi pembayaran lain yang mendukung QRIS <br /> <br />
          4.Unggah bukit pembayaran dalam 15 menit <br /> <br />
          5.Demi kemanan transaksi dimohon untuk tidak memberikan bukti transfer kepada siapapun,selain mengupload via website KONA</p>
        <button className='popup-btn' onClick={() => handleClick(true)}>Bayar Sekarang</button>
      </div>
      <div className="upload-btn-cont">
        <div className="timer-cont">
          <p className='timer'>Selesaikan Dalam 15:00</p>
        </div>
        <div className="uploadbtn-cont">
          <input type="file" className='file' name='file' onChange={onInputChange} />
          <button className='upload-btn' onClick={() => handleUpload()}>Upload Bukti Transfer</button>
        </div>
      </div>
    </div>
  )
}

export default QrisPayment