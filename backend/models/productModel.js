const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true, 'Veuillez entrer le nom du produit'],
        maxlength: [100, 'Le nom du produit ne peut pas dépasser 100 caractères']
    },

    price : {
        type: Number,
        required : [ true, 'Veuillez entrer le prix du produit'],
        maxlength : [5, 'le prix ne peut pas dépasser 5 caractères'],
        default : 0.0,
    },

    description : {
        type: String,
        required : [ true, 'Veuillez entrer la description du produit'],
    },

    sizeGuide : {
        type: String
    },

    images : [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            },
        }
    ],

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    sizes : [
        {
            sizeName : {
                type: String,
                required: true
            },
            stock : {
                type : Number,
                required : [ true, 'Veuillez entrer le stock du produit'],
                maxlength : [5, 'le stock ne peut pas dépasser 5 caractères'],
                default: 0,
            }
        }
    ],

    color : {
        type: String,
        required : [ true, 'Veuillez entrer la couleur du produit'],
    },

    colors : [
        {
            colorName: {
                type: String
            },

            code: {
                type: String
            }
        }
    ],

    numOfSells : {
        type: Number,
        default: 0
    },

    sale : {
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

    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps : true});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;