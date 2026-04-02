const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())

//cross orgin
app.use(cors())

// import route
const ingredientRoute = require('./route/IngredientRoutes')
const recipeRoute = require('./route/recipeRoutes')

//api/ingredients for ingredients
app.use('/api/ingredient', ingredientRoute)

// api/recipe for all recipes
app.use('/api/recipe', recipeRoute)

// auth part
const authRoute = require('./route/authRoute')
app.use('/api/auth', authRoute)
//error handle
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'route not found'
    })
})

//port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})