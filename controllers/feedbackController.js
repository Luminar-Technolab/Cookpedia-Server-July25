const feedbacks = require('../models/feedbackModel')

//add to feedback
exports.addFeedbackController = async (req,res)=>{
    console.log("Inside addFeedbackController");
    const {name,email,message} = req.body
    try{
        // add to model
            const newFeedback = await feedbacks.create({
                name,email,message
            })
            res.status(200).json(newFeedback)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get approved feedbacks
exports.getApproveFeedbackController = async (req,res)=>{
    console.log("Inside getApproveFeedbackController");
    try{
        // get approve 
            const approveFeedbacks = await feedbacks.find({status:{$eq:"approve"} })
            res.status(200).json(approveFeedbacks)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get all feedbacks
exports.getAllFeedbackController = async (req,res)=>{
    console.log("Inside getAllFeedbackController");
    try{
        // get feedbacks 
            const allFeedbacks = await feedbacks.find()
            res.status(200).json(allFeedbacks)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//update feedback status
exports.updateFeedbackStatusController = async (req,res)=>{
    console.log("Inside updateFeedbackStatusController");
    const {id} = req.params
    const {status} = req.body
    try{
        // get feedbacks 
            const existingFeedback = await feedbacks.findById({_id:id})
            existingFeedback.status = status
            await existingFeedback.save()
            res.status(200).json(existingFeedback)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}