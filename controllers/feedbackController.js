
const mongoose = require("mongoose")
const feedbackModel = require("../models/feedback")
const feedback = (req,res)=>{
    res.render('feedback')
}



const feedbackControllerForPost = async(req,res)=>{
    try {


      
 const storeFeedback = new feedbackModel({
    name: req.body.name,
    feedback:req.body.feedback,

   
})
const result =  await storeFeedback.save()
const feedbackData = await feedbackModel.find()
res.render('home',{feedbackData:feedbackData})

 

    } catch (error) {
        res.status(400).send(error)
    }
}











module.exports = {feedback,feedbackControllerForPost}