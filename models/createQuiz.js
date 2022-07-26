const mongoose = require('mongoose')



// definning schema 
const quizSchema = new mongoose.Schema({


   
    




    question: {type:String, required: true },
    optionA: {type:String, required: true },
    optionB: {type:String, required: true },
    optionC: {type:String, required: true },
    optionD: {type:String, required: true },
    correctAns:{type:String, required:true},
    quizSize:{type:String, required:true},
    quizDate:{type:String, required:true},
    quizTime:{type:String, required:true},
    quizDuration:{type:String, required:true},
    quizCode:{type:String, required:true},
    quizSubject:{type:String, required:true},
    teacherName:{type:String, required:true},
    teacherID:{type:String, required:true}

  
})

//compiling schemma

const quizModel  = mongoose.model('quizze',quizSchema)




    module.exports=quizModel


