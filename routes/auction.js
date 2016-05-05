var _ = require('lodash');
var Auction = require('../models/auction');
var auctionFactory = require('../utiles/auction-factory');
var async = require('async');

module.exports = function (app) {
    app.post('/api/auctions', function (req, res) {

        auctionFactory(req, function (item) {
            var auction = new Auction(item);
            auction.Id = auction._id;
            auction.save(function (error) {
                if (!error) {
                    console.log("YEEES>>>???<<< :<<< " + error);
                    res.json({info: 'success'})
                } else {
                    console.log("ERRRORORO :<<< " + error);
                    res.json({info: 'error'});
                }
            })
        })

    });

    app.get('/api/auctions', function (req, res, next) {
        Auction.find().populate('User').populate('Category').populate('HighestBid').exec(function (error, auctions) {
            error ? res.json({error: error}) : res.json(auctions)
        })
    });

    app.get('/api/auctions/:id', function (req, res) {
        Auction.findById(req.params.id)
            .populate('User').populate('Category').populate('HighestBid')
            .exec(function (error, auction) {
                error ?
                    res.json({info: 'error', error: error}) : auction ?
                    res.json(auction) : res.json({info: 'error'});
            });
    });

    app.post('/api/auctions/:id', function (req, res) {
        Auction.findById(req.params.id, function (error, auction) {
            error ? res.json({info: 'error', error: error}) : function () {
                if (auction) {
                    _.merge(auction, req.body);
                    Auction.save(function (error) {
                        if (error) {
                            res.json({info: 'error', error: error});
                        }
                        res.json({info: 'success'});
                    });
                } else {
                    res.json({info: 'error'});
                }
            }
        });
    });

    app.delete('/api/auctions/:id', function (req, res) {
        Auction.findByIdAndRemove(req.params.id, function (error) {
            error ? res.json({info: 'error', error: error}) : res.json({info: 'success'});
        });
    });
};
