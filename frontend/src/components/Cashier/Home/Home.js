import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { orderActions } from '../../../store/orderSlice'
import useFetch from '../../../useFetch'
import Sidebar from '../Sidebar/Sidebar'
import DeleteModal from './Delete Popup/DeleteModal'
import './home.css'
import Invoice from './Invoice/Invoice'
import PaymentModal from './Payment Popup/PaymentModal'


const Home = () => {
  const {data,isLoading,error} = useFetch('http://localhost:5000/api/order')
  const [selectedOrder,setSelectedOrder] = useState();
  const [deleteBtn,setDeleteBtn] = useState(false);
  const [paymentBtn,setPaymentBtn] = useState(false);
  const [order,setOrder] = useState(data)
  const [status,setStatus] = useState()
  const dispatch = useDispatch()
  const flag = true
  useEffect(() => {
    setOrder(data)
  },[data])
  const handleClick = (i) => {
    const selected = data.find(order => order._id === i)
    setSelectedOrder(selected)
    
  }
  const deleteOrderBtn = (i) => {
    setDeleteBtn(true)
  }

  const checkPaymentBtn = (i) => {
    setPaymentBtn(true)
  }

  const categoryFilter = (categoryOrder) => {
    const result = data.filter((filteredOrder) => {
      return filteredOrder.status === categoryOrder
    });
  setOrder(result)
  }

  const orderTypeCategory = (orderType) => {
    const result = order.filter((filterType) => {
      return filterType.orderType === orderType
    })
  setOrder(result)
  }
   //======================Searchbar===========================================
  const [filter,setFilter] = useState('')
  const searchText = (e) => {
    setFilter(e.target.value)
  }
  let dataSearch = order.filter(item => {
    return Object.keys(item).some(key => 
      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  })


  const onComplete = (i) => {
    setStatus({status : 'Complete'})
    axios.patch('http://localhost:5000/api/order/' + selectedOrder._id,{
      status: "Complete"
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    dispatch(orderActions.userInfo(selectedOrder))
    window.open('/invoice','_blank')
    window.location.reload();
  }
  return (
    <>
    <div className="cashier-cont2">
      <Sidebar/>
      {!flag && <Invoice order={selectedOrder}/>}
      {paymentBtn && <PaymentModal order={selectedOrder} handleCancel={value => setPaymentBtn(value)} />}
      {deleteBtn && <DeleteModal order={selectedOrder} handleCancel={value => setDeleteBtn(value)} />}
      <div className="home-cont">
          <div className="order-list-admin">
          <div className="order-list-header">
          <h1 className='home-ttl'>Order List</h1>
          <div className="search-bar-order">
            <input 
            type="text" 
            value={filter}
            placeholder='Search Order'
            onChange={searchText.bind(this)}
             />
          </div>
          </div>
          <div className="category-order-cont">
            <button className='category-order' type='button' onClick={() => setOrder(data)}>All Order</button>
            <button className='category-order' type='button' onClick={() => categoryFilter('Waiting for Payment')}>Waiting Payment</button>
            <button className='category-order' type='button' onClick={() => categoryFilter('Paid')}>Paid</button>
            <button className='category-order' type='button' onClick={() => categoryFilter('Complete')}>Complete</button>
            <button className='category-order' type='button' onClick={() => categoryFilter('Declined')}>Declined</button>
          </div>
          {/* <button onClick={() => orderTypeCategory("Dine In")}>Dine In</button>
          <button onClick={() => orderTypeCategory("Take Away")}>Take Away</button> */}
            <div className="order-card-list">
            {dataSearch.map((item,index) => (
              <div className="order-card" key={item._id} onClick={()=> handleClick(item._id)}>
              <div className="table-type">
                <p className="order-table">Table {item.tablenumber}</p>
                <p>{`${item.orderType}`}</p>
              </div>
                <div className="order-detail-sm">
                  <p className="order-receiver">Recepient : {item.userName}</p>
                  <p className="order-id">Order ID : {item._id}</p>
                  <p className="order-id">Order ID : {item.createdAt}</p>

                </div>
                {item.status === 'Waiting for Payment' && <p className="order-status-wait">{item.status}</p>}
                {item.status === 'Checking Payment' && <p className="order-status-check">{item.status}</p>}
                {item.status === 'Paid' && <p className="order-status-paid">{item.status}</p>}
                {item.status === 'Complete' && <p className="order-status-complete">{item.status}</p>}
                {item.status === 'Declined' && <p className="order-status-decline">{item.status}</p>}
                
              </div>
            ))}
          </div>
        </div>
          {selectedOrder && <div className="detail-cont">
            <h1>Current Order</h1>
            {selectedOrder && 
            <div className='order-detail' key={selectedOrder._id}>
              <div className="detail-header-lg">
              <div className="table-type">
                <p className="order-table">Table {selectedOrder.tablenumber}</p>
                <p>{selectedOrder.orderType}</p>
              </div>
                <div className="order-detail">
                  <p className="order-receiver">Recipent : {selectedOrder.userName}</p>
                  <p className="order-id">ID:{selectedOrder._id}</p>
                </div>
              </div>
              <div className="selected-order">
                {selectedOrder.order.item.map((item)=> (
                  <div className="order-detail-list" key={item._id}>
                    <img src={`http://localhost:5000/${item.image}`} alt="" className='order-img' key={item._id}/>
                    <div className="product-detail">
                      <p className="item-name">{item.name} <span>x{item.quantity}</span></p>
                      <p className="item-price">Rp.{item.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="current-btn-cont">
              <button className='check-btn' onClick={()=> checkPaymentBtn(selectedOrder._id)}>Check Payment</button>
              <button className='delete-order-btn' onClick={() => deleteOrderBtn(selectedOrder._id)}>Delete Order</button>
              </div>
              <div className="price-detail-cashier">
                <div className="subtotal-detail">
                  <p>Subtotal</p>
                  <p>Rp.{selectedOrder.subtotal}</p>
                </div>
                <div className="tax-detail">
                  <p>Tax (10%)</p>
                  <p>Rp.{selectedOrder.subtotal * 0.1}</p>
                </div>
                <div className="total-detail">
                  <p>Total</p>
                  <p>Rp.{selectedOrder.total}</p>
                </div>
              </div>
              {selectedOrder.status === 'Paid' && <button className='complete-btn' onClick={() => onComplete(selectedOrder._id)}>Complete Transaction</button>}
            </div>
            }
          </div>}
      </div>
    </div>
    </>
  )
}

export default Home