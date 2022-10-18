const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Get User
//@route GET /api/user
//@access Private
const getUsers = asyncHandler (async (req,res) => {
  const user = await User.find()
  res.status(200).json(user)
})

//@desc Register User
//@route SET /api/user
//@access Public
const registerUser = asyncHandler( async (req,res) => {
  if (!req.body.name && !req.body.tablenumber) {
    res.status(400)
    throw new Error('Please fill all the form')
  }
  const user = await User.create({
    name:req.body.name,
    email:req.body.email,
    tablenumber:req.body.tablenumber,
    status:req.body.status,
  })
  res.status(200).json(user)
})

//@desc Delete User
//@route DELETE /api/user
//@access Private
const deleteUser = asyncHandler (async (req,res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error('Food not Found')
  }
  await user.remove()
  res.status(200).json({id: req.params.id})
})


module.exports = {
  getUsers,
  registerUser,
  deleteUser,
}
