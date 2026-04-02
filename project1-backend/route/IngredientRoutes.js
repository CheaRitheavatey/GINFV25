const express = require('express')
const router = express.Router()
const IngredientController = require('../controller/IngredientController')

router.get('/', IngredientController.getIngredients)
module.exports = router