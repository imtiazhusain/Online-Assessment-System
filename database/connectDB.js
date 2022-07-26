const mongoose = require('mongoose')




const DATABASE_URL = 'mongodb://localhost:27017'

// oper wali code may hm nay database ka nam ni deya wo funtction k inder options 
// may deya hai







const connectDB = async ()=> {
    try{
        const options={
            dbName:'AssessmentSystem',
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useCreateIndex:true

        }
        await mongoose.connect(DATABASE_URL,options)
        console.log('connection successful')
    } 
   catch(err){
        console.log(err);
    }
}

module.exports = connectDB