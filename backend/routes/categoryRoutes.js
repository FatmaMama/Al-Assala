const express = require('express');
const router = express.Router();
const { addCategory, getCategories, deleteCategory, getCategory, updateCategory } = require('../controllers/categoryControllers');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware');

router.route('/categories')
        .post(isAuthenticated, authorizeRoles('admin'), addCategory)
        .get(getCategories);


router.route('/categories/:id')
        .get(isAuthenticated, authorizeRoles('admin'), getCategory)
        .patch(isAuthenticated, authorizeRoles('admin'), updateCategory)
        .delete(isAuthenticated, authorizeRoles('admin'), deleteCategory);

module.exports = router;