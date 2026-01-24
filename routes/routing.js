const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const router = new express.Router()

//get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
//register
router.post('/register',userController.registerController)
//login
router.post('/login',userController.loginController)

//---------------- Authorised user-----------------------
//view  recipe
router.get('/recipes/:id',jwtMiddleware,recipeController.viewRecipeController)
//get related  recipe
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipesController)
//addtodownload
router.post('/downloads/:id',jwtMiddleware,downloadController.addToDownloadsController)

module.exports = router