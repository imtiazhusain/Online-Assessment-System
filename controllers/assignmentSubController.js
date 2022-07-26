const createAssignmentModel = require('../models/createAssignment')
const studentModel = require('../models/StudentRegistertation')
const assignmentModel = require('../models/assignment')


let error;
let success;
let count;
let sData;
let dateNow;
let assignmentDeadline;
let assignmentName;
let assignemtCode;
let subjectName;
let flag;

let downloadAssignment
const assignmentSubmission = async(req,res)=>{
  
    error = undefined;
    success = undefined;
    assignmentDeadline = undefined;
    dateNow = undefined;
    assignemtCode = undefined;
    subjectName = undefined;
    flag = undefined;
    downloadAssignment = undefined
    sData = await studentModel.findById({_id:req.session.user_id})
    
    res.render('assignmentSubmission',{studentData:sData,success:success,count:false,sError:error})
}


// checking record found or not
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


//  functions for date

// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

const assignmentSubForPost = async(req,res)=>{
    try {


        

     


      const studentData = await studentModel.findById({_id:req.session.user_id})
      console.log(studentData);
      console.log(studentData.firstName);
 // storing user provided data in to variables
      const studentName = studentData.firstName + " " + studentData.lastName;
      console.log(studentName);
      const studentID = studentData.studentID;
console.log('flag '+ flag)
      
      if(flag == undefined){
        assignemtCode = req.body.assignmentCode;
        const assignmentData = await createAssignmentModel.findOne({assignmentCode:assignemtCode})
        
        console.log(`type of assignemt data ${typeof assignmentData}`);
        console.log(assignmentData);
        


        if(assignmentData == null){
          console.log('inside');
          error= "invalid Assinment Code"
          res.render('assignmentSubmission',{studentData:sData,success:success,count:false,sError:error})

          return
        }else{
         

          dateNow = formatDate(new Date())
          console.log("now "+dateNow);
          assignmentDeadline = assignmentData.assignmentDeadline
         console.log(assignmentData.assignmentDeadline);
         downloadAssignment = assignmentData.assignmentName
          console.log("downoad ass "+downloadAssignment);
          console.log("deadline "+assignmentDeadline);
          flag = 1;
             res.status(201).render('assignmentSubmission',{studentData:sData,count:true,success:success,dateNow:dateNow,assignmentDeadline:assignmentDeadline,downloadAssignment:downloadAssignment})
            return
            }





      }

      if(flag == 1){
        console.log(req.body)
        assignmentName = req.file.filename;

        if(assignmentName != undefined){
        
          const submitAssignment = new assignmentModel({
            studentName: studentName,
            studentID:studentID,
            subjectName:subjectName,
            assignmentCode: assignemtCode,
            assignmentDeadline:assignmentDeadline,
            assignmentName: assignmentName
  
        })
        
        const result =  await submitAssignment.save()
        console.log(result)
        
        success = 'Assignment submitted successfully'
      res.render('assignmentSubmission',{studentData:sData,success:success,count:true,sError:error,dateNow:dateNow,assignmentDeadline:assignmentDeadline,downloadAssignment:downloadAssignment})
  
        
        }
      }
      
    

      
      
            
            
            
            // var isObjEmpty = isEmpty(assignmentData)
           

    //         const studentData = await studentModel.findById({_id:req.session.user_id})
    //         console.log(studentData);
    //         console.log(studentData.firstName);
    //    // storing user provided data in to variables
    //         const studentName = studentData.firstName + " " + studentData.lastName;
    //         console.log(studentName);
    //         const studentID = studentData.studentID;
    //         const AssignmentCode = "12345";
    //         const AssignmentDate = '2022-06-17';
    //         console.log(studentData.firstName);
    //         const assignmentName = req.file.filename;
    //         console.log(assignmentName);
            
            
    //         //Authentication 

    //         // to ensure all fields are filled by user
    //         if(!AssignmentCode || !AssignmentDate || !assignmentName   ){
    //             error = "All fields are required"
    //             res.render('assignmentSubmission',{sError:error,AssignmentCode:AssignmentCode})
    //         }else{
                
    //             // this bloak will be executed when user provided data is valid
                    
                
    //             // storing item details in database
    //                 const submitAssignment = new assignmentModel({
    //                     studentName: studentName,
    //                     studentID:studentID,
    //                     assignmentCode: AssignmentCode,
    //                     assignmentDate:AssignmentDate,
    //                     assignmentName: assignmentName

    //                 })
                    
    //                 const result =  await submitAssignment.save()
    //                 console.log(result)
                    
    //                 success = 'Item Added Successfully'
    //                 res.render('assignmentSubmission',{success:success})
                    
             
    //         }
         

        




           
            
            
        
       

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}







module.exports = {assignmentSubmission,assignmentSubForPost}