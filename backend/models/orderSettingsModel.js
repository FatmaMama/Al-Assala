const mongoose = require('mongoose');

const orderSettingsSchema = new mongoose.Schema ({
        coupon : {
            type : String
        },
        saleCoupon : {
            type : Number,
        },
        saleDuration : {
            type : String,
        },
        shippingDuration : {
            type : String,
        },
        shippingFreeLimit : {
            type : Number,
        },
        shippingPrice : {
            type : Number,
        }
});

const OrderSettings = mongoose.model('OrderSettings', orderSettingsSchema);

module.exports = OrderSettings;