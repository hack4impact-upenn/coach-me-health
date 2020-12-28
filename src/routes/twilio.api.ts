import express from 'express';
import { ObjectId } from 'mongodb';
import {
  containsNumber,
  getNumber,
  classifyNumeric,
  containsMany
} from './twilio.util';

import { Message, IMessage } from '../models/message.model';
import { accountSid, authToken } from '../keys/twilio';
import { Outcome } from '../models/outcome.model';
import { Patient } from '../models/patient.model';

const twilio = require('twilio')(accountSid, authToken);

const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const responseMap = new Map();

const getPatientIdFromNumber = (number: any) => {
  return Patient.findOne({ phoneNumber: number}).select('_id')
    .then((patientId) => {
      console.log(number);
      if (!patientId) console.log('No patient found!');
      return patientId;
    })
    .catch((err) => { return (err.message);
    });
};

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

    
// this route receives and parses the message from one user, then responds accordingly with the appropriate output 
router.post('/reply', function (req, res) {
  const {MessagingResponse} = require('twilio').twiml; 
  const twiml = new MessagingResponse();
  const message = twiml.message();
  const response = req.body.Body;

  // generate date 
  const date = new Date();
  
  // add patient's text to message log for ALL TEXTS
  const getId = getPatientIdFromNumber(req.body.From.slice(2)).then(
    (id) => {
      const patientId = new ObjectId(id._id);
      const incomingMessage = new Message({
        sent: true,
        phoneNumber: req.body.From,
        patientID: patientId,
        message: response,
        sender: 'PATIENT',
        date: date
      });
    
      incomingMessage.save().then(() => {
        console.log('saved');
      });
    });


  
  // if contains many numbers then respond with "too many number inputs"
  // this is a bad outcome, only add to message log
  if (containsMany(response)) {

    const getId = getPatientIdFromNumber(req.body.From.slice(2)).then(
      (id) => {
        const patientId = new ObjectId(id._id);
        const outgoingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId, // lost on this
          message: responseMap.get('many nums'),
          sender: 'BOT',
          date: date
        });
  
        outgoingMessage.save().then(() => {
          console.log('saved');
        }); 
      });
    message.body(responseMap.get('many nums'));
  
  }
  
  // if contains number then classify
  // this is a good outcome, update backend accordingly
  // add to message log and also call newOutcome
  else if (containsNumber(response)) {
    const value = getNumber(response);

    const getId = getPatientIdFromNumber(req.body.From.slice(2)).then(
      (id) => {
        const patientId = new ObjectId(id._id);
        const outgoingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId, // lost on this
          message: classifyNumeric(value),
          sender: 'BOT',
          date: date
        });
  
        outgoingMessage.save().then(() => {
          console.log('saved');
        }); 
      });
    
    const getOutcome = getPatientIdFromNumber(req.body.From.slice(2)).then(
      (id) => {
        const patientId = new ObjectId(id._id);
        const outcome = new Outcome({
          phoneNumber: req.body.To,
          patientID: patientId,
          response: response, // the entire text the patient sends
          value: value, // numerical measurement 
          alertType: classifyNumeric(value), // Color
          date: date
        });
  
        outcome.save().then(() => {
          console.log('saved outcome');
        }); 
      });  
    message.body(responseMap.get(classifyNumeric(value)));
  }

  // if contains no then respond with the default no response
  // this is a bad outcome, only add to message log

  else if (response.toLowerCase() === ('no')) {

    const getId = getPatientIdFromNumber(req.body.From.slice(2)).then(
      (id) => {
        const patientId = new ObjectId(id._id);

        const outgoingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId, // lost on this
          message: responseMap.get('no'),
          sender: 'BOT',
          date: date
        });
  
        outgoingMessage.save().then(() => {
          console.log('saved');
        });
      });
    message.body(responseMap.get('no'));

}

  // catch-all else statement to ask for valid input
  else {
    const getId = getPatientIdFromNumber(req.body.From.slice(2)).then(
      (id) => {
        const patientId = new ObjectId(id._id);
        // this is a bad outcome, only add to message log
        const outgoingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId, 
          message: 'Please respond with a valid input',
          sender: 'BOT',
          date
        });
  
        outgoingMessage.save().then(() => {
          console.log('saved');
        }); 
      });
    message.body('Please respond with a valid input');

  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

export default router;