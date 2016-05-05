var basicAuth = require('basic-auth');

var User = require('../models/user');

module.exports = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
    }

    var auth = basicAuth(req);
    console.log(auth);
    User.findOne({Credentials: auth}, function (error, user) {
        console.log(user);
        if (error || !user) {
            unauthorized(res)
        }
        else {
            user.LastLoginTime = Date.now();
            console.log(user);
            user.save();
            req.auctions = {userId: user._id};
            next();
        }
    });


};