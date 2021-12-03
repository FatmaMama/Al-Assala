const Category = require('../models/categoryModel')

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
  
    if(parentId === null){
        category = categories.filter(cat => cat.parentId === undefined)
    } else {
        category = categories.filter(cat => cat.parentId === parentId)
    }
    
    for(let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            children: createCategories(categories, cate._id)
        })
    };

    return categoryList
}

//ADD CATEGORY  =>   api/v1/category/new
exports.addCategory = async (req, res, next) => {
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
}

//GET ALL CATEGORIES  =>  api/v1/categories
exports.getCategories = async (req, res, next) => {
    const categories = await Category.find();

    if(categories){
        const categoryList = createCategories(categories)

        res.status(200).json({
            success: true,
            categoryList
        })
    }
}