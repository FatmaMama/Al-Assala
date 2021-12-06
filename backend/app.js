const express = require('express');
const app = express();

const AppError = require('./utils/appError')
const errorMiddleware = require('./middlewares/errorMiddleware');

const categories = require('./routes/categoryRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.json('helloooo')
})

//Routes
app.use('/api/v1', categories);


//Handling unhandled Routes
app.all('*', (req, res, next) => {
                next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorMiddleware)

module.exports = app;