/**
 * Calendar Model
 */
var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
    calendar_id: Number,
    service_ids: Array,
    year: Number,
    month: Number
});

module.exports = mongoose.model('Calendar', calendarSchema, 'Calendar');