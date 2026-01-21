const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')

const router = new express.Router()

//get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
//register
router.post('/register',userController.registerController)

module.exports = router