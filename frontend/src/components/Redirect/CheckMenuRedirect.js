import React from 'react'
import './checkmenuredirect.css'

const CheckMenuRedirect = ({order,checkButtonClicked}) => {
  return (
    <div className='checkmenu-cont'>
      <div className="checkmenu-header">
        <h1>Your Order</h1>
      </div>
      {order.order.item.map((item) => (
        <div className="order-list-x" key={item._id}>
          <div className="order-desc">
            <img src={`http://localhost:5000/${item.image}`} alt="" className='order-pic'/>
          <div className="order-detail">
            <p className="prod-name">{item.name}</p>
            <p className="prod-price">Rp.{item.totalPrice}</p>
         </div>
          </div>
        </div>
      ))}
        <div className="price-detail">
          <div className="subtotal-cont">
            <p className='sub-title'>Subtotal</p>
            <p className='sub-price'>Rp.{order.subtotal}</p>
          </div>
          <div className="tax-cont">
            <p className="tax-title">Order Fee</p>
            <p className="tax-price">Rp.{order.subtotal * 0.1}</p>
          </div>
        </div>
        <button onClick={() => checkButtonClicked(false)} className='back'>Back</button>
    </div>
  )
}

export default CheckMenuRedirect