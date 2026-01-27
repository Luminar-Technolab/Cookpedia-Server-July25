const saveRecipes = require('../models/saveRecipeModel')

// add to save recipe
exports.addToSaveRecipeController = async (req,res)=>{
    console.log("Inside addToSaveRecipeController");
    const {id} = req.params
    const userMail = req.payload
    const {name,image} = req.body
    try{
        const exisitingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if(exisitingRecipe){
            res.status(409).json("Recipe already in your collection... Add Another!!!")
        }else{
            // add to model
            const newRecipe = await saveRecipes.create({
                recipeId:id,name,image,userMail
            })
            res.status(200).json(newRecipe)
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// get all save recipe
exports.getUserSaveRecipesController = async (req,res)=>{
    console.log("Inside getUserSaveRecipesController");
    const userMail = req.payload
    try{
        const allRecipes = await saveRecipes.find({userMail})
        res.status(200).json(allRecipes)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// remove recipe from save recipe
exports.removeUserRecipeItemController = async (req,res)=>{
    console.log("Inside removeUserRecipeItemController");
    const {id} = req.params
    try{
        const detailRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(detailRecipe)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}