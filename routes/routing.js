const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const saveController = require('../controllers/saveController')
const feedbackController =  require('../controllers/feedbackController')
const multerMiddleware = require('../middleware/multerMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

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
//get user list  
router.get('/user-list',adminMiddleware,userController.getAllUsersController)
//get  downlad  recipe list
router.get('/downloads',adminMiddleware,downloadController.getDownloadListController)
//get  all  feedbacks list
router.get('/feedbacks',adminMiddleware,feedbackController.getAllFeedbackController)
//update  feedbacks 
router.put('/feedbacks/:id',adminMiddleware,feedbackController.updateFeedbackStatusController)
//add recipe 
router.post('/recipes',adminMiddleware,recipeController.addRecipeController)
//delete recipe 
router.delete('/recipes/:id',adminMiddleware,recipeController.removeRecipeController)
//edit recipe 
router.put('/recipes/:id',adminMiddleware,recipeController.editRecipeController)


module.exports = router