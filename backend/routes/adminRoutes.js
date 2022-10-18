const express = require('express')
const router = express.Router()
const {registerAdmin,adminLogin,getAdmin} = require('../controller/adminController')
const {protect} = require('../middleware/authMiddleware')

router.post('/',registerAdmin)
router.post('/login',adminLogin)
router.get('/admindata',protect,getAdmin)

module.exports = router