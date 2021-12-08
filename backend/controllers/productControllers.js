const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//ADD Product  =>  POST : api/v1/products
exports.addProduct = catchAsync(async (req, res, next) => {
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//GET ALL PRODUCTS  =>  GET : api/v1/products
exports.getProducts = catchAsync(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
});

//GET PRODUCT BY ID  => GET : api/v1/products/:id
exports.getProductById = catchAsync(async (req,res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new AppError('Produit non trouvé', 404))
    };

    res.status(200).json({
        success: true,
        product
    })
});

// GET PRODUCT BY COLOR and NAME  =>  GET : api/v1/products/:color/:name
exports.getProductByColorName = catchAsync(async (req,res, next) => {

    const product = await Product.find({ color: req.params.color, name: req.params.name});

    if(!product) {
        return next(new AppError('Produit non trouvé', 404))
    };

    res.status(200).json({
        success: true,
        product
    })
});

//UPDATE PRODUCT  =>  PATCH : api/v1/products/:id
exports.updateProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if(!product) {
        return next(new AppError('Produit non trouvé', 404))
    };

    res.status(200).json({
        success: true,
        product
    })
});

//DELETE PRODUCT  =>  PATCH : api/v1/products/:id
exports.deleteProduct = catchAsync(async (req, res, next) => {
    
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        return next(new AppError('Produit non trouvé', 404))
    };

    res.status(200).json({
        success: true
    })
})