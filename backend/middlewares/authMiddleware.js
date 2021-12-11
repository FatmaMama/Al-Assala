const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

exports.isAuthenticated = catchAsync(async (req, res, next) => {
    //Get token and check if it's there
    const {token} = req.cookies;
    
    if(!token){
        return next(new AppError('veuillez vous connecter pour accéder cette ressource', 401))
    }

    //Verify token match (errors for decoded are handeled in the global errorMiddleware)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError("l'utilisateur appartenant à ce token n'existe plus", 401))
    }

    //Check if user changed password after token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("l'utilisateur a récemment changé le mot de passe! Veuillez vous reconnecter", 401))
    }

    //Grant access to protected route
    req.user = currentUser
    next()
})