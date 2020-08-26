const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: 'Category can\'t be empty'
    },
    contentDesc: {
        type: String,
        required: 'Description can\'t be empty',
        unique: true
    }
},{
    collection: 'category'
  });



mongoose.model('Category', categorySchema);