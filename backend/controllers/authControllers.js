const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken')

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        success: true,
        token,
        user
    })
});