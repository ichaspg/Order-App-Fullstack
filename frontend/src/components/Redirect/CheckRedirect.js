import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './checkredirect.css'
import waitimage from '../../assets/wait.svg'
import declineimage from '../../assets/decline.svg'
import successimage from '../../assets/success.svg'

const CheckRedirect = () => {
  const user = useSelector((state) => state.order.user)
  const navigate = useNavigate()
  const [status,setStatus] = useState()

  const orderAgainButtonClicked = () => {
    navigate('/')
  }
  useEffect(() => {

    const interval = setInterval(() => {
        // Poll the server for new data.
       axios.get('http://localhost:5000/api/order/' + user._id)
       .then((res) => {
          console.log(res);
          setStatus(res.data.status)
       })
       .catch((err) => {
        console.log(err);
       })
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // if (status === "Waiting for Payment") {
  //   setStatus("Waiting for Payment")
  // }if (status === "Paid") {
  //   setStatus("Paid")
  // }if (status === 'Declined') {
  //   setStatus('Declined')
  // }
  return (
    <div className='checkred-cont'>
      {status === "Waiting for Payment" && <img src={waitimage}></img>}
      {status === "Paid" && <div className='successred-cont'>
      <img src={successimage}></img>
      <button onClick={() => orderAgainButtonClicked()}>Click to Order Again</button>
      </div>}
      {status === "Declined" && <img src={declineimage}></img>}
    </div>
  )
}

export default CheckRedirect