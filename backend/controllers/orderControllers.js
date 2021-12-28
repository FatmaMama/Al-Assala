const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//NEW ORDER  =>  POST : api/v1/order
exports.newOrder = catchAsync(async (req, res, next) => {

    const { shippingInfo, orderItems, itemsPrice, totalPrice } = req.body;

    const newOrder = {
        shippingInfo, 
        orderItems, 
        itemsPrice, 
        totalPrice,
        user: req.user._id
    };

    const order = await Order.create(newOrder);

    res.status(201).json({
        success: true,
        order
    })
});

//GET ORDER  =>  GET : api/v1/order/:id
exports.getOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new AppError('Commande non trouvée', 404))
    };

    res.status(200).json({
        success:true,
        order
    })
});

//GET logged in user orders   =>  GET : api/v1/orders/me
exports.getMyOrders = catchAsync(async (req, res, next) => {
    const myOrders = await Order.find({ user : req.user._id});

    res.status(200).json({
        success: true,
        myOrders
    })
});

//ADMIN
//GET ALL ORDERS  =>  GET : api/v1/admin/orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        if(order.orderStatus === "délivrée"){
            totalAmount += order.itemsPrice
        }
    });

    res.status(200).json({
        success: true,
        numOfOrders : orders.length,
        totalAmount,
        orders
    })
});

//UPDATE ORDER  =>  PATCH : api/v1/admin/orders/:id
exports.updateOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === req.body.status){
        return next(new AppError(`Cette commande est déjà ${order.orderStatus}`, 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.size, item.quantity, req.body.status)
    });
   
    if(req.body.status === "expédiée") {
        order.shippedAt = Date.now();
        order.deliveredAt = undefined;
        order.isPaid = false
    };
    
    if(req.body.status === "délivrée") {
        order.deliveredAt = Date.now();
        order.isPaid = true
    };

    if(req.body.status === "retournée") {
        order.shippedAt = undefined;
        order.deliveredAt = undefined;
        order.isPaid = false
    };

    order.orderStatus = req.body.status;
    await order.save();

    res.status(200).json({
        success : true,
        order
    })
});

const updateStock = async function(id, size, quantity, status){
    const product = await Product.findById(id);
    const foundSize = product.sizes.filter(el => el.name === size);
   
    if(status === "retournée"){
        foundSize[0].stock = foundSize[0].stock + quantity;
        if(product.numOfSells > 0){
            product.numOfSells = product.numOfSells - 1
        }
    };

    if(status === "expédiée"){
        foundSize[0].stock = foundSize[0].stock - quantity;
        product.numOfSells = product.numOfSells + 1
    };

    await product.save( { validateBeforeSave : false });
};


//DELETE ORDER  =>  DELETE : api/v1/admin/orders/:id
exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next( new ErrorHandler('Commande non trouvée', 404))
    };

    await order.remove()

    res.status(200).json({
        success : true,
    })
});

//GET MONTHLY ORDERS AND EARNINGS  =>  GET : api/v1/admin/monthly/orders
exports.getMonthlyOrdersEarnings = catchAsync(async (req, res, next) => {
    //all orders, earnings only for delivered orders
    const year = new Date().getFullYear();

    const plan = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt'},
                numOfOrders: { $sum: 1},
                earnings: {
                    "$sum": {
                        $cond: {
                            if: { $eq: ['$orderStatus', 'délivrée'] }, then: '$itemsPrice', else: 0
                        }
                    }
                }
            }
        },
        {
            $addFields: { month : '$_id'}
        },
        {
            $project: { _id : 0 }
        },
        {
            $sort: { month : -1 }
        }
    ]);

    res.status(200).json({
        success : true,
        plan
    })
});

//GET WEEKLY ORDERS AND EARNINGS  =>  GET : api/v1/admin/weekly/orders
exports.getWeeklyOrdersEarnings = catchAsync(async (req, res, next) => {
    //all orders, earnings only for delivered orders
    const year = new Date().getFullYear();

    const plan = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $week: '$createdAt'},
                numOfOrders: { $sum: 1},
                earnings: {
                    "$sum": {
                        $cond: {
                            if: { $eq: ['$orderStatus', 'délivrée'] }, then: '$itemsPrice', else: 0
                        }
                    }
                }
            }
        },
        {
            $addFields: { week : '$_id'}
        },
        {
            $project: { _id : 0 }
        },
        {
            $sort: { week : -1 }
        }
    ]);

    res.status(200).json({
        success : true,
        plan
    })
});


//GET TODAY AND YESTERDAY ORDERS AND EARNINGS  =>  GET : api/v1/admin/today/orders
exports.getTodayYesterdayOrdersEarnings = catchAsync(async (req, res, next) => {
    //all orders, earnings only for delivered orders

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const yesterday = new Date().getDate() - 1;

    const plan = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-${month}-${yesterday}`)
                   
                }
            }
        },
        {
            $group: {
                _id: { $dayOfMonth : '$createdAt'},
                numOfOrders: { $sum: 1},
                earnings: {
                    "$sum": {
                        $cond: {
                            if: { $eq: ['$orderStatus', 'délivrée'] }, then: '$itemsPrice', else: 0
                        }
                    }
                }
            }
        },
        {
            $addFields: { day : '$_id'}
        },
        {
            $project: { _id : 0 }
        },
        {
            $sort: {day : -1 }
        }
    ])

    res.status(200).json({
        success : true,
        plan
    })
});

//GET ORDERS BY STATUS  =>  GET : api/v1/admin/status/orders
exports.getOrdersByStatus = catchAsync(async (req, res, next) => {

    const plan = await Order.aggregate([
        {
            $group: {
                _id: '$orderStatus',
                numOfOrders: { $sum: 1},
                orders: { $push: '$_id'}
            }
        },
        {
            $addFields: { orderStatus : '$_id'}
        },
        {
            $project: { _id : 0 }
        }
    ]);

    res.status(200).json({
        success : true,
        plan
    })
})