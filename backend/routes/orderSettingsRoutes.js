const express = require('express');
const { newOrderSettings, getOrderSettings, updateOrderSettings } = require('../controllers/orderSettingsControllers');
const router = express.Router();

router.post('/order/newSettings', newOrderSettings);

router.get('/orderSettings', getOrderSettings);

router.patch('/orderSettings', updateOrderSettings);

module.exports = router;