const express = require('express')
const router = express.Router()
const {getFoods,addFood,editFood,deleteFood,updateImage} = require('../controller/foodController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getFoods).post(addFood)
router.route('/:id').put(editFood).delete(deleteFood).patch(updateImage)

module.exports = router