const express = require('express');
const router = express.Router();
const { addCategory, getCategories, deleteCategory, getCategory, updateCategory } = require('../controllers/categoryControllers');


router.route('/categories')
        .post(addCategory)
        .get(getCategories);


router.route('/categories/:id')
        .get(getCategory)
        .patch(updateCategory)
        .delete(deleteCategory);

module.exports = router;