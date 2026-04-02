const IngredientModel = require('../models/IngredientModel')
class IngredientController {
    // get request
    static async getIngredients(req,res) {
        try {
            const ingredients = await IngredientModel.getAllWthCategories()
            // send 200 and data as json
            res.status(200).json({
                success: true,
                count: ingredients.length,
                data: ingredients
            })

        } catch (e) {
            console.log("Error in ingredientController.getIngredients: ", e)
            res.status(500).json({
                success: false,
                message: 'server error: cannot fetch ingredients'
            })
        }
    }
}

module.exports = IngredientController