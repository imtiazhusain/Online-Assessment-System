
const teacherModel = require('../models/TeacherRegestraion')
const studentModel = require('../models/StudentRegistertation')
const { loginController } = require('./loginController')



const signupController = (req,res)=>{
    res.render('signup')
}


const SignupControllerForPost = async(req,res)=>{
    try {

console.log(req.body);
  let error;
  let studentError;
  let success;

//teacer registeration
        if(req.body.StudentID== null){
            console.log('student  id is null')
            const fName = req.body.FirstName;
            const lName = req.body.LastName;
            const email = req.body.Email;
            const tID = req.body.TeacherID;
            const tMobNum = req.body.MobileNum;
            const tInstitute = req.body.Institute;
            const tPassword = req.body.Password;
            const tConPassword = req.body.ConfirmPassword;
            console.log(req.body.FirstName.length);
            const tEmailDB = await teacherModel.findOne({email:email})
            const teachIDDB = await teacherModel.findOne({teacherID:tID})
            const tMobNumDB = await teacherModel.findOne({mobileNum:tMobNum})
            if(!fName || !lName || !email || !tID || !tMobNum || !tInstitute || !tPassword || !tConPassword ){
                error = "All fields are required"
                res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                    teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
            }else if(!(fName.length > 2)){
                error = "Firt Name should be at least 3 characters long"
                console.log('lenght short');
                res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                    teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
            }else if(!(lName.length > 2)){
                error = "last Name should be at least 3 characters long"
                console.log('lenght short');
                res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                    teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
            }else if(!(tEmailDB== null)){
                    error = "User already exists with this email "
                    res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                        teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
            }else if(!(teachIDDB== null)){
                error = "User already exists with this ID "
                res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                    teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
          }else if(!(tMobNumDB== null)){
            error = "User already exists with this Mobile number "
            res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
         }else if(isNaN(tMobNum)){
            error = "invalid Mobile number "
            res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
         }else if(!(tPassword.length > 7 )){
            error = "Password should be 8 characters long"
            res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
         }else if(!(tPassword == tConPassword)){
            error = "Password Doest not match"
            res.render('signup',{error:error,tFirstName:fName,tLastName:lName,tEmail:email,
                teacherID:tID,teacherMoBNum:tMobNum,teacherInstitute:tInstitute})
         }else{
            if(tPassword == tConPassword){
                const registerTeacher = new teacherModel({
                    firstName: fName,
                    lastName:lName,
                    email:email,
                    teacherID:tID,
                    Institute:tInstitute,
                    mobileNum:tMobNum,
                    password:tPassword,
                   
                })
                const result =  await registerTeacher.save()
                success = 'you have been succesfully registered'
                res.render('login',{success:success})
            }
         }
        
          
            

        }
        
        //student registeration
        if(req.body.TeacherID== null){
            console.log('teacher id is null')
            const sFName = req.body.FirstName;
            const sLName = req.body.LastName;
            const sEmail = req.body.Email;
            const sID = req.body.StudentID;
            const SCNIC = req.body.CNIC;
            const SMNum = req.body.MobileNum;
            const sPassword = req.body.Password;
            const sConPassword = req.body.ConfirmPassword;
            console.log(req.body.FirstName.length);
            const sEmailDB = await studentModel.findOne({email:sEmail})
            const studIDDB = await studentModel.findOne({studentID:sID})
            const sMobNumDB = await studentModel.findOne({mobileNum:SMNum})

            if(!sFName || !sLName || !sEmail || !sID || !SCNIC || !SMNum || !sPassword || !sConPassword ){
                studentError = "All fields are required"
                res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                    studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
            }else if(!(sFName.length > 2)){
                studentError = "Firt Name should be at least 3 characters long"
                console.log('lenght short');
                res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                    studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
            }else if(!(sLName.length > 2)){
                studentError = "last Name should be at least 3 characters long"
                console.log('lenght short');
                res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                    studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
            }else if(!(sEmailDB== null)){
                studentError = "User already exists with this email "
                    res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                        studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
            }else if(!(studIDDB== null)){
                studentError = "User already exists with this ID "
                res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                    studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
          }else if(!(sMobNumDB== null)){
            studentError = "User already exists with this Mobile number "
            res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
         }else if(isNaN(SMNum)){
            studentError = "invalid Mobile number "
            res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
         }else if(!(sPassword.length > 7 )){
            studentError = "Password should be 8 characters long"
            res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
         }else if(!(sPassword == sConPassword)){
            studentError = "Password Doest not match"
            res.render('signup',{sError:studentError,firstName:sFName,lastName:sLName,Email:sEmail,
                studentID:sID,studentrMoBNum:SMNum,studentCNIC:SCNIC})
         }else{
            if(sPassword == sConPassword){
                const registerstudent = new studentModel({
                    firstName: sFName,
                    lastName:sLName,
                    email:sEmail,
                    studentID:sID,
                    CNIC:SCNIC ,
                    mobileNum:SMNum,
                    password:sPassword,


                  
                })
                const result =  await registerstudent.save()
                success = 'you have been succesfully registered'
                res.render('login',{success:success})
                
            }
         }






           
            
            
        }
       

    } catch (error) {
        res.status(400).send(error)
    }
}




module.exports = {signupController,SignupControllerForPost} 
