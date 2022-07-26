const assignmentModel = require("../models/assignment")
const teacherModel = require('../models/TeacherRegestraion')


const viewAssignment = async(req,res)=>{
    console.log(req.params.assignmentCode)
    const tData = await teacherModel.findById({_id:req.session.user_id})

    const assignments = await assignmentModel.find({assignmentCode:req.params.assignmentCode})
    // const quizes = await resultModel.find({studetID:"18-se-100"})

    
    console.log(assignments);
    res.render('viewAssignment',{assignments:assignments,teacherData:tData})
    
  
}

module.exports = viewAssignment