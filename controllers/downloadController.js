const downloads = require('../models/downloadModel')

//add to downloads
exports.addToDownloadsController = async (req,res)=>{
    console.log("Inside addToDownloadsController");
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body
    try{
        const exisitingRecipe = await downloads.findOne({recipeId:id})
        if(exisitingRecipe){
            //increment count
            exisitingRecipe.count += 1
            await exisitingRecipe.save()
            res.status(200).json(exisitingRecipe)
        }else{
            // add to model
            const newRecipe = await downloads.create({
                recipeId:id,name,cuisine,image,count:1,userMail
            })
            res.status(200).json(newRecipe)
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get user download list
exports.getUserDownloadListController = async (req,res)=>{
    console.log("Inside getUserDownloadListController");
    const userMail = req.payload
    try{
        const allUserRecipes = await downloads.find({userMail})
        res.status(200).json(allUserRecipes)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}