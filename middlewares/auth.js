const contactusController = require("../controllers/contactusController")
const studentModel = require('../models/StudentRegistertation')

//login for student
const isLogin = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){

        }else{
            res.redirect('login')
        }
        next()


    } catch (error) {
        console.log(error);
        
    }
}



const isLogout = async(req,res,next)=>{
    try {
        console.log(req.session.user_id);
        if(req.session.user_id){
            const isStuExists = await studentModel.findById({_id:req.session.user_id})
           console.log('studetn exist'+isStuExists);
            if(isStuExists != null){
                res.redirect('/studentDashboard')
            }else{
                console.log("teacher exitst");
                res.redirect('/teacherDashboard')
            }
            
        }
        next()

    } catch (error) {
        
    }
}





const isTLogout = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){
            res.redirect('teacherDashboard')
        }
        next()

    } catch (error) {
        
    }
}

module.exports={isLogin,isLogout}