const express = require('express');
const router = express.Router();
const { newOrder, getOrder, getAllOrders, updateOrder } = require('../controllers/orderControllers');

router.post('/order', newOrder);
router.get('/order/:id', getOrder);

router.get('/admin/orders', getAllOrders);
router.route('/admin/orders/:id')
        .patch(updateOrder)

module.exports = router;