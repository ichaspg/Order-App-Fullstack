const express = require('express')
const router = express.Router()
const {getOrders,setOrder,deleteOrder, uploadPayment, editOrder,getOrderByID} = require('../controller/orderController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getOrders).post(setOrder)
router.route('/:id').delete(deleteOrder).put(uploadPayment).patch(editOrder).get(getOrderByID)

module.exports = router