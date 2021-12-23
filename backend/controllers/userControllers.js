const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//GET currently logged in user  =>  GET :  api/v1/me
exports.getUserProfile = catchAsync( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});

// GET ALL USERS  =>  GET : api/v1/admin/users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        numOfUsers : users.length,
        users
    })
});

//GET USER  =>  GET : api/v1/admin/user/:id
exports.getUser = catchAsync( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new AppError("utilisateur pas trouvé", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
});

// UPDATE USER  =>  PATCH : api/v1/admin/users/:id
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify : false
    });

    res.status(200).json({
        success: true,
        user
    })
});

// DELETE USER  =>  DELETE : api/v1/admin/users/:id
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return next(new AppError("utilisateur pas trouvée", 404))
    };

    //delete avatar

    res.status(200).json({
        success: true
    })
});