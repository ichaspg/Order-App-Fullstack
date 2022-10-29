import axios from 'axios'
import React,{useState} from 'react'
import imageicon from '../../../../assets/image-icon.svg'
import './addproduct.css'
import 'react-dropdown/style.css';


const AddProduct = ({handleCancel,reRender}) => {
  const [productName,setProductName] = useState('')
  const [productCategory,setProductCategory] = useState('Signature')
  const [productPrice,setProductPrice] = useState('')
  const [productDesc,setProductDesc] = useState('')
  const [file,setFile] = useState(null)
  const [preview,setPreview] = useState('')

  const loadImage = (e) => {
    const image = e.target.file
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }
  const handleChange = (event) => {
    setProductCategory(event.target.value)
  }

  const onInputChange = (e) => {
    setFile(e.target.files[0])
    const image = e.target.file[0]
    setPreview(URL.createObjectURL(image))
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name',productName)
    formData.append('category',productCategory)
    formData.append('price',productPrice)
    formData.append('description',productDesc)
    formData.append('image',file)
    formData.append('status','Available')
    axios.post('http://localhost:5000/api/foods',formData)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    handleCancel(false)
    reRender(1)
    window.location.reload();
  }
  return (
    <div className='popup-cont'>
      <div className="form-cont-lg">
        <p className="add-title">Edit Product Information</p>
          <div className="add-form">
            <form action="">
              <div className="add-img-cont">
              {preview ? (
                <img src={preview} alt="" className='add-prod-img' />
                ):<img src={imageicon} alt="" className='add-prod-img' />}
                <input type='file' className='add-img-btn' onChange={onInputChange} />
              </div>
              <p>
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                placeholder='Item Name'
                onChange={(e) => setProductName(e.target.value)}
                 />
              </p>
              <p>
                <label htmlFor="category">Category</label>
                <select name="category" onChange={handleChange} value={productCategory}>
                  <option value="Signature">Signature</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Manual Brew">Manual Brew</option>
                  <option value="Milk Base">Milk Base</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Tea">Tea</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Snack">Snack</option>
                </select>
              </p>
              <p>
                <label htmlFor="price">Price</label>
                <input 
                type="text"
                placeholder='Item Price'
                onChange={(e) => setProductPrice(e.target.value)}
                 />
              </p>
              <p>
                <label htmlFor="description">Description</label>
                <input 
                type="text"
                placeholder='Item Description'
                onChange={(e) => setProductDesc(e.target.value)}
                 />
              </p>
            </form>
          </div>
          <div className="add-btn-cont">
            <input type="submit" value="Add Item" onClick={() => handleSubmit()} />
            <button className='cancel-add-btn' onClick={() => handleCancel(false)}>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default AddProduct