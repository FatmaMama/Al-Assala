const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser } = require('../controllers/authControllers');
const { getAllUsers, getUser, updateUser, deleteUser, getUserProfile, updateProfile } = require('../controllers/userControllers');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/me',isAuthenticated, getUserProfile);
router.patch('/user/update',isAuthenticated, updateProfile);

router.get('/admin/users',isAuthenticated, authorizeRoles('admin'), getAllUsers);

router.route('/admin/users/:id')
        .get(isAuthenticated, authorizeRoles('admin'), getUser)
        .patch(isAuthenticated, authorizeRoles('admin'), updateUser)
        .delete(isAuthenticated, authorizeRoles('admin'), deleteUser)

module.exports = router;