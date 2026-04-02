const db = require('../connectDB')

class UserModel {
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1'
        const result = await db.query(query, [email])
        return result.rows[0]
    }

    static async create(firstName, lastName, email, hashedPassword) {
        const query = `
          INSERT INTO users (first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4)
          RETURNING id, first_name, last_name, email;
        `

        const result = await db.query(query, [firstName, lastName, email, hashedPassword])
        return result.rows[0]
    }
}

module.exports = UserModel