const express = require('express');
const router = express.Router();
const { addCategory, getCategories, deleteCategory } = require('../controllers/categoryControllers');


router.post('/category/new', addCategory);

router.get('/categories', getCategories);

router.delete('/category/:id', deleteCategory);

module.exports = router