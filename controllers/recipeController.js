const recipes = require('../models/recipeModel')

//get  all recipes
exports.getAllRecipesController = async (req,res)=>{
    console.log('Inside getAllRecipesController');
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//view recipe 
exports.viewRecipeController = async (req,res)=>{
    console.log('Inside viewRecipeController');
    const {id} = req.params
    try{
        const viewRecipe = await recipes.findById({_id:id})
        res.status(200).json(viewRecipe)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//related recipe 
exports.relatedRecipesController = async (req,res)=>{
    console.log('Inside relatedRecipesController');
    const cuisine = req.query.cuisine
    
    try{
        const allRecipes = await recipes.find({cuisine})
        res.status(200).json(allRecipes)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//add recipes
exports.addRecipeController = async (req,res)=>{
    console.log('Inside addRecipeController');
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{
        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(409).json("Recipe already in collection... Add Another!!!")
        }
        else{
            const newRecipe = await recipes.create({
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            res.status(200).json(newRecipe)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}
