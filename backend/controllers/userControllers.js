const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET ALL USERS  =>  GET : api/v1/admin/users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        numOfUsers : users.length,
        users
    })
});

// UPDATE USER  =>  PATCH : api/v1/admin/users/:id
exports.updateUser = catchAsync(async (req, res, next) => {

});

// DELETE USER  =>  DELETE : api/v1/admin/users/:id
exports.deleteUser = catchAsync(async (req, res, next) => {

});