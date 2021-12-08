const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, getProductByColorName, updateProduct, deleteProduct } = require('../controllers/productControllers');

router.route('/products')
        .post(addProduct)
        .get(getProducts);

router.route('/products/:id')
        .get(getProductById)
        .patch(updateProduct)
        .delete(deleteProduct);

router.route('/products/:color/:name')
        .get(getProductByColorName)

module.exports = router;