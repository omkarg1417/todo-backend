const express = require('express');
const router = express.Router();
const {login, logout} = require('../controllers/user')
const signup = require('../controllers/signup')
const {registerInitialCheck} = require('../middlewares/registerInitialChecks')

// http://localhost:3000/login
router.post('/login', login);

// http://localhost:3000/signup
router.post('/signup', registerInitialCheck, signup);

// http://localhost:3000/logout
router.get('/logout', logout);

module.exports = router;
