/**
 * Service Model
 */
var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    service_id: Number,
    calendar_id: Number,
    service_status: String,
    date: String,
    year: Number,
    month: Number,
    day: Number,
    service_category: String,
    service_order: Number,
    queue: Boolean,
    queue_order: Number,
    full_name: String,
    service_name: String,
    service_description: String
});

module.exports = mongoose.model('Service', serviceSchema, 'Service');