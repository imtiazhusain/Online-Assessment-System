const mongoose = require('mongoose')



// definning schema 
const assignmentSchema = new mongoose.Schema({

    studentName:{type: String },
    studentID: {type: String },
    subjectName: {type: String },
    assignmentCode: {type: String },
    assignmentDeadline:{type: String },
    assignmentName:{type: String },
  
},{timestamps:true})

//compiling schemma

const  assignmentModel  = mongoose.model('assignment',assignmentSchema)




    module.exports=assignmentModel





