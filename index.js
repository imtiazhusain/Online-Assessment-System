const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const webRouter = require('./routes/webRoutes.js')
const path = require('path')
const connectDB = require('./database/connectDB')
const teacherModel = require('./models/TeacherRegestraion')
const studentModel = require('./models/StudentRegistertation')
const session = require('express-session')

const exp = require('constants')


connectDB()
//for gettign value form user in form ye uper lkna zrori hai
app.use(session({
 secret:'09skdfj029eskdk',
 resave: false,
  saveUninitialized: true,   
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(webRouter)





app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`);
})