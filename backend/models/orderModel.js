const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User'
  },
  userName:{
    type:String
  },
  tablenumber:{
    type:Number
  },
  method:{
    type:String
  },
  order:{
    item:[{
      id:{type:String},
      image:{type:String},
      name:{type:String},
      quantity:{type:Number},
      totalPrice:{type:Number},
      _id:false
    }],
  },
  subtotal:{type:Number},
  total:{type:Number},
  status:{type:String},
  orderType:{type:String},
  paymentPic:{type:String},
},{
  timestamps:true
})

module.exports = mongoose.model('Order',orderSchema)