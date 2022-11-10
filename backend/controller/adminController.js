const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

// @desc    Register admin
// @route   POST /api/admin
// @access  private
const registerAdmin = asyncHandler(async(req,res) => {
  const {userName,password} = req.body

  //validasi request
  if (!userName && !password) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  //cek admin terdaftar
  const adminExist = await Admin.findOne({userName})
  if (adminExist) {
    res.status(400)
    throw new Error('Admin already exist')
  }

  //hash passowrd
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  //Register admin
  const admin = await Admin.create({
    userName:req.body.userName,
    password:hashedPassword
  })

  if (admin) {
    res.status(201).json({
      _id:admin.id,
      userName:admin.userName,
      token:generateToken(admin._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid Data')
  }
})
// @desc    Login admin
// @route   POST /api/admin/login
// @access  private
const adminLogin = asyncHandler(async(req,res) => {
  const {userName,password} = req.body

  //cek username
  const admin = await Admin.findOne({userName})

  if (admin && (await bcrypt.compare(password,admin.password))) {
    res.json({
      _id:admin.id,
      userName:admin.userName,
      token:generateToken(admin._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid Credential')
  }
})


const getAdmin = asyncHandler(async(req,res) => {
  res.status(200).json(req.admin)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

module.exports = {
  registerAdmin,
  adminLogin,
  getAdmin,
}
