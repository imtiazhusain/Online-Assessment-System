const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


// definning schema 
const studentSchema = new mongoose.Schema({
    firstName: {type:String, required: true, trim:true},
    lastName: {type:String, required: true, trim:true},
    email: {type:String, required: true, trim:true,unique:true},
    studentID: {type:String, required: true, trim:true},
    CNIC: {type:String, required: true, trim:true,unique:true},
    mobileNum:{type:String, required:true,unique:true},
    password: {type:String, required: true}
 
})

//compiling schemma

studentSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

const studentModel  = mongoose.model('student',studentSchema)




    module.exports=studentModel



