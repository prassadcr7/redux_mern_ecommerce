const {getOrdersFromDB,addOrderToDB,verifyOrder} = require('../controllers/orderController.js')
const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const orderRouter = express.Router();

orderRouter.get('/get',authMiddleware,getOrdersFromDB);
orderRouter.post('/verify',authMiddleware,verifyOrder);
orderRouter.post('/add',authMiddleware,addOrderToDB);

module.exports = orderRouter