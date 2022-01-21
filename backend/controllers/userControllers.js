const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary = require('cloudinary');

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
    const image_id = user.avatar.public_id;
    if(image_id !== "Al-Assala/avatars/default-avatar_zhm2mo"){
        await cloudinary.v2.uploader.destroy(image_id);
    }

    res.status(200).json({
        success: true
    })
});


//UPDATE USER PROFILE  => PATCH :  api/v1/user/update
exports.updateProfile = catchAsync( async (req, res, next) => {
    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;
        if(image_id !== "Al-Assala/avatars/default-avatar_zhm2mo"){
            await cloudinary.v2.uploader.destroy(image_id);
        }

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'Al-Assala/avatars',
            width: 150,
            crop: 'scale'
        });

        newUserData.avatar = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify : false
    });

    res.status(200).json({
        success: true,
        user
    })
});