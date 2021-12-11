const sendToken = (user, statusCode, res) => {

    const token = user.signToken(user._id);

    const options = {
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 3600 * 1000),
        httpOnly : true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
};

module.exports = sendToken;