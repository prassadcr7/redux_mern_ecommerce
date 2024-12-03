const {getAddress,addAddress} = require('../controllers/adressController.js')
const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const addressRouter = express.Router();
console.log(88)
addressRouter.get('/get',authMiddleware,getAddress);
addressRouter.post('/add',authMiddleware,addAddress);

module.exports = addressRouter