const orderModel = require('../models/orderModel.js')
const cartModel = require('../models/cartModel.js')
const Stripe = require('stripe')
const dotenv = require('dotenv')
dotenv.config();
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const getOrdersFromDB = async(req,res) => {
    // console.log('get cart items')
    const user = req.user;
    try{
         console.log('inside getting order')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const orderData = await orderModel.find({userId:user.id,paymentStatus:true});
      
        const data = orderData.map((element,index) => element.order)
          console.log(orderData)
        return res.json({success:true,message:'items',orderData})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const addOrderToDB = async(req,res) => {
    const frontend_url = "http://localhost:5178"
    const {cartData,totalAmount} = req.body;
    // console.log(totalAmount)
    const user = req.user;
    try{
        console.log('inside adding ordere')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
  
        const newOrder = new orderModel({
            userId:user.id,order:cartData,totalAmount:totalAmount
            })
        const order = await newOrder.save();
      console.log(order)

        const line_items = cartData.map((item,index) => { 
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.salePrice * 100 * 80 // Calculate the amount in paise
                },
                quantity: item.qty // Set the quantity
            };
        });

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
       
        
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${order._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${order._id}`
        })


        return res.json({success:true,message:'inserted',session_url:session.url,order})
        
 
    }catch(error){
        return res.json({success:false,message:'payment Error'})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    const user = req.user;
    console.log(6)
    console.log(orderId,success)
    try{
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{paymentStatus:true})
            const data = await cartModel.find({userId:user.id}) 
            const updatePromises = data.map((element) => {
                element.deleted = 1; // Update the deleted field
                return element.save(); // Save each document
            });
            
            const updatedCartData = await Promise.all(updatePromises);  
            res.json({success:true,message:'Order Placed Successfully'})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'Payment Error...Please try again'}) 
        }
    }catch(error){
        res.json({success:false,error:'error'})
    }
}



module.exports = {addOrderToDB,getOrdersFromDB,verifyOrder}