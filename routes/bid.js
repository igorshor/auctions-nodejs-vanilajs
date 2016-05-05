var Bid = require('../models/bid');
var Auction = require('../models/auction');
var _ = require('lodash');

module.exports = function (app) {

    app.post('/api/bids/:id', function (req, res) {
        Auction.findById(req.params.id, function (error, auction) {
            if (!error && auction) {
                if (Auction.HighestBid) {
                    Bid.findById(Auction.HighestBid, function (error, bid) {
                        bid.Bid = req.body.Bid;
                        bid.BidTime = req.body.BidTime;

                        bid.save(function (error) {
                            auction.BidCount++;
                            auction.save(function (error) {
                                res.json({info: 'success'});
                            });
                        })
                    })
                }
                else {
                    var bid = new Bid(req.body);
                    bid.save(function (error) {
                        auction.HighestBid = bid._id;
                        auction.BidCount++;
                        auction.save(function (error) {
                            res.json({info: 'success'});
                        });
                    })
                }

            }
            else {
                res.json({info: 'error', error: error})
            }

        });
    });
};