const express = require('express');
const router = express.Router();

const { placeOrder, getorders, getordersSeller, editOrder } = require('../controllers/order.js');
// import controller

router.post('/placeOrder', placeOrder);
router.get('/getorders/:userid', getorders);
router.get('/getordersSeller/:userid', getordersSeller);
router.post('/editOrder', editOrder);

module.exports = router;