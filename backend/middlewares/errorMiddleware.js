const AppError = require("../utils/appError");

const sendErrorEnv = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,
        stack: err.stack
    })
};

const sendErrorProd = (err, res) => {
    //Operational, trusted error: send message to the client
    if(err.isOperational){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })

    //Programming or other unknown error: don't leak error details
    } else {
        //Log error
        console.error("ERROR", err);
        //Send generic message
        res.status(500).json({
            success: false,
            message: "Something went very wrong",
        })
    }
    
}


const errorMiddleware = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;

     if(process.env.NODE_ENV === "DEVELOPMENT"){
        sendErrorEnv(err, res)
     } else if(process.env.NODE_ENV === "PRODUCTION"){
        // let error = { ...err};
        let error;
        //Other errors that are not treated in operational errors but we want them as operational
        //Wrong mongoose Object Id error
        if(err.name === "CastError"){
            const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
            error = new AppError(message, 400)
        }

        //Handling Mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate field value ${Object.keys(err.keyValue)}. Please use another value.`;
            error = new AppError(message, 400)
        }

        //Handling Mongoose Validation error
        if(err.name === "ValidatorError"){
            const errors = Object.values(err.errors).map(value => value.message);
            const message = `${errors.join(". ")}`
            error = new ErrorHandler(message, 400)
        };

        sendErrorProd(error, res)
     }

     
};

module.exports = errorMiddleware