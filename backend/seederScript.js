const Product = require ('./models/productModel');
const products = require('./data/product.json');
const connectDB = require('./config/database');

const dotenv = require('dotenv');
dotenv.config({ path : 'backend/config/config.env'});


connectDB();

const insertData = async () => {
    try {
        await Product.deleteMany();
        console.log('Products deleted successfully');

        await Product.insertMany(products);
        console.log('Products added successfully');

        process.exit();
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
};

insertData()