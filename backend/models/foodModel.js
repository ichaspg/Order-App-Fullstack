const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
  name:{
    type:String,
    required: [true,'Please add Name']
  },
  category:{
    type:String,
    required: [true,'Please choose Category']
  },
  price:{
    type:Number,
    require:[true,'Please add Price'],
  },
  description:{
    type:String,
    required: [true,'Please add Description']
  },
  status:{
    type:String,
    required: [true,'Please add Status']
  },
  image:{
    type:String,
  },
  discount:{
    type:Number,
  }
},{timestamps: true})

module.exports = mongoose.model('Food',foodSchema)