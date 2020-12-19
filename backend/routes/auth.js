const express = require('express');
const router = express.Router();

const { googlelogin, facebooklogin, register, login } = require('../controllers/auth.js');
// import controller

router.post('/googlelogin', googlelogin);

router.post('/facebooklogin', facebooklogin);

router.post('/login', login);

router.post('/register', register);

module.exports = router;