const feedbackModel = require("../models/feedback")


const homeController = async(req,res)=>{
    const feedbackData = await feedbackModel.find()
    console.log(feedbackData);
    res.render('home',{feedbackData:feedbackData})
}

module.exports = homeController