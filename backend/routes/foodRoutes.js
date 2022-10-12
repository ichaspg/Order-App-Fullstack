const express = require('express')
const router = express.Router()
const {getFoods,addFood,editFood,deleteFood} = require('../controller/foodController')

router.route('/').get(getFoods).post(addFood)
router.route('/:id').put(editFood).delete(deleteFood)

module.exports = router