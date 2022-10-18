const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  userName: {
    type:String,
    unique:true,
    required:[true,'Please enter username']
  },
  password:{
    type:String,
    required:[true,'Please enter Password']
  },
},
{
  timestamps:true,
})

module.exports = mongoose.model('Admin',adminSchema)