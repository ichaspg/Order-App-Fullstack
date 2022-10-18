const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please enter your Name']
  },
  email:{
    type:String,
    required:[true,'Please enter your Email']
  },
  tablenumber:{
    type:Number,
    required:[true,'Please enter Table NUmber']
  },
  status:{
    type:String,
    require:[true,'Status not Found'],
  }
},
{
  timestamps: true,
})

module.exports = mongoose.model('User',userSchema)
