import express from 'express';
import {
    containsNumber,
    getNumber,
    classifyNumeric,
  } from './twilio.util';
const accountSid = 'aa'
const authToken = 'aa'
const twilio = require('twilio')(accountSid, authToken)
const bodyParser = require('body-parser')
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }))
const http = require('http')
const port = 3000


var responseMap = new Map();

router.post('/init', function(message) {
    twilio.messages
      .create({
      body: 'hello!',
      from: '+14084098645',
      to: '+12482382012'
    })
    return console.log("Message sent");
    });
    
// this route receives and parses the message from one user, than responds accordingly with the appropriate output 
router.post('/reply', function(req, res) {
    const MessagingResponse = twilio.twiml.MessagingResponse 
    const twiml = new MessagingResponse()
    const message = twiml.message()
    var response = req.body.Body

    // if contains number then classify
    if (containsNumber(response)) {
        var value = getNumber(response)
        message.body(responseMap.get(classifyNumeric(value)))
    }

    // if contains no then respond with the default no response
    else if (response.toLowerCase.includes('no')) {
        message.body(responseMap.get('no'));
    }

    // catch-all else statement to ask for valid input
    else {
        message.body('Please respond with a valid number or NO if you did not measure');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


http.createServer(router).listen(port, function () {
    console.log("Express server listening on port 3000");
});

export default router;