const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signupUser = catchAsync(async (req, res, next) => {

    const {name, email, password, passwordConfirm, avatar } = req.body;

    //to prevent that the user can add role as an admin we don't use directly req.body
    // const user = await User.create(req.body)

    const user = await User.create({
        name,
        email,
        password,
        passwordConfirm
    });

    const token = signToken(user._id);

    res.status(201).json({
        success: true,
        token,
        user
    })
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
    const token = signToken(user._id);

    res.status(201).json({
        success: true,
        token
    })
})