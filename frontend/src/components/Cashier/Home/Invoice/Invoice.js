import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../../../assets/icongreen-sm.svg'
import './invoice.css'


const Invoice = () => {
  const info = useSelector((state) => state.order.user)
  const [order,setOrder] = useState(info)
  // window.print()
  return (
    <div className='invoice-body'>
      <div className="bill-header">
      <img src={logo} className='bill-logo' />
      <h4>KONA GELATO</h4>
      </div>
      <p className='address'>Jl. Citeureup No.145, Citeureup, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40512</p>
      <div className="bill-content">
        <div className="bill-ident">
          <p>Order ID : {order._id}</p>
          <p>Name : {order.userName}</p>
          <p>Type : {order.orderType}</p>
          <p>Table Number : {order.tablenumber}</p>
        </div>
        <p>----------------------------</p>
        <div className="bill-item">
          {order.order.item.map((item) => (
            <div className="bill-item" key={item._id}>
              <p>{item.name} <span>x{item.quantity}</span></p>
              <p>Rp.{item.totalPrice}</p>
            </div>
          ))}
          <p>Tax : Rp.{order.subtotal * 0.1}</p>
          <p>Total : Rp.{order.total + (order.subtotal * 0.1)}</p>
          <p>----------------------------</p>
          <p>Thanks For Ordering</p>
          <p>&#169;KONA GELATO</p>
        </div>
      </div>
    </div>
  )
}

export default Invoice