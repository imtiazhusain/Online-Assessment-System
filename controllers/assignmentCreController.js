
const createAssignmentModel = require('../models/createAssignment')
const teacherModel = require('../models/TeacherRegestraion')



let error;
let success;
let tData;

const assignmentCreation = async(req,res)=>{
    error = undefined;
    success = undefined;
    console.log('session'+ req.session.user_id)
     tData = await teacherModel.findById({_id:req.session.user_id})
    res.render('assignmentcreation',{teacherData:tData,success:success})
}



const assignmentCreationForPost = async(req,res)=>{
    try {

            console.log('hellosdsldsd')

            console.log('session'+ req.session.user_id)
            const teacherData = await teacherModel.findById({_id:req.session.user_id})
            console.log(teacherData);
            console.log(teacherData.firstName);
       // storing user provided data in to variables
            const teacherName = teacherData.firstName + " " + teacherData.lastName;
            const teacherID = teacherData.teacherID;
            const assignmentDeadline = req.body.assignmentDeadline;
            console.log(teacherData.firstName);
            const subjectName = req.body.subjectName;
            console.log(subjectName)
            const assignmentName = req.file.filename;
            console.log(assignmentName)

            const assignemtPortion = assignmentName.slice(17,21)
            console.log("assigment portion "+assignemtPortion);
            const assignmentCode = `${teacherID}${assignmentDeadline}${assignemtPortion}`;
            console.log("assigment code "+assignmentCode);
            
            
            //Authentication 

            // to ensure all fields are filled by user
            if(!assignmentDeadline || !assignmentName || !subjectName ){
                error = "All fields are required"
                res.render('assignmentcreation',{sError:error})
            }else{
                
                // this bloak will be executed when user provided data is valid
                    
                
                // storing item details in database
                    const submitAssignment = new createAssignmentModel({
                        teacherName: teacherName,
                        teacherID:teacherID,
                        subjectName:subjectName,
                        assignmentCode: assignmentCode,
                        assignmentDeadline:assignmentDeadline,
                        assignmentName: assignmentName,


                    })
                    
                    const result =  await submitAssignment.save()
                    console.log(result)
                    
                    success = 'Assignment created Successfully'
                    res.render('assignmentcreation',{teacherData:tData,success:success})
                    
             
            }
         

        




           
            
            
        
       

    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
}







module.exports = {assignmentCreation,assignmentCreationForPost}