const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryControllers');


router.post('/category/new', addCategory);

router.get('/categories', getCategories);

module.exports = router