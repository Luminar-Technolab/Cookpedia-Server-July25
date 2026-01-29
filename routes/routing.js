const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const saveController = require('../controllers/saveController')
const feedbackController =  require('../controllers/feedbackController')
const multerMiddleware = require('../middleware/multerMiddleware')

const router = new express.Router()

//get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
//register
router.post('/register',userController.registerController)
//login
router.post('/login',userController.loginController)
//add feedback
router.post('/feedback',feedbackController.addFeedbackController)
//get approve feedbacks
router.get('/feedbacks-approve',feedbackController.getApproveFeedbackController)

//---------------- Authorised user-----------------------
//view  recipe
router.get('/recipes/:id',jwtMiddleware,recipeController.viewRecipeController)
//get related  recipe
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipesController)
//addtodownload
router.post('/downloads/:id',jwtMiddleware,downloadController.addToDownloadsController)
//addtosave
router.post('/recipes/:id/save',jwtMiddleware,saveController.addToSaveRecipeController)
//get user save  recipe
router.get('/recipe-collection',jwtMiddleware,saveController.getUserSaveRecipesController)
//remove user save  recipe item
router.delete('/recipe-collection/:id',jwtMiddleware,saveController.removeUserRecipeItemController)
//get user downlad  recipe list
router.get('/user-downloads',jwtMiddleware,downloadController.getUserDownloadListController)
//edit user picture 
router.put('/user-edit',jwtMiddleware,multerMiddleware.single('picture'),userController.editUserPictureController)


module.exports = router