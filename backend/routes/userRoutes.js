const express = require('express')
const router = express.Router()
const {getUsers,registerUser,deleteUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getUsers).post(registerUser)
router.route('/:id').delete(protect,deleteUser)

module.exports = router