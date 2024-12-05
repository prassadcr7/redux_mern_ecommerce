const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    order:{type:mongoose.Schema.Types.Mixed,required:true},
    totalAmount:{type:Number},
    paymentStatus:{type:String,default:false},
    paymentMethod:{type:String},
    paymentId:{type:String},
    payerID:{type:String},
    shipped:{type:String,default:false},
    delivered:{type:String,default:false},
    deleted:{type:Number,default:0}
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
module.exports = orderModel