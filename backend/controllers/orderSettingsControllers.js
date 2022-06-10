const OrderSettings = require('../models/orderSettingsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//NEW ORDER SETTINGS  =>  POST : api/v1/order/newSettings
exports.newOrderSettings = catchAsync(async (req, res, next) => {

    const { coupon, saleCoupon, saleDuration, shippingDuration, shippingFreeLimit, shippingPrice } = req.body;

    const newOrderSettings = {
        coupon, 
        saleCoupon, 
        saleDuration, 
        shippingDuration, 
        shippingFreeLimit, 
        shippingPrice
    };

    const settingsInfo = await OrderSettings.create(newOrderSettings);

    res.status(201).json({
        success: true,
        settingsInfo
    })
});

//GET ORDER SETTINGS  =>  GET : api/v1/order/orderSettings/:id
exports.getOrderSettings = catchAsync(async (req, res, next) => {
    const settingsInfo = await OrderSettings.findById(req.params.id);

    if(!settingsInfo){
        return next(new AppError('Paramètres des commandes non trouvée', 404))
    };

    res.status(200).json({
        success:true,
        settingsInfo
    })
});

//UPDATE ORDER SETTINGS  =>  PATCH : api/v1/order/orderSettings/:id
exports.updateOrderSettings = catchAsync(async (req, res, next) => {
    let settingsInfo = await OrderSettings.findById(req.params.id);
    
    if(!settingsInfo) {
        return next(new ErrorHandler('Product Not Found', 404))
    };
    
    settingsInfo = await OrderSettings.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    res.status(200).json({
        success: true,
        settingsInfo
    })
});