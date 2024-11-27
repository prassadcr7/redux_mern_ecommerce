const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,default:'user'}
})

const userModel = mongoose.models.user || mongoose.model('User',userSchema)
module.exports = userModel