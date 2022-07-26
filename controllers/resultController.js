const resultModel = require('../models/QuizResult')
const studentModel = require('../models/StudentRegistertation');


const quizResultForPost = async(req,res)=>{
    try {
     const studentData=  await studentModel.findById({_id:req.session.user_id}) 
        console.log(req.body.score);
        console.log(studentData);
        console.log(studentData.studentID);
        console.log(studentData.firstName + studentData.lastName )
        let studentName = studentData.firstName +" " + studentData.lastName;
        let studentID = studentData.studentID
      
 const storeResult = new resultModel({
    score: req.body.score,
    quizCode: req.body.quizCode,
    quizDate:req.body.quizDate,
    quizTime:req.body.quizTime,

    studentID:studentID,
    studentName:studentName
   
})
const result =  await storeResult.save()
console.log(result);

} catch (error) {
    res.status(400).send(error)
}
}

module.exports=quizResultForPost