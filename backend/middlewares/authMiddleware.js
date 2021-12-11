const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.isAuthenticated = catchAsync(async (req, res, next) => {
    //Get token and check if it's there
    const {token} = req.cookies;
    console.log(req.cookies.token)
    if(!token){
        return next(new AppError('veuillez vous connecter pour accéder cette ressource', 401))
    }

    //Verify token match

    //Check if user still exists

    //Check if user changed password after token was issued
    
    next()
})