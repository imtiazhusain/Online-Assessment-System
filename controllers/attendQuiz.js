const quizModel = require('../models/createQuiz')
const studentModel = require('../models/StudentRegistertation')
let q;
let a;
let oA;
let oB;
let oC;
let oD;
let quizDate;
let dateNow;
let quizTime;
let timeNow;
let quizDuration;
let quizSize;
let sData;
let error;
let success;
let quizEndTime;
let stopQuizTime;
let CurrentTImeInSeconds

const attendQuiz = async(req,res)=>{
     q=null;
 a=null;
 oA=null;
 oB=null;
 oC=null;
 oD=null;
 quizDate=null;
 dateNow = null; 
 quizTime = null;
 timeNow =  null;
 quizDuration= null;
 quizSize = null;
 error = undefined;
 success = undefined;
 quizEndTime = undefined;
  sData = await studentModel.findById({_id:req.session.user_id})
    res.render('attendQuiz',{studentData:sData,count:false,quizDate:quizDate,currentDate:dateNow,currentTime:timeNow,quizTime:quizTime,quizDuration:quizDuration,quizSize:quizSize,stopQuizTime:stopQuizTime,CurrentTImeInSeconds:CurrentTImeInSeconds})
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




  // stop function

  function convertTimeInSeconds(TimeInMinutes) {
    var a = TimeInMinutes.split(':')

   var seconds = ((+a[0]) * 60 * 60 + (+a[1]) * 60); 

    return seconds



}




const attendQuizForPost = async(req,res)=>{
    try {

// teacher login

        console.log(req.body);
        
          
            const quizCode = req.body.quizCode;
           
    console.log(quizCode);
            const quizData = await quizModel.find({quizCode:quizCode}).select({_id:-1,question:1,optionA:1,optionB:1,optionC:1,optionD:1,correctAns:1,quizCode:1,quizDate:1,quizTime:1,quizDuration:1,quizSize:1})
            console.log(quizData);
            if(quizData.length <=0 ){
              error = "invalid quiz Code"
            res.render('attendQuiz',{studentData:sData,count:false,quizDate:quizDate,currentDate:dateNow,currentTime:timeNow,quizTime:quizTime,quizDuration:quizDuration,quizSize:quizSize,sError:error,stopQuizTime:stopQuizTime,CurrentTImeInSeconds:CurrentTImeInSeconds})

        
              return
             
          }else{
            quizData.forEach(element => {
              q = element.question;
              a = element.correctAns;
              oA = element.optionA;
              oB = element.optionB;
              oC = element.optionC;
              oD = element.optionD;
              quizDate = element.quizDate, // important
              quizTime = element.quizTime, // important
              quizDuration= element.quizDuration // important
              quizSize = element.quizSize // important
           });
           console.log("quiz date "+quizDate);
       
   
         dateNow = formatDate(new Date())
         console.log("current date" + dateNow);
           let today = new Date()
         let timeNow = `${today.getHours()}:${today.getMinutes()}`
           console.log("curren Time " +timeNow);
           console.log("quiz time " + quizTime);



          // calling funtionn to convert itme in sec
          let qtimeInSeconds =  convertTimeInSeconds(quizTime)
          console.log("quizTime in mnts" +qtimeInSeconds );
          let qDurationInSeconds =  quizDuration * 60;
          console.log("quiz Duraton in mnts" +qDurationInSeconds );
           stopQuizTime =  qtimeInSeconds+qDurationInSeconds 
          console.log("stop quiz at "+stopQuizTime);
          CurrentTImeInSeconds = convertTimeInSeconds(timeNow)
          console.log("CurrentTImeInSeconds "+CurrentTImeInSeconds);





           
            
            //    console.log(quizData);
                    res.status(201).render('attendQuiz',{studentData:sData,count:true,quizData:quizData,currentDate:dateNow,quizDate:quizDate,currentTime:timeNow,quizTime:quizTime,quizDuration:quizDuration,quizSize:quizSize,stopQuizTime:stopQuizTime,CurrentTImeInSeconds:CurrentTImeInSeconds})
                


       
            
        
        
        
          }
           
    

    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {attendQuiz,attendQuizForPost}