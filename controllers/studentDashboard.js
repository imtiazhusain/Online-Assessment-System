const studentModel = require('../models/StudentRegistertation')
const resultModel = require('../models/QuizResult')
const assignmentModel = require('../models/assignment')

const studentDashboard = async(req,res)=>{
 
    const sData = await studentModel.findById({_id:req.session.user_id})
    const attemptedQuizesData = await resultModel.find({studentID:sData.studentID})
    const attemtedAssignmentData = await assignmentModel.find({studentID:sData.studentID})
    res.render('studentDashboard',{studentData:sData,attendedQuizes:attemptedQuizesData,attendedAssignments:attemtedAssignmentData})
}

module.exports = studentDashboard