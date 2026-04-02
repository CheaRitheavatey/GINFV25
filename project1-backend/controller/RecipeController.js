const RecipeModel = require('../models/RecipeModel')

class RecipeController {
    // post meal
    static async generateMeal(req, res) {
        try {
            const {ingredient_id} = req.body

        //     validation for id
            if (!ingredient_id || !Array.isArray(ingredient_id) || ingredient_id.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'need to provide an array of ingredient_id'
                })
            }

            // fetch matching recipes from the model
            const recipes = await RecipeModel.findByIngredients(ingredient_id)

            // send result back
            res.status(200).json({
                success: true,
                count: recipes.length,
                data: recipes
            })
        } catch (e) {
            console.log('error in RecipeController.generateModel: ', e)
            res.status(500).json({
                success: false,
                message: 'server error: could not generate meals'
            })
        }
    }

    // get recipe detail
    static async getRecipeDetail(req, res) {
        try {
            const {id} = req.params
            const detail = await RecipeModel.getRecipeDetails(id)

            if (!detail || detail.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'cannot find or has no ingredients'
                })
            }

            res.status(200).json({
                success: true,
                data: detail
            })
        } catch (e) {
            console.error('error in RecipeController.getRecipeDetails ', e)
            res.status(500).json({
                success: false,
                message: 'server error: couldnt fetch recipe detail'
            })
        }
    }

}

module.exports = RecipeController