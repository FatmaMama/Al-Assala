const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
  
    if(parentId === null){
        category = categories.filter(cat => cat.parentId === undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    
    for(let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        })
    };

    return categoryList
}

//ADD CATEGORY  =>   POST : api/v1/categories
exports.addCategory = catchAsync(async (req, res, next) => {
        const { name, parentId } = req.body;

        const categoryObj = {
            name
        }
    
        if (parentId) {
            categoryObj.parentId = parentId
        }
    
        const category = await Category.create(categoryObj);
    
        res.status(201).json({
            success: true,
            category
        })
});

//GET ALL CATEGORIES  =>  GET : api/v1/categories
exports.getCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    if(categories){
        const categoryList = createCategories(categories);

        res.status(200).json({
            success: true,
            categoryList
        })
    }
});


//GET CATEGORY   =>  GET : api/v1/categories/:id
exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new AppError('No category found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        category
    })
});

//UPDATE CATEGORY  =>  UPDATE : api/v1/categories/:id
exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!category){
        return next(new AppError('No category found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        category
    })
})

//DELETE CATEGORY  =>  DELETE : api/v1/categories/:id
// exports.deleteCategory = catchAsync(async (req, res, next) => {

//     const categories = await Category.find();

//     let categoryList;
//     if(categories){
//         categoryList = createCategories(categories)
//     }
    
//     const category = await Category.findById(req.params.id);
//     const subCategories = await Category.find({ parentId : req.params.id });
    
//     if(!category){
//         return next(new AppError('No category found with this ID', 404))
//     }

//     await category.remove();

//     if(subCategories.length > 0){
//         for (let cat of subCategories){
//             await cat.remove();
//         }
//     }
//     res.status(200).json({
//         success: true
//     })
// });


exports.deleteCategory = catchAsync(async (req, res, next) => {

    const deleteCategoryProducts = async (id = req.params.id) => {
        const category = await Category.findById(id);
        const subCategories = await Category.find({ parentId : id });
        
        if(!category){
            return next(new AppError('No category found with this ID', 404))
        }
    
        await category.remove();
        await Product.deleteMany({category: category._id})
    
        if(subCategories.length > 0){
            for (let cat of subCategories){
                deleteCategoryProducts(cat._id)
            }
        }
    }

    deleteCategoryProducts();
    
    res.status(200).json({
        success: true
    })
});
