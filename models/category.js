var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    Id: Number,
    Name: String
});

module.exports = mongoose.model('Category', categorySchema, 'category');