const express = require('express');
const router = express.Router();
const { addProduct, 
        getProducts, 
        getProductById, 
        getProductByColorName, 
        updateProduct, 
        deleteProduct, 
        getOnSaleProducts, 
        getBestSellers, 
        getAdminProducts } = require('../controllers/productControllers');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware');

router.route('/products')
        .post(isAuthenticated, authorizeRoles('admin'), addProduct)
        .get(getProducts);

router.route('/products/:id')
        .get(getProductById)
        .patch(isAuthenticated, authorizeRoles('admin'), updateProduct)
        .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct);

router.get('/products/:color/:name', getProductByColorName);
        
router.get('/products-on-sale', getOnSaleProducts);
        
router.get('/best-sellers', getBestSellers);
        
router.get('/admin/products', getAdminProducts);

module.exports = router;