import express from 'express';
import {
  containsNumber,
  getNumber,
  classifyNumeric,
  containsMany
} from './twilio.util';
import { accountSid, authToken } from '../keys/twilio';

const twilio = require('twilio')(accountSid, authToken);
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const http = require('http');

const port = 3000;


const responseMap = new Map();

// function to add responses to the Map 
function setResponse(key: string, response: string) {
  responseMap.set(key, response);
}

function initializeState() {
  setResponse('many nums', 'You sent more than one number! Please send only the result without spaces');
  setResponse('toolow', 'Your number today is too low :(');
  setResponse('<80', 'Your number today is between 70 and 80');
  setResponse('green', 'Green!');
  setResponse('yellow', 'Yellow!');
  setResponse('red', 'Red!');
  setResponse('green', 'Green!');
  setResponse('>=301', 'Too high (it is greater than 300!)');
  setResponse('no', 'You have entered no in your response');
}

initializeState();


// send initial message to the user
/*
twilio.messages
  .create({
    body: 'hello!',
    from: '+14155286397',
    to: '+12482382012'
  })
  .then(function (message:any) { return console.log(message.sid); });
*/

    
// this route receives and parses the message from one user, than responds accordingly with the appropriate output 
router.post('/reply', function (req, res) {
  const {MessagingResponse} = require('twilio').twiml; 
  const twiml = new MessagingResponse();
  const message = twiml.message();
  const response = req.body.Body;
  
  // if contains many numbers then respond with "too many number inputs"
  if (containsMany(response)) {
    message.body(responseMap.get('many nums'));
  }
  
  // if contains number then classify
  else if (containsNumber(response)) {
    const value = getNumber(response);
    message.body(responseMap.get(classifyNumeric(value)));
  }

  // if contains no then respond with the default no response
  else if (response.toLowerCase() === ('no')) {
    message.body(responseMap.get('no'));
  }

  // catch-all else statement to ask for valid input
  else {
    message.body('Please respond with a valid input');
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// VERY IMPORTANT NOTE TO RUN THIS ON PORT 5000 FOR NGROK OR ELSE IT WON'T WORK
// ./ngrok http 5000
http.createServer(router).listen(port, function() {
  console.log('Express server listening on port 5000');
});

export default router;