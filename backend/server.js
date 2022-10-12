const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/foods',require('./routes/foodRoutes'))
app.use(errorHandler)

app.listen(port,() => console.log(`Server Start at ${port}`))