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

    // using transcation cuz we dont want half fail or half recipe
    static async createRecipe(title, instruction, prep_time, cost, ingredient_array) {
        const client = await db.pool.connect()

        try {
            await client.query('BEGIN')

            // insert new recipe into db
            const recipeQuery = `INSERT INTO recipe (title, instruction, prep_time, cost)
            VALUES ($1, $2, $3, $4) RETURNING id;`

            const recipeRes = await client.query(recipeQuery, [title,instruction, prep_time, cost])
            const newRecipeId = recipeRes.rows[0].id

            // loop through ingredent array and insert into recipe ingreident
            const ingredientQuery = `
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) 
            VALUES ($1, $2, $3);`

            for (const i of ingredient_array) {
                await client.query(ingredientQuery, [newRecipeId,i.id, i.quantity])
            }

        //     end this transcation
            await client.query('COMMIT')
            return newRecipeId
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()

        }
    }
}

module.exports = RecipeModel;