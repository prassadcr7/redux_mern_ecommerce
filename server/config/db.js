const mongoose = require('mongoose')
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://prassadEcom:ecompass@cluster0.5j4cl.mongodb.net/').then(()=>{
            console.log('db connection successfull')
        })
    }catch(error){
        console.error('connection failed ', error.message)
        process.exit(1); // Exit the process on failure
    }
}

module.exports = {connectDB}