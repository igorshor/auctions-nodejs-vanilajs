var express = require('express');
var auth = require('./config/auth');
var cors = require('cors');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auctions');

app.use(cors());
app.use(auth);

var auctions = require('./routes/auction')(app);
var bids = require('./routes/bid')(app);

app.listen(3000, function () {
    console.log("server is running")
});
