const mongoose = require('mongoose')



// definning schema 
const resultSchema = new mongoose.Schema({

    score: {type: String },
    quizCode: {type: String },
    studentID:{type: String },
    studentName:{type: String },
    quizDate:{type: String },
    quizTime:{type: String }
},{timestamps:true})

//compiling schemma

const  resultModel  = mongoose.model('result',resultSchema)




    module.exports=resultModel



