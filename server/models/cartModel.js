const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    item:{type:mongoose.Schema.Types.Mixed,required:true},
    deleted:{type:Number,default:0}
})

const cartModel = mongoose.models.cart || mongoose.model('cart',cartSchema,'cart')
module.exports = cartModel