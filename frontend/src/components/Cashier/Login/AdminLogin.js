import React, { useState } from 'react'
import './admin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const AdminLogin = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      userName: username,
      password: password
    }
    const url = "http://localhost:5000/api/admin/login"
    axios.post(url,adminData)
    .then(res => {
      console.log(res)
      localStorage.setItem('admin',JSON.stringify(res.data))
      navigate('/cashier')
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div className='admin-log-cont' >
      <h1>Employee Login</h1>
      <form  className='form-admin' onSubmit={handleSubmit}>
        <label htmlFor="username">User Name
          <input 
          type="text" 
          placeholder='Username' 
          name='username' 
          className='txt-input'
          onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="passowrd">Password
          <input 
          type="password" 
          placeholder='Password' 
          name='password' 
          className='txt-input'
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link to={'/'}>Having Trouble Sign In ?</Link>
        <button type="submit" className='admin-submit-btn'>Sign IN</button>
      </form>
    </div>
  )
}

export default AdminLogin