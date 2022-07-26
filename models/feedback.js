const mongoose = require('mongoose')

// definning schema 
const feedbackSchema = new mongoose.Schema({
    name: {type:String, required: true },
    feedback: {type:String, required: true }

  
})

//compiling schemma

const feedbackModel  = mongoose.model('feedback',feedbackSchema)
  module.exports=feedbackModel



