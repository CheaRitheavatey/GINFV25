const express = require('express')
const router = express.Router()
const RecipeController = require('../controller/RecipeController')

// post
router.post('/generate', RecipeController.generateMeal)

// get
router.get('/:id/detail', RecipeController.getRecipeDetail)
module.exports = router