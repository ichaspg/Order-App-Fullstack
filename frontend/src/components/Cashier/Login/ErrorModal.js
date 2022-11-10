import React from 'react'

const ErrorModal = ({handleCancel}) => {
  return (
    <div className='popup-cont'>
      <div className="delete-cont">
        <h2 className='wrong-txt'>Wrong Credential !</h2>
        <button className='try-again-btn' onClick={() => handleCancel(false)}>Try Again</button>
      </div>
    </div>
  )
}

export default ErrorModal