const cartModel = require('../models/cartModel.js')

const getCartItems = async(req,res) => {
    // console.log('get cart items')
    const user = req.user;
    try{
        // console.log('inside getting cart item')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const cartData = await cartModel.find({userId:user.id,deleted:0}).select('item -_id');
        
        const data = cartData.map((element,index) => element.item)
        
        return res.json({success:true,message:'items',data})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const addProductToCart = async(req,res) => {
    const item = req.body.item;
    console.log(item)
    const user = req.user;
    try{
        // console.log('inside adding cart item')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const data = await cartModel.find({userId:user.id,'item._id':item._id})
        console.log(data.length) 
        if(data.length){
            const olditem = data[0];
            olditem.deleted = 0;
            olditem.item.salePrice = item.salePrice;
            olditem.item.qty = item.qty;
            const newData = await olditem.save();
            return res.json({success:true,message:'Item added Successfully',newData})   
        }
        const newCart = new cartModel({
            userId:user.id,item:item
            })
        const product = await newCart.save();
        return res.json({success:true,message:'inserted',product})
        
 
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const deleteItemFromCart = async(req,res) => {
    const itemId = req.params.id;
    const user = req.user;
    try{
        const data = await cartModel.find({userId:user.id,'item._id':itemId})  
        console.log(data)
        const item = data[0];
        console.log(item)
        item.deleted = 1;
        const newData = await item.save();
        const deletedId = newData.item._id;
        return res.json({success:true,message:'Item Removed Successfully',deletedId})  
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}
const changeItemQuantity = async (req,res) => {
    const {id,type} = req.body;
    const user = req.user;
    try{
        const data = await cartModel.find({ userId: user.id,'item._id':id });
        if(data.length){
            const olditem = data[0];
               if(type === '+'){
            olditem.item.qty += 1;
        }else{
            olditem.item.qty -= 1;
        }
        olditem.markModified('item');
        const newData = await olditem.save();
        const updatedItem = newData.item;
        return res.json({success:true,message:'Item Quantity Updated',updatedItem})  
        }
    }catch(error){
        return error;
    }
}
module.exports = {getCartItems,addProductToCart,deleteItemFromCart,changeItemQuantity}