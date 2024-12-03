const {getAddress,addAddress} = require('../controllers/adressController.js')
const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const cartRouter = express.Router();
console.log(88)
cartRouter.get('/get',authMiddleware,getAddress);
cartRouter.post('/add',authMiddleware,addAddress);

module.exports = cartRouter