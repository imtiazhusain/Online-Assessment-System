const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


// definning schema 
const teacherSchema = new mongoose.Schema({
    firstName: {type:String, required: true, trim:true},
    lastName: {type:String, required: true, trim:true},
    email: {type:String, required: true, trim:true,unique:true},
    teacherID: {type:String, required: true, trim:true},
    Institute: {type:String, required: true, trim:true},
    mobileNum:{type:String, required:true,unique:true},
    password: {type:String, required: true}

})

// hashing
teacherSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

//compiling schemma
const teacherModel  = mongoose.model('teacher',teacherSchema)



module.exports=teacherModel



