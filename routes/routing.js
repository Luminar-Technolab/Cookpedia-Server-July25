const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')

const router = new express.Router()

//get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
//register
router.post('/register',userController.registerController)
//login
router.post('/login',userController.loginController)
//view  recipe
router.get('/recipes/:id',recipeController.viewRecipeController)
//get related  recipe
router.get('/related-recipes',recipeController.relatedRecipesController)

module.exports = router