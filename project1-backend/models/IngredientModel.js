const db = require('../connectDB')
class IngredientModel {
//     get all ingredients
//     join them in their category
    static async getAllWthCategories() {
        const query = `
        SELECT
        i.id,
        i.name AS ingredient_name,
        ic.name AS category_name
        FROM ingredients i
        JOIN ingredients_category ic ON i.category_id = ic.id
        ORDER BY ic.name, i.name;
        `

        try {
            const result = await db.query(query)
            return result.rows
        } catch (e) {
            console.error('Error fetching ingredients: ', e)
            throw e
        }
    }
}
module.exports = IngredientModel