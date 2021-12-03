const app = require('./app.js');
const dotenv = require('dotenv');
const connectDB = require('./config/database')

//setting up config file 
dotenv.config({path: 'backend/config/config.env'})

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

