const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    shippingInfo : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        phoneNo : {
            type : String,
            required : true
        },
        postalCode : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        },
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    orderItems : [
        {
            name : {
                type : String,
                required : true 
            },
            price : {
                type : Number,
                required : true 
            },
            size : {
                type : String,
                required : true 
            },
            color : {
                type : String,
                required : true 
            },
            quantity : {
                type : Number,
                required : true 
            },
            image : {
                type : String,
                required : true 
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Product'
            },
        }
    ],
    isPaid : {
        type : Boolean,
        default : false
    },
    itemsPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    shippingPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    saleCoupon : {
        type: Number,
        default: 0,
        validate: {
            //Only works on save or create (not update)
            validator: function(el){
                return el < 1
            },
            message: "la valeur doit être inférieure à 1"
        }
    },
    totalPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    orderStatus : {
        type : String,
        required : true,
        default : 'non traitée'
    },
    deliveredAt : {
        type: Date
    },
    shippedAt : {
        type: Date
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;