const dotenv = require('dotenv');
//setting up config file 
dotenv.config({path: 'backend/config/config.env'});

//Handle uncaught exceptions (for example console.log(x) but x is not defined => error)
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION, Shutting down the server...')
    process.exit(1)
})

const app = require('./app.js');

const connectDB = require('./config/database')

//connect database
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle unhandled promise rejections (like the connection of mongoDB)
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION, Shutting down the server...')
    server.close(() => process.exit(1))
})