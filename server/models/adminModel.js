const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    category:{type:String},
    brand:{type:String},
    price:{type:Number},
    salePrice:{type:Number},
    image:{type:String},
    john:{type:String}
})

const adminModel = mongoose.models.products || mongoose.model("adminProducts",adminSchema)
module.exports = adminModel;