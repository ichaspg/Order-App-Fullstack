import React, { useState } from 'react'
import './admin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import ErrorModal from './ErrorModal';

const AdminLogin = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)
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
      setError(true)
    })
  }
  return (
    <div className='admin-log-cont' >
    {error && <ErrorModal handleCancel = {value => setError(value)}/>}
      <h1>Employee Login</h1>
      <form  className='form-admin' onSubmit={handleSubmit}>
        <label htmlFor="username">User Name
          <input 
          type="text" 
          placeholder='Username' 
          name='username' 
          className='txt-input'
          required
          onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="passowrd">Password
          <input 
          type="password" 
          placeholder='Password' 
          name='password' 
          className='txt-input'
          required
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className='admin-submit-btn'>Sign In</button>
      </form>
    </div>
  )
}

export default AdminLogin