const express = require('express');
const router = express.Router();

const { add, fetch, decreaseItem, increaseItem, deleteItem } = require('../controllers/cart.js');
// import controller

router.post('/add', add);
router.get('/fetch/:userid', fetch)
router.post('/decreaseItem', decreaseItem);
router.post('/increaseItem', increaseItem);
router.post('/deleteItem', deleteItem);

module.exports = router;