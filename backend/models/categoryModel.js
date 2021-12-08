const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : [ true, 'Veuillez entrer le nom de la catégorie'],
        trim: true
    },

    parentId : {
        type : String
    }
}, {timestamps : true})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category