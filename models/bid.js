var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
    Bid: Number,
    BidTime: Date
});

module.exports = mongoose.model('Bid', bidSchema, 'bid');