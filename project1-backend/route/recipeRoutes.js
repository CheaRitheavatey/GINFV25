const express = require('express')
const router = express.Router()
const RecipeController = require('../controller/RecipeController')
const protect = require('../middleware/AuthMiddleware')
// post
router.post('/generate', RecipeController.generateMeal)
// get
router.get('/:id/detail', RecipeController.getRecipeDetail)
// post recipe
router.post('/', RecipeController.addRecipe)

module.exports = router