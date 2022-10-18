const asyncHandler = require('express-async-handler')
const Food = require('../models/foodModel')

//@desc Get Foods
//@route GET /api/foods
//@access Public
const getFoods = asyncHandler (async (req,res) => {
  const foods = await Food.find()
  res.status(200).json(foods)
})

//@desc Add Foods
//@route SET /api/foods
//@access Private
const addFood = asyncHandler( async (req,res) => {
  if (!req.body.name && !req.body.description && !req.body.category && !req.body.price && !req.body.status) {
    res.status(400)
    throw new Error('Please fill all the form')
  }
  if (!req.file) {
    res.status(400)
    throw new Error('Please add image')
  }

  const food = await Food.create({
    name:req.body.name,
    description:req.body.description,
    category:req.body.category,
    price:req.body.price,
    status:req.body.status,
    image:req.file.path.replace(/\\/g, "/"),
  })
  res.status(200).json(food)
})

//@desc Edit Foods
//@route PUT /api/foods
//@access Private
const editFood = asyncHandler (async (req,res) => {
  const food = await Food.findById(req.params.id)
  if (!food) {
    res.status(400)
    throw new Error('Food not Found')
  }
  
  const updatedFood = await Food.findByIdAndUpdate(req.params.id,req.body,{
    new:true
  })
  res.status(200).json(updatedFood)
})

//@desc Edit Gambar Foods
//@route Put /api/foods/:id
//@access Private
const updateImage = asyncHandler(async(req,res) => {
  const food = await Food.findById(req.params.id)
  if (!food) {
    res.status(400)
    throw new Error('Food not Found')
  }

  const updatedImage = await Food.findByIdAndUpdate(req.params.id,{image:req.file.path.replace(/\\/g, "/")},{
    new:true
  })
  res.status(200).json(updatedImage)
})

//@desc Delete Foods
//@route DELETE /api/foods/:id
//@access Private
const deleteFood = asyncHandler (async (req,res) => {
  const food = await Food.findById(req.params.id)
  if (!food) {
    res.status(400)
    throw new Error('Food not Found')
  }
  await food.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getFoods,
  addFood,
  editFood,
  deleteFood,
  updateImage
}