const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError')
const errorMiddleware = require('./middlewares/errorMiddleware');

const categories = require('./routes/categoryRoutes');
const products = require('./routes/productRoutes');
const users = require('./routes/userRoutes');
const orders = require('./routes/orderRoutes');

const cloudinary = require('cloudinary');
const fileUpload = require('express-fileUpload');

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload())

//setup cloudinary
cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Routes
app.use('/api/v1', categories);
app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', orders);

//Handling unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorMiddleware)

module.exports = app;