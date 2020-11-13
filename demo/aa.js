// setup variables and express/twilio etc.
var accountSid = aaa;
var authToken = 02, aaa;
var twilio = require('twilio')(accountSid, authToken);
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var port = 3000;
// map for the sample responses. The key is the result category and the value is the response. Populate the map as necessary
var responseMap = new Map();
// regex function to see if input string contains a number
function containsNumber(input) {
    return /\d/.test(input);
}
// regex function to get the number from the string (use in conjunction with contains)
// check for 2 digit number and if null check for 3 digit number
function getNumber(input_s) {
    if (input_s.match(/\b\d{2}\b/g) != null) {
        return input_s.match(/\b\d{2}\b/g);
    }
    else {
        return input_s.match(/\b\d{3}\b/g);
    }
}
// classify numeric user responses. We do not use spacing for the inequalities to be consistent, mostly for the mapping
// currently, we have this as a switch statement but ultimately we want to create some sort of data structure for this as well
function classifyNumeric(input) {
    var number = parseInt(input);
    if (number < 70) {
        return "toolow";
    }
    else if (70 <= number && number <= 79) {
        return "<80";
    }
    else if (80 <= number && number <= 130) {
        return "green";
    }
    else if (131 <= number && number <= 180) {
        return "yellow";
    }
    else if (181 <= number && number <= 300) {
        return "red";
    }
    else {
        return ">=301";
    }
}
// send initial message to the user
twilio.messages
    .create({
    body: 'hello!',
    from: '+14155286397',
    to: '+12482382012'
})
    .then(function (message) { return console.log(message.sid); });
// this route receives and parses the message from one user, than responds accordingly with the appropriate output 
app.post('/sms', function (req, res) {
    var MessagingResponse = twilio.twiml.MessagingResponse;
    var twiml = new MessagingResponse();
    var message = twiml.message();
    var response = req.body.Body;
    // if contains number then classify
    if (containsNumber(response)) {
        var value = getNumber(response);
        message.body(responseMap.get(classifyNumeric(value)));
    }
    // if contains no then respond with the default no response
    else if (response.toLowerCase.includes('no')) {
        message.body(responseMap.get('no'));
    }
    // catch-all else statement to ask for valid input
    else {
        message.body('Please respond with a valid input');
    }
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});
http.createServer(app).listen(port, function () {
    console.log("Express server listening on port 3000");
});
