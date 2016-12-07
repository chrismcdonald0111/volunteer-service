var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/**
 * HTTP POST: /email/send
 * Send an email
 */
router.post('/send', function(req, res) {
    sendEmail(req, res);
    function sendEmail(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ronaldmcdonaldhorses@gmail.com',
                pass: 'slappinghorsefaces'
            }
        });
        var text = 'Volunteer Service Robot:\n' +
            'Someone has added a new event to the volunteer service calendar.\n\n' +
            'NEW EVENT: \n' +
            'Date: ' + req.body.month + '/' + req.body.day + '/' + req.body.year + '\n' +
            // 'Day: ' + req.body.day +
            // 'Month:' + req.body.month +
            // 'Year:' + req.body.year +
            'Organization Name: ' + req.body.organization_name + '\n'+
            'Contact Name: ' + req.body.contact_name + '\n'+
            'Phone Number: ' + req.body.phone_number + '\n'+
            'Contact Email: ' + req.body.contact_email + '\n'+
            'Number of Volunteers: ' + req.body.number_of_volunteers + '\n'+
            'Type of Service Project: ' + req.body.type_of_service_project + '\n\n'+
            'Thank you and have a nice day.';
        var mailOptions = {
            from: 'ronaldmcdonaldhorses@gmail.com', // sender address
            to: 'ronaldmcdonaldhorses@gmail.com', // list of receivers
            subject: 'New Event: Volunteer Service', // Subject line
            text: text //, // plaintext body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    }
});

module.exports = router;