const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const sendToken = require('../utils/sendToken');


exports.signupUser = catchAsync(async (req, res, next) => {

    const {firstName, lastName, email, password, passwordChangedAt} = req.body;

    //to prevent that the user can add role as an admin we don't use directly req.body
    // const user = await User.create(req.body)

    

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        // passwordConfirm,
        passwordChangedAt,
        avatar: {
            public_id: "Al-Assala/avatars/default-avatar_zhm2mo",
            url: "https://res.cloudinary.com/fantasy2021/image/upload/v1640114557/Al-Assala/avatars/default-avatar_zhm2mo.png"
        }
    });

    sendToken(user, 200, res)
});

exports.loginUser = catchAsync(async (req, res, next) => {
    //Check if email and password exist
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('Veuillez entrer votre email et votre mot de passe', 401 ))
    };

    //Check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password');
    //To confuse hackers we put them together
    if(!user || !(await user.comparePassword(password))){
        return next(new AppError('email ou mot de passe invalide', 401))
    }

    //Send token
    sendToken(user, 200, res)
});

exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true
    })
})