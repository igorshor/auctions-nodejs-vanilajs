var Category = require('../models/category');
var async = require('async');

module.exports = function (req, saveCallback) {
    console.log(req.body);
    var newAuction = req.body;

    Category.findOne({Id: newAuction.CategoryId}, function (error, category) {
        // if (!newAuction.Title || !newAuction.Description || !newAuction.Picture1 || !category) {
        //     console.log('error');
        // }

        var auction = {};

        auction.Title = newAuction.Title;
        auction.Description = newAuction.Description;
        auction.StartTime = newAuction.StartTime;
        auction.EndTime = newAuction.EndTime;
        auction.StartBid = newAuction.StartBid;
        auction.Picture1 = newAuction.Picture1;
        auction.Picture2 = newAuction.Picture2;
        auction.Picture3 = newAuction.Picture3;
        auction.Picture4 = newAuction.Picture4;

        auction.User = req.auctions.userId;
        auction.Category = category._id;
        auction.HighestBid = null;
        auction.BidCount = 0;

        if (saveCallback) {
            saveCallback(auction);
        }

        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');

        console.log(auction);

        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++');

        return auction;
    })
};