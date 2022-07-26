const mongoose = require("mongoose")
const studentModel = require("../models/StudentRegistertation")
const teacherModel = require('../models/TeacherRegestraion')
const bcrypt = require('bcrypt')


const loginController = (req,res)=>{
    res.render('login')
}


const loginControllerForPost = async(req,res)=>{
    try {

        let tError;
        let sError;
// teacher login

        console.log(req.body);
        if(req.body.StudentEmail== null || req.body.StudentPassword == null){
            console.log("student email in null");
            const email = req.body.TeacherEmail;
            const password = req.body.TeacherPassword;
    
            const teacherdata = await teacherModel.findOne({email:email})
            
           
            if(teacherdata== null){
                tError ="Record Not Found"
                res.render('login',{teacherError:tError,tEmail:email})
            }else{
            const isMatch = await bcrypt.compare(password,teacherdata.password)
            console.log(isMatch);
                if(isMatch){
                    req.session.user_id = teacherdata._id
                    console.log(req.session.user_id)
                    res.redirect('/teacherDashboard')
                }else{
                    tError = "Invalid Login Details"
                    res.render('login',{teacherError:tError,tEmail:email})
                }
            }
            
        }


        //student login
        if(req.body.TeacherEmail== null || req.body.TeacherPassword == null){
            console.log("teacher email in null");

            const email = req.body.StudentEmail;
            const password = req.body.StudentPassword;
    
            const studentdata = await studentModel.findOne({email:email})
            console.log(studentdata);
         
            if(studentdata== null){
                sError ="Record Not Found"
                res.render('login',{studentError:sError,email:email})
            }else{
                
                const isMatch = await bcrypt.compare(password,studentdata.password)
                console.log(isMatch);

                if(isMatch){
                    req.session.user_id = studentdata._id
                    console.log(req.session.user_id);

                    res.redirect('/studentDashboard')
                }else{
                    sError = "Invalid Login Details"
                    res.render('login',{studentError:sError,email:email})
                }
            }
            
        }
        
        
    

    } catch (error) {
        res.status(400).send(error)
    }
}







module.exports = {loginController,loginControllerForPost}