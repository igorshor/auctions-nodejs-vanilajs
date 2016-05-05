var mongoose = require('mongoose');

var auctionSchema = mongoose.Schema({
    Title: String,
    Description: String,
    StartTime: Date,
    EndTime: Date,
    StartBid: Number,
    Picture1: String,
    Picture2: String,
    Picture3: String,
    Picture4: String,
    Id: {type: String, required: true},
    IsItemNew: Boolean,
    User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    Category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    HighestBid: {type: mongoose.Schema.Types.ObjectId, ref: 'Bid'},
    BidCount: Number
});

module.exports = mongoose.model('Auction', auctionSchema, 'auction');