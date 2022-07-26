const mongoose = require('mongoose')



// definning schema 
const createAssignmentSchema = new mongoose.Schema({

    teacherName:{type: String },
    teacherID: {type: String },
    subjectName: {type: String },
    assignmentCode: {type: String },
    assignmentDeadline:{type: String },
    assignmentName:{type: String },
  
},{timestamps:true})

//compiling schemma

const  createAssignmentModel  = mongoose.model('createAssignment',createAssignmentSchema)




    module.exports=createAssignmentModel






