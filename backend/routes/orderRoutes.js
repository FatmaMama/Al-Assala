const express = require('express');
const router = express.Router();
const { newOrder, 
        getOrder, 
        getAllOrders, 
        updateOrder, 
        deleteOrder, 
        getMonthlyOrdersEarnings, 
        getWeeklyOrdersEarnings, 
        getTodayYesterdayOrdersEarnings, 
        getOrdersByStatus } = require('../controllers/orderControllers');

const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware')

router.post('/order', newOrder);
router.get('/order/:id', getOrder);

router.get('/admin/orders', isAuthenticated, authorizeRoles('admin'), getAllOrders);
router.route('/admin/orders/:id')
        .patch(updateOrder)
        .delete(deleteOrder);

router.get('/admin/monthly/orders', getMonthlyOrdersEarnings);
router.get('/admin/weekly/orders', getWeeklyOrdersEarnings);
router.get('/admin/today/orders', getTodayYesterdayOrdersEarnings);
router.get('/admin/status/orders', getOrdersByStatus)


module.exports = router;