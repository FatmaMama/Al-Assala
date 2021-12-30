const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

//ADD Product  =>  POST : api/v1/products
exports.addProduct = catchAsync(async (req, res, next) => {
    
    let images = [];
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];
    for(let i=0; i<images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'Al-Assala/products'
                })
        
        imagesLinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.images = imagesLinks;
    req.body.sizes = JSON.parse(req.body.sizes);
    req.body.colors = JSON.parse(req.body.colors);
    req.body.user = req.user._id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//GET ADMIN PRODUCTS  =>  GET : api/v1/admin/products
exports.getAdminProducts = catchAsync(async (req, res, next) => {
    //get products sorted with createdAt (2methods)
    //1)
    // let query = Product.find();
    // query = query.sort('-createdAt');
    // const products = await query;

    //2)
    const features = new ApiFeatures(Product.find().populate('category', 'name'), req.query).sort();
    const products = await features.query;

    res.status(200).json({
        success: true,
        numOfProducts : products.length,
        products
    })
});

//GET ALL PRODUCTS  => 
exports.getProducts = catchAsync(async (req, res, next) => {

    const features = new ApiFeatures(Product.find().populate('category', 'name parentId'), req.query)
                        .search()
                        .filter()
                        .sort()
                        .pagination();
    const products = await features.query;

    res.status(200).json({
        success: true,
        numOfProducts : products.length,
        products
    })
});

//GET PRODUCT BY ID  => GET : api/v1/products/:id
exports.getProductById = catchAsync(async (req,res, next) => {

    const product = await Product.findById(req.params.id).populate('category', 'name parentId');

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
    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    };
    
    let images = [];
    let imagesLinks = [];

    if(req.body.images !== undefined){
        if(typeof req.body.images === 'string'){
            images.push(req.body.images)
        } else {
            images = req.body.images
        };
        
        for(let i=0; i<images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'Al-Assala/products'
            })
                
            imagesLinks.push({
                public_id : result.public_id,
                url : result.secure_url
                })
            }
    }
    
    const oldImages = JSON.parse(req.body.oldImages)
    if(oldImages !== undefined){
            for(let i=0; i<product.images.length; i++){
                if(!oldImages.includes(product.images[i])){
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
                }
            }
        }
    imagesLinks = [...imagesLinks, ...oldImages]
    
    req.body.images = imagesLinks;
    req.body.sizes = JSON.parse(req.body.sizes);
    req.body.colors = JSON.parse(req.body.colors);
        
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    res.status(200).json({
        success: true,
        product
    })
});

//DELETE PRODUCT  =>  DELETE : api/v1/products/:id
exports.deleteProduct = catchAsync(async (req, res, next) => {
    
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        return next(new AppError('Produit non trouvé', 404))
    };

    res.status(200).json({
        success: true
    })
});

//GET ON SALE PRODUCTS  =>  api/v1/products-on-sale
exports.getOnSaleProducts = catchAsync(async (req, res, next) => {

    const onSaleProducts = await Product.find({ sale : { $gt : 0} })
    
    if(!onSaleProducts) {
        return next(new AppError("Il n'y aucun produit en promo ", 404))
    };

    res.status(200).json({
        success: true,
        numOfProducts: onSaleProducts.length,
        onSaleProducts
    })
});

//GET BEST SELLERS  =>  api/v1/products-on-sale
exports.getBestSellers = catchAsync(async (req, res, next) => {

    const bestSellers = await Product.aggregate([
        { $sort: { numOfSells : -1 }},
        { $limit : 10 }
    ]);

    res.status(200).json({
        success: true,
        numOfProducts: bestSellers.length,
        bestSellers
    })
})