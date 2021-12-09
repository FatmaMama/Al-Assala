const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authControllers');
const { getAllUsers } = require('../controllers/userControllers');

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.get('/admin/users', getAllUsers)

module.exports = router;