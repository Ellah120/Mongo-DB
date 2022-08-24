const express = require('express')
const {createUser, loginUser, isLoggedIn} = require('../Controllers/user.controller')
const router = express.Router()

router.post('/register', createUser);

router.post('/login', loginUser);

// router.get('/verify', isLoggedIn);




module.exports = router;