const asyncHandler = require('express-async-handler')

//@desc Get Foods
//@route GET /api/foods
//@access Public
const getFoods = asyncHandler (async (req,res) => {
  res.status(200).json({message: 'Get Foods'})
}
)
//@desc Add Foods
//@route SET /api/foods
//@access Private
const addFood = asyncHandler( async (req,res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add Text')
  }
  res.status(200).json({message: 'Add Foods'})
})

//@desc Edit Foods
//@route PUT /api/foods
//@access Private
const editFood = asyncHandler (async (req,res) => {
  res.status(200).json({message: `Edit Foods ${req.params.id}`})
})
//@desc Delete Foods
//@route DELETE /api/foods
//@access Private
const deleteFood = asyncHandler (async (req,res) => {
  res.status(200).json({message: `Delete Foods ${req.params.id}`})
})

module.exports = {
  getFoods,
  addFood,
  editFood,
  deleteFood
}