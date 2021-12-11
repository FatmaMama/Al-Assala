const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser } = require('../controllers/authControllers');
const { getAllUsers } = require('../controllers/userControllers');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

router.get('/admin/users', getAllUsers)

module.exports = router;