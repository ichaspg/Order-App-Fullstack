const express = require('express')
const colors =require('colors')
const dotenv = require('dotenv').config()
const multer = require('multer')
const path = require('path')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'./uploads');
  },
  filename:(req,file,cb) => {
    cb(null,new Date().getTime()+ file.originalname.replace(/\\/g, "/"))
  }
})

const fileFilter = (req,file,cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null,true)
  }else {
    cb(null,false)
  }
}
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/foods',require('./routes/foodRoutes'))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/order',require('./routes/orderRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`Server Start at ${port}`))