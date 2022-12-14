import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/icongreen-sm.svg'
import logout from '../../../assets/logout.svg'
import order from '../../../assets/order.svg'
import cashier from '../../../assets/cashier.svg'
import product from '../../../assets/product.svg'
import report from '../../../assets/report.svg'
import './sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem('admin')
    navigate('/adminlogin')
  }
  return (
    <div className='sidebar-cont'>
      <img src={logo} alt="" className='cashier-logo'/>
        <div className="menu-cont">
          <Link to='/order'>
            <img src={order} alt="" className='menu-icon'/>
            <p className="menu-name">Order</p>
          </Link>
          <Link to='/cashier'>
            <img src={cashier} alt="" className='menu-icon'/>
            <p className="menu-name">Cashier</p>
          </Link>
          <Link to={'/product'}>
            <img src={product} alt="" className='menu-icon' />
            <p className="menu-name">Product</p>
          </Link>
        </div>
        <div className="logout" onClick={() => onLogout()}>
          <img src={logout} alt="" className='logout-logo' />
          <p className="menu-name">Logout</p>
        </div>
    </div>
  )
}

export default Sidebar