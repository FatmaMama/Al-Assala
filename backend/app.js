const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('helloooo')
})

//Routes
const categories = require('./routes/categoryRoutes');

app.use('/api/v1', categories);

module.exports = app;