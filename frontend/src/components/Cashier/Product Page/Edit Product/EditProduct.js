import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './editproduct.css'

const EditProduct = ({product,handleCancel}) => {
  const [productName,setProductName] = useState(product.name)
  const [productCategory,setProductCategory] = useState(product.category)
  const [productPrice,setProductPrice] = useState(product.price)
  const [productDesc,setProductDesc] = useState(product.description)
  const [status,setStatus] = useState(product.status)

  const image =  product.image
  // URL.createObjectURL(image)
  const [file,setFile] =  useState(image)
  

  const statusButtonClicked = (stat) => {
    setStatus(stat)
  }
   const onInputChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleChangeImage = () => {
    const formData = new FormData()
    formData.append('image',file)
    axios.patch('http://localhost:5000/api/foods/' + product._id,formData,{
      headers:{
        "Content-type" : "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name',productName)
    formData.append('category',productCategory)
    formData.append('price',productPrice)
    formData.append('description',productDesc)
    formData.append('status',status)
    axios.put('http://localhost:5000/api/foods/' + product._id,formData,{
      headers:{
        "Content-type" : "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    handleCancel(false)
    // window.location.reload();
  }
  return (
    <div className='popup-cont'>
      <div className="form-cont-lg">
      <p className='edit-title'>Edit Product Information</p>
        <div className="edit-form">
         <div className="edit-image-cont">
              <img src={`http://localhost:5000/${product.image}`} alt="" className='edit-prod-img'/>
              <input type='file' onChange={onInputChange}/>
              <button className='edit-img-btn' onClick={() => handleChangeImage()}>Change Image</button>
            </div>
          <form action="">
            <p>
              <label htmlFor="name">Name</label>
              <input 
              type="text" 
              placeholder='Item Name'
              value={productName} 
              onChange={(e) => setProductName(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="category">Category</label>
              <input 
              type="text" 
              placeholder='Item Name'
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)} 
              />
            </p>
            <p>
              <label htmlFor="price">Price</label>
              <input 
              type="text" 
              placeholder='Item Name'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
               />
            </p>
            <p>
              <label htmlFor="description">Description</label>
              <input 
              type="text" 
              placeholder='Item Name'
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
               />
            </p>
            <p>
              <label htmlFor="Status">{`Status : ${status}`}</label>
              <div className="status-btn-cont">
                <button className="available-btn" type='button' onClick={() => statusButtonClicked("Available")}>Available</button>
                <button className="out-btn" type='button' onClick={() => statusButtonClicked("Out")}>Out of Stock</button>
              </div>
            </p>
        </form>
        </div>
        <div className="edit-btn-cont">
          <input type="submit" value="Submit" onClick={()=>handleSubmit()}/>
          <button className='cancel-edit-btn' onClick={()=>handleCancel(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditProduct