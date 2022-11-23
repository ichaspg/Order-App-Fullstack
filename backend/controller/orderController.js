const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

//@desc Get Order
//@route GET /api/order
//@access Private
const getOrders = asyncHandler (async (req,res) => {
  const order = await Order.find()
  res.status(200).json(order)
})

//@desc Set Order
//@route SET /api/user
//@access Public
const setOrder = asyncHandler( async (req,res) => {
  if (!req.body.order && !req.body.tablenumber) {
    res.status(400)
    throw new Error('No Order Found')
  }
  const order = await Order.create({
    userId:req.body.userId,
    userName:req.body.userName,
    tablenumber:req.body.tablenumber,
    status:req.body.status,
    order:req.body.order,
    subtotal:req.body.subtotal,
    total:req.body.total,
    method:req.body.method,
    orderType:req.body.orderType,
    paymentPic:req.body.paymentPic
  })
  res.status(200).json(order)
})

//@desc Edit Order
//@route PUT /api/Order
//@access Private
const editOrder = asyncHandler (async (req,res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(400)
    throw new Error('Order not Found')
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id,req.body,{
    new:true
  })
  res.status(200).json(updatedOrder)
})

//@desc Edit Order
//@route PUT /api/Order
//@access Private
const uploadPayment = asyncHandler (async (req,res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(400)
    throw new Error('Order not Found')
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
    paymentPic:req.file.path,},{
    new:true
  })
  res.status(200).json(updatedOrder)
})

//@desc Delete Order
//@route DELETE /order
//@access Private
const deleteOrder = asyncHandler (async (req,res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(400)
    throw new Error('Order not Found')
  }
  await order.remove()
  res.status(200).json({id: req.params.id})
})

//@desc Get Order by ID
//@route GET /api/order/id
//@access Private
const getOrderByID = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(200)
    throw new Error('Order not Found')
  }
  res.status(200).json(order)
})

module.exports ={
  getOrders,
  setOrder,
  deleteOrder,
  uploadPayment,
  editOrder,
  getOrderByID,
}