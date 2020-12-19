const express = require('express');
const router = express.Router();

const { createproduct, getproducts, getoneproduct, updateproduct, deleteproduct } = require('../controllers/product.js');
// import controller

router.post('/createproduct', createproduct);
router.post('/getproducts', getproducts);
router.get('/getoneproduct/:id', getoneproduct);
router.post('/updateproduct', updateproduct);
router.post('/deleteproduct', deleteproduct);

module.exports = router;