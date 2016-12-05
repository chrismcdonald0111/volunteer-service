/**
 * Service Model
 */
var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    date: String,
    year: Number,
    month: Number,
    day: Number,
    organization_name: String,
    contact_name: String,
    phone_number: String,
    contact_email: String,
    number_of_volunteers: Number,
    type_of_service_project: String
});

module.exports = mongoose.model('Service', serviceSchema, 'Service');