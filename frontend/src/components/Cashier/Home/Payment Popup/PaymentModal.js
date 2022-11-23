import axios from 'axios'
import React from 'react'
import './paymentmodal.css'

const PaymentModal = ({order,handleCancel}) => {
  const approveButtonClicked = () => {
    axios.patch('http://localhost:5000/api/order/' + order._id,{
      status: "Paid"
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    window.location.reload();
  }

  const declineButtonClicked = () => {
      axios.patch('http://localhost:5000/api/order/' + order._id,{
      status: "Declined"
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    window.location.reload();
  }
  return (
    <div className="popup-cont">
      <div className='pay-modal-cont'>
        <p className="close-btn-sm" onClick={() => handleCancel(false)}>X</p>
        <img src={`http://localhost:5000/${order.paymentPic}`} alt="" className='payment-img' />
        <div className="check-payment-btn-cont">
          <button className='approve-btn' onClick={() => approveButtonClicked()}>Approve</button>
          <button className='decline-btn' onClick={() => declineButtonClicked()}>Decline</button>
        </div>  
      </div>
    </div>
  )
}

export default PaymentModal