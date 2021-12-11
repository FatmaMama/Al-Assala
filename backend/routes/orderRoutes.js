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
        getOrdersByStatus, 
        getMyOrders} = require('../controllers/orderControllers');

const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/order', isAuthenticated, newOrder);
router.get('/order/:id', isAuthenticated, getOrder);
router.get('/orders/me', isAuthenticated, getMyOrders);

router.get('/admin/orders', isAuthenticated, authorizeRoles('admin'), getAllOrders);
router.route('/admin/orders/:id')
        .patch(isAuthenticated, authorizeRoles('admin'), updateOrder)
        .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder);

router.get('/admin/monthly/orders', isAuthenticated, authorizeRoles('admin'), getMonthlyOrdersEarnings);
router.get('/admin/weekly/orders', isAuthenticated, authorizeRoles('admin'), getWeeklyOrdersEarnings);
router.get('/admin/today/orders', isAuthenticated, authorizeRoles('admin'), getTodayYesterdayOrdersEarnings);
router.get('/admin/status/orders', isAuthenticated, authorizeRoles('admin'), getOrdersByStatus)


module.exports = router;