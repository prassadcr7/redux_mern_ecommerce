const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    address:{type:mongoose.Schema.Types.Mixed,required:true},
    deleted:{type:Number,default:0}
})

const addressModel = mongoose.models.products || mongoose.model("address",addressSchema)
module.exports = addressModel;