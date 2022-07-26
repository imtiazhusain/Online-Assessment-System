

const quizModel  = require('../models/createQuiz')
const teacherModel = require('../models/TeacherRegestraion')


let quizSize;
let quizDate;
let  quizTime;
let quizDuration;
let quizCode;
let questionCreatedNo;
let flagOfSuccess;
let quizSubject;
let teacherName;
let teacherID;
let teacherData;
const createQuiz = async(req,res)=>{
    quizSize = null;
    quizDate = null;
    quizTime = null;
    quizDuration = null;
    quizCode = null;
    quizSubject=null;
    teacherName=null;
    teacherID= null;
    console.log('session'+ req.session.user_id)
     teacherData = await teacherModel.findById(req.session.user_id)
    if(teacherData){
        teacherName = teacherData.firstName + " " + teacherData.lastName
        teacherID = teacherData.teacherID;
    }
    console.log('teacher name '+ teacherName);
    console.log('teeachr ID ' + teacherID);
 questionCreatedNo =1;
flagOfSuccess = false;
    res.render('createQUiz',{teacherData:teacherData,count:false,success:flagOfSuccess})
}




const createQuizForPost = async(req,res)=>{
    try {

                if(quizSize == null || quizDate == null || quizDuration == null || quizTime == null){
                   
                    console.log(quizTime + "MDSAS");   
        console.log(req.body)
              
              quizSize = req.body.quizSize;
              quizDate = req.body.quizDate;
              quizTime = req.body.quizTime;
              quizDuration = req.body.quizDuration;
              quizSubject = req.body.quizSubject;
              quizCode = quizSize+quizDate+quizTime+quizDuration+quizSubject;
              console.log(quizSize);
              console.log(quizTime);
              console.log('session'+ req.session.user_id)
              
              

            
            }else{
                if(questionCreatedNo <= quizSize){
                    console.log('questionCreatedNo' + questionCreatedNo);
                    questionCreatedNo++;
                    if(questionCreatedNo > quizSize){
                        flagOfSuccess= true;
                        console.log('numner' +questionCreatedNo);
                      }

                   
                
                if(quizSize !== null || quizDate !== null || quizDuration !== null || quizTime !== null){

                    
                    console.log("quiz time is not  is null");
                    
                    const createQuizInDB = new quizModel({
                        
                        
                        
                        question: req.body.question,
                        optionA: req.body.optionA,
                        optionB: req.body.optionB,
                        optionC: req.body.optionC,
                        optionD: req.body.optionD,
                        correctAns:req.body.correctOption,
                        quizSize:quizSize,
                        quizDate:quizDate,
                        quizTime:quizTime,
                        quizDuration:quizDuration,
                        quizCode: quizCode,
                        quizSubject:quizSubject,
                        teacherName:teacherName,
                        teacherID:teacherID
     
                    })
        
                     
                    const result =  await createQuizInDB.save()
                    
                   
                    console.log(result);                   
                    
                  
                                
                    
                  
                   
                }
            
            }
            
            
               
    
            }



            if(flagOfSuccess){
            res.render('createQUiz',{teacherData:teacherData,count:true,quizNo:questionCreatedNo-1,success:flagOfSuccess,NoOfQuestesions:quizSize,quizDate:quizDate,quizTime:quizTime,quizDuration:quizDuration,quizSubject:quizSubject,quizCode:quizCode})

            }else{
                res.render('createQUiz',{teacherData:teacherData,count:true,quizNo:questionCreatedNo-1,success:flagOfSuccess})

            }
            // res.render('createQUiz',{count:true,quizNo:questionCreatedNo-1,success:flagOfSuccess})

        //  quizSize =req.body.question;;
        // quizDate= req.body.optionA;
        // quizTime= req.body.optionB;
        // quizDuration= req.body.optionC;
  

        // // quizSize= req.body.question;
        // // quizDate= req.body.optionA;
        // // quizTime= req.body.optionB;
        // // quizDuration= req.body.optionC;
        // console.log(req.body);
       
        // if(req.body.quizSize== null || req.body.time == null){
        //     console.log("quiz size info is null");
        //     const createQuizInDB = new quizModel({
                
                
                
        //         question: req.body.question,
        //         optionA: req.body.optionA,
        //         optionB: req.body.optionB,
        //         optionC: req.body.optionC,
        //         optionD: req.body.optionD,
        //         correctAns:req.body.correctOption

        //     })

             
        //     const result =  await createQuizInDB.save()

        //   console.log(result)
        //   res.render('createQuiz',{count:true})
           
        // }
            
        // if(req.body.question== null || req.body.optionA == null){
        //     console.log("create quiz info  is null");
        //    }


        
        
        
    

    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = {createQuiz,createQuizForPost}