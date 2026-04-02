// models/RecipeModel.js
const db = require('../connectDB');

class RecipeModel {
    /**
     * Finds recipes based on an array of ingredient IDs provided by the user.
     * It ranks the results by how many matching ingredients the user selected.
     *
     * @param {Array<number>} ingredientIds - e.g., [1, 2, 8]
     */
    static async findByIngredients(ingredientIds) {
        // We use ANY($1::bigint[]) to check if the recipe's ingredients are in the user's array
        const query = `
      SELECT 
        r.id, 
        r.title, 
        r.instruction, 
        r.prep_time, 
        r.cost,
        COUNT(ri.ingredient_id) AS matched_ingredients_count
      FROM recipe r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      WHERE ri.ingredient_id = ANY($1::bigint[])
      GROUP BY r.id, r.title, r.instruction, r.prep_time, r.cost
      ORDER BY matched_ingredients_count DESC;
    `;

        try {
            const result = await db.query(query, [ingredientIds]);
            return result.rows;
        } catch (error) {
            console.error('Error finding recipes by ingredients:', error);
            throw error;
        }
    }

    /**
     * Gets the specific details of a recipe, including the exact quantities
     * of each ingredient needed.
     *
     * @param {number} recipeId
     */
    static async getRecipeDetails(recipeId) {
        const query = `
      SELECT 
        i.name AS ingredient_name, 
        ri.quantity
      FROM recipe_ingredients ri
      JOIN ingredients i ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = $1;
    `;

        try {
            const result = await db.query(query, [recipeId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            throw error;
        }
    }
}

module.exports = RecipeModel;