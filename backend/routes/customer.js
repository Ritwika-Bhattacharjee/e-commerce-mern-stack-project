const express = require('express');
const router = express.Router();

const { getcategoryitems, getsearchoptions, getsearchedproducts, getprofile, editprofile, sendMessage } = require('../controllers/customer.js');
// import controller

router.get('/getcategoryitems/:category', getcategoryitems);
router.get('/getsearchoptions', getsearchoptions);
router.get('/getsearchedproducts/:searchTerm', getsearchedproducts);
router.get('/getprofile/:userid', getprofile);
router.post('/editprofile', editprofile);
router.post('/sendMessage', sendMessage);

module.exports = router;