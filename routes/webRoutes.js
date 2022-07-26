const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const homeController = require('../controllers/homeController')
const {loginController,loginControllerForPost}= require('../controllers/loginController')
const {feedback,feedbackControllerForPost} = require('../controllers/feedbackController')
const {signupController,SignupControllerForPost}= require('../controllers/signupController')

const contactUsController = require('../controllers/contactusController')
const {createQuiz,createQuizForPost} = require('../controllers/createQuiz')
const  {attendQuiz,attendQuizForPost} = require('../controllers/attendQuiz')
const  quizResultForPost = require('../controllers/resultController')
const studentDashboard = require('../controllers/studentDashboard')
const teacherDashboard = require('../controllers/teacherDashBController')
const logoutController = require('../controllers/logoutController')
const viewQuiz = require('../controllers/viewQuizController')
const viewAssignment = require('../controllers/viewAssignmentController')
const {assignmentSubmission,assignmentSubForPost} = require('../controllers/assignmentSubController')
const {assignmentCreation,assignmentCreationForPost} = require('../controllers/assignmentCreController')

 //middlewares
const {isLogin,isLogout} = require('../middlewares/auth')






// using multer for uploading images of items
const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb) =>{
        cb(null,file.fieldname+"_" +Date.now()+path.extname(file.originalname))
    }
});

var uplaod = multer({
    storage:storage,
          
}).single('assignmentFile')



router.get('/',homeController)
router.get('/login',isLogout,loginController)
router.get('/signup',isLogout,signupController)
router.get('/contactus',contactUsController)
router.get('/createquiz',isLogin,createQuiz)
router.get('/attendquiz',isLogin,attendQuiz)
router.get('/feedback',feedback)
router.get('/logout',isLogin,logoutController)
router.get('/studentdashboard',isLogin,studentDashboard)
router.get('/teacherdashboard',isLogin,teacherDashboard)
router.get('/viewquiz/:quizCode',viewQuiz)
router.get('/viewassignment/:assignmentCode',viewAssignment)
router.get('/assignmentsubmission',assignmentSubmission)
router.get('/assignmentcreation',assignmentCreation)

//post methods
router.post('/signup',SignupControllerForPost)
router.post('/login',loginControllerForPost)

router.post('/createquiz',createQuizForPost)
router.post('/attendquiz',attendQuizForPost)
router.post('/feedback',feedbackControllerForPost)
router.post('/result',quizResultForPost)
router.post('/assignmentsubmission',uplaod,assignmentSubForPost)
router.post('/assignmentcreation',uplaod,assignmentCreationForPost)





module.exports = router