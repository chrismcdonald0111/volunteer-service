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
 * HTTP GET: /service/:date
 * Return service data by 'date'
 */
router.get('/:date', function(req, res) {
    Service.find({date: req.params.date}, function (err, service_data) {
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
        service_id: req.body.service_id,
        calendar_id: req.body.calendar_id,
        service_status: req.body.service_status,
        date: req.body.date,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        service_category: req.body.service_category,
        service_order: req.body.service_order,
        queue: req.body.queue,
        queue_order: req.body.queue_order,
        full_name: req.body.full_name,
        service_name: req.body.service_name,
        service_description: req.body.service_description
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
            full_name: req.body.full_name,
            service_name: req.body.service_name,
            service_description: req.body.service_description,
            service_status: req.body.service_status
        },
        req.body, function(err, service_data) {
        if(err) throw err;
        res.send(service_data);
    });
});

module.exports = router;