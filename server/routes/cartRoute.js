const {getCartItems,addProductToCart,changeItemQuantity,deleteItemFromCart} = require('../controllers/cartController.js')
const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const cartRouter = express.Router();
console.log(88)
cartRouter.get('/get',authMiddleware,getCartItems);
cartRouter.post('/add',authMiddleware,addProductToCart);
cartRouter.post('/quantity',authMiddleware,changeItemQuantity);
cartRouter.delete('/delete/:id',authMiddleware,deleteItemFromCart);

module.exports = cartRouter