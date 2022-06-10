const express = require('express');
const { newOrderSettings, getOrderSettings, updateOrderSettings } = require('../controllers/orderSettingsControllers');
const router = express.Router();

router.post('/order/newSettings', newOrderSettings);
router.route('/order/orderSettings/:id')
            .get(getOrderSettings)
            .patch(updateOrderSettings);

module.exports = router;