const dotenv = require('dotenv');
//setting up config file 
dotenv.config({path: 'backend/config/config.env'});

const app = require('./app.js');

const connectDB = require('./config/database')



connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

