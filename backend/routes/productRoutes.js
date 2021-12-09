const express = require('express');
const router = express.Router();
const { addProduct, 
        getProducts, 
        getProductById, 
        getProductByColorName, 
        updateProduct, 
        deleteProduct, 
        getOnSaleProducts, getBestSellers, getAdminProducts } = require('../controllers/productControllers');

router.route('/products')
        .post(addProduct)
        .get(getProducts);

router.route('/products/:id')
        .get(getProductById)
        .patch(updateProduct)
        .delete(deleteProduct);

router.get('/products/:color/:name', getProductByColorName);
        
router.get('/products-on-sale', getOnSaleProducts);
        
router.get('/best-sellers', getBestSellers);
        
router.get('/admin/products', getAdminProducts);

module.exports = router;