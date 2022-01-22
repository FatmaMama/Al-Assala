const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/email');

exports.signupUser = catchAsync(async (req, res, next) => {
    const {firstName, lastName, email, password, passwordChangedAt} = req.body;

    //to prevent that the user can add role as an admin we don't use directly req.body
    // const user = await User.create(req.body)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        passwordChangedAt,
        avatar: {
            public_id: "Al-Assala/avatars/default-avatar_zhm2mo",
            url: "https://res.cloudinary.com/fantasy2021/image/upload/v1640114557/Al-Assala/avatars/default-avatar_zhm2mo.png"
        }
    });

    sendToken(user, 201, res)
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
});


exports.updatePassword = catchAsync(async (req, res, next) => {
    //get user
    const user = await User.findById(req.user.id).select('+password')

    //Check if old password is correct
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new AppError('Ancien mot de passe est incorrect', 401))
    };

    //update password
    user.password = req.body.newPassword;
    await user.save();

    //login, send JWT
    sendToken(user, 200, res)
});


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new AppError("il n'y a pas d'utilisateur avec cette adresse e-mail", 404))
    };
    //Generate the random reset token
    const resetToken = user.setPasswordResetToken();
    await user.save({validateBeforeSave : false});
    
    //Send it to user's email
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `your password reset token is as follow: \n\n${resetUrl}\n\n
    if you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Al-Assala password recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `email sent to ${user.email}`
        })
        
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new AppError(error.message, 500))
    }
});


exports.resetPassword = catchAsync(async (req, res, next) => {
    
});