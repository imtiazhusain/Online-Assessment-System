const teacherModel = require('../models/TeacherRegestraion')
const quizModel = require('../models/createQuiz')
const createAssignmentModel = require('../models/createAssignment')

const teacherDashboard = async(req,res)=>{
    
    const tData = await teacherModel.findById({_id:req.session.user_id})
    const teacherID = tData.teacherID;
    const createdQuizes = await quizModel.find({teacherID: teacherID})
    const createdAssignemts = await createAssignmentModel.find({teacherID: teacherID})
    console.log(`tyue of created quezes ${typeof(createdQuizes)}`);

    const quizCodes =[];
     let k = 0;
    createdQuizes.forEach(element => {
        quizCodes[k]=element.quizCode
         
        k++
        
    });
    console.log('array ' + quizCodes);

    let uniqueQuizCodes = [];
    let z = 0;
    quizCodes.forEach((c) => {
        console.log("c.quizCode value " +c);
        if (!uniqueQuizCodes.includes(c)) {
            uniqueQuizCodes.push(c);
        }
        z++
    });


    console.log('uniqure ' + uniqueQuizCodes);
    let filterQuizes = []
    for(let h = 0;h<uniqueQuizCodes.length;h++){
        let quizvalue = await quizModel.findOne({quizCode: uniqueQuizCodes[h]})
        if(quizvalue){
            filterQuizes.push(quizvalue)
        }
    }
    console.log('array of objecct ' + filterQuizes);


   


    // assignemt



    const CreatedAssignmentsCodes =[];
    let i = 0;
    createdAssignemts.forEach(element => {
       quizCodes[i]=element.assignmentCode
        
       i++
       
   });
   console.log('array of assignmet codes' + CreatedAssignmentsCodes);

   let uniqueAssignmentCodes = [];
   let y = 0;
   quizCodes.forEach((c) => {
       console.log("c.Assignemtns code value " +c);
       if (!uniqueAssignmentCodes.includes(c)) {
        uniqueAssignmentCodes.push(c);
       }
       y++
   });


   console.log('unique assignmetns codes ' + uniqueAssignmentCodes);
   let filterAssignments = []
   for(let h = 0;h<uniqueAssignmentCodes.length;h++){
       let AssignmentValue = await createAssignmentModel.findOne({assignmentCode: uniqueAssignmentCodes[h]})
       if(AssignmentValue){
        filterAssignments.push(AssignmentValue)
       }
   }
   console.log('array of objecct ' + filterAssignments);




    if(createdQuizes || createdAssignemts){
        res.render('teacherDashboard',{teacherData:tData,quizes:filterQuizes,assignments:filterAssignments})
    }else{
        res.render('teacherDashboard',{teacherData:tData})
    }

   
}

module.exports = teacherDashboard