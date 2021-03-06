const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError')
const errorMiddleware = require('./middlewares/errorMiddleware');
const bodyparser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const categories = require('./routes/categoryRoutes');
const products = require('./routes/productRoutes');
const users = require('./routes/userRoutes');
const orders = require('./routes/orderRoutes');
const orderSettings = require('./routes/orderSettingsRoutes')

const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');

//security http headers
app.use(helmet());

//limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Trop de requêtes de cette IP, veuillez réessayer dans une heure!'
});

app.use('/api', limiter);

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(fileUpload());

//data sanitization against noSql query injection
app.use(mongoSanitize());

//data sanitization against xss
app.use(xss());

//prevent parameter pollution
app.use(hpp());

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
app.use('/api/v1', orderSettings);

//Handling unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorMiddleware)

module.exports = app;