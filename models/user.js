var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    Credentials: {
        user: String,
        pass: String
    },
    Name: String,
    Email: String,
    LastLoginTime: Date,
    CreatedOn: Date
});

module.exports = mongoose.model('User', userSchema, 'user');