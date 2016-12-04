/**
 * Dependencies
 */
var express = require('express');
var router = express.Router();

/**
 * Service Model
 */
var Service = require('../model/Service.js');

/**
 * HTTP GET: /service
 * Return all service data
 */
router.get('/', function(req, res) {
    Service.find({}, function (err, service_data) {
        if(err) throw err;
        res.send(service_data);
    });
});

/**
 * HTTP GET: /service/:month/:year
 * Return service data by 'date'
 */
router.get('/:month/:year', function(req, res) {
    Service.find({month: req.params.month, year: req.params.year}, function (err, service_data) {
        if(err) throw err;
        res.send(service_data);
    });
});
/**
 * HTTP POST: /service/new
 * Add new service data
 */
router.post('/new', function(req, res) {
    Service.create({
        date: req.body.date,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        organization_name: req.body.organization_name,
        contact_name: req.body.contact_name,
        phone_number: req.body.phone_number,
        contact_email: req.body.contact_email,
        number_of_volunteers: req.body.number_of_volunteers,
        type_of_service_project: req.body.type_of_service_project
    }, function (err, service_data) {
        if (err) throw err;
        res.send(service_data);
    });
});

/**
 * HTTP POST: /service/update
 * Update an existing service
 */
router.post('/update', function(req, res) {
    Service.update({
            date: req.body.date,
            year: req.body.year,
            month: req.body.month,
            day: req.body.day,
            organization_name: req.body.organization_name,
            contact_name: req.body.contact_name,
            phone_number: req.body.phone_number,
            contact_email: req.body.contact_email,
            number_of_volunteers: req.body.number_of_volunteers,
            type_of_service_project: req.body.type_of_service_project
        }, function(err, service_data) {
        if(err) throw err;
        res.send(service_data);
    });
});

module.exports = router;