const resultModel = require("../models/QuizResult")
const teacherModel = require('../models/TeacherRegestraion')


const viewQuiz = async(req,res)=>{
    console.log(req.params.quizCode)
    const tData = await teacherModel.findById({_id:req.session.user_id})

    const quizes = await resultModel.find({quizCode:req.params.quizCode})

    
    console.log(quizes);
    res.render('viewquiz',{quizes:quizes,teacherData:tData})
    
  
}

module.exports = viewQuiz