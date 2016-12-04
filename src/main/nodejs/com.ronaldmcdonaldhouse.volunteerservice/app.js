/**
 * Ronald McDonald House - Volunteer Service Server
 */

/**
 * Dependencies
 */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var errorhandler = require('errorhandler');
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var multer = require('multer');
var expressSession = require('express-session');

/**
 * Mongoose ORM for MongoDB
 */
mongoose.connect('mongodb://0.0.0.0/volunteerservice')

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('secret'));
app.use(cors());
app.use(errorhandler());
app.use(express.static(__dirname + '/static'));
app.use(multer()); // for parsing multipart/form-data

/**
 * Handle PUT & DELETE requests from forms with a POST method
 */
app.use(methodOverride(function(req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

/**
 * Set the routes used by the API
 */
var calendar = require('./controller/CalendarController');
var service = require('./controller/ServiceController');

/**
 * Use the set routes
 */
app.use('/calendar', calendar);
app.use('/service', service);

/**
 * Handle 404 & 500 errors
 */
app.use(function(err, req, res){
    res.status(404);
    res.send("404 NOT FOUND");
    if(err) throw err;
});

app.use(function(err, req, res){
    res.status(500);
    res.send("500 SERVER ERROR");
    if(err) throw err;
});

module.exports = app;