const {getOrdersFromDB} = require('../controllers/adminOrderController.js')
const express = require('express')
const adminOrderRouter = express.Router()
const authMiddleware = require('../middleware/auth.js')

adminOrderRouter.get('/get',authMiddleware,getOrdersFromDB)
module.exports = adminOrderRouter