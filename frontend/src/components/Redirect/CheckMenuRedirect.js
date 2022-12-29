import React from 'react'
import './checkmenuredirect.css'

const CheckMenuRedirect = ({ order, checkButtonClicked }) => {
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }
  return (
    <div className='checkmenu-cont'>
      <div className="checkmenu-header">
        <h1>Your Order</h1>
      </div>
      {order.order.item.map((item) => (
        <div className="order-list-x" key={item._id}>
          <div className="order-desc">
            <img src={`http://localhost:5000/${item.image}`} alt="" className='order-pic' />
            <div className="order-detail">
              <p className="prod-name">{item.name}</p>
              <p className="prod-price">{formatRupiah(item.totalPrice)}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="price-detail">
        <div className="subtotal-cont">
          <p className='sub-title'>Subtotal</p>
          <p className='sub-price'>{formatRupiah(order.subtotal)}</p>
        </div>
        <div className="tax-cont">
          <p className="tax-title">Order Fee</p>
          <p className="tax-price">{formatRupiah(order.subtotal * 0.1)}</p>
        </div>
      </div>
      <button onClick={() => checkButtonClicked(false)} className='back'>Back</button>
    </div>
  )
}

export default CheckMenuRedirect