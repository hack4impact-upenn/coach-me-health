/* eslint-disable radix */
import express from 'express';
import { ObjectId } from 'mongodb';
import {
  containsNumber,
  getNumber,
  classifyNumeric,
  containsMany
} from './twilio.util';

import { Message, IMessage } from '../models/message.model';
import { MessageTemplate } from '../models/messageTemplate.model';
import { accountSid, authToken, twilioNumber } from '../keys/twilio';
import { Outcome } from '../models/outcome.model';
import { Patient } from '../models/patient.model';
import auth from '../middleware/auth';

const twilio = require('twilio')(accountSid, authToken);
const number = twilioNumber.replace(/[^0-9\.]/g, '');

const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const responseMap = new Map();

const getPatientIdFromNumber = (number: any) => {
  return Patient.findOne({ phoneNumber: number}).select('_id language')
    .then((patientId) => {
      if (!patientId) console.log('No patient found!');
      return patientId;
    })
    .catch((err) => { return (err.message);
    });
};

// function to add responses to the Map 
function setResponse(key: string, response: Object) {
  responseMap.set(key, response);
}

function initializeState() {
  setResponse('many nums', { english:'You sent more than one number! Please send only the result without spaces',
                             spanish: 'Too many numbers (Spanish)'});
  setResponse('toolow', { english:'Your number today is too low',
                          spanish: 'Your number today is too low (Spanish)'});
  setResponse('<80', {english: 'Your number today is between 70 and 80',
                      spanish: 'Your number today is between 70 and 80 (Spanish)'});
  setResponse('green', {english: 'Green!',
                        spanish: 'Green (Spanish)'});
  setResponse('yellow', {english: 'Yellow!',
                         spanish: 'Yellow (Spanish)'});
  setResponse('red', {english: 'Red!',
                      spanish: 'Red (Spanish)'});
  setResponse('>=301', {english: 'Too high (it is greater than 300!) Plesae respond with a valid measurment',
                        spanish: 'Too high (it is greater than 300!) Plesae respond with a valid measurment (Spanish)'});
  setResponse('no', {english: 'You have entered no measurement',
                     spanish: 'You have entered no measurement (Spanish)'});
  setResponse('catch', {english: 'Please respond with a valid input.',
                     spanish: 'Please respond with a valid input. (Spanish)'});
}

initializeState();

router.post('/sendMessage', auth, function (req, res) {
  const contnet = req.body.message;
  const recept = req.body.to;
  const patientID = new ObjectId(req.body.patientID);
  const date = new Date();

  twilio.messages
  .create({
    body: contnet,
    from: number, // this is hardcoded right now
    to: recept
  });

  const outgoingMessage = new Message({
    sent: true,
    phoneNumber: number,
    patientID: patientID,
    message: contnet,
    sender: 'COACH',
    date: date
  });

  outgoingMessage.save().then(() => {
    res.status(200).send('Message Sent!');
  }).catch((err) => console.log(err));

});

   
// this route receives and parses the message from one user, then responds accordingly with the appropriate output 
router.post('/reply', function (req, res) {
  const {MessagingResponse} = require('twilio').twiml; 
  const twiml = new MessagingResponse();
  const message = twiml.message();
  if(req.body.Body) {
    var response = req.body.Body;  
  } else {
    response = "Invalid Text (image)";
  }
  // generate date 
  const date = new Date();

  getPatientIdFromNumber(req.body.From.slice(2)).then(
    (patient) => {
      const language = patient.language.toLowerCase();
      const patientId = new ObjectId(patient._id);
        const incomingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId,
          message: response,
          sender: 'PATIENT',
          date: date
        });
  
        incomingMessage.save().then(() => {
          console.log('saved');
        }); 
    // if contains many numbers then respond with "too many number inputs"
    // this is a bad outcome, only add to message log
    if (containsMany(response)) {
      const outgoingMessage = new Message({
        sent: true,
        phoneNumber: req.body.To,
        patientID: patientId, // lost on this
        message: responseMap.get('many nums')[language],
        sender: 'BOT',
        date: date
      });

      outgoingMessage.save().then(() => {
        console.log('saved');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        message.body(responseMap.get('many nums')[language]);
      }); 
    
  //Measurement found
  } else if (containsNumber(response)) {
    const value = getNumber(response);

    if (classifyNumeric(value) === "green" || classifyNumeric(value) === "yellow" || classifyNumeric(value) === "red") {
      const outcome = new Outcome({
        phoneNumber: req.body.From,
        patientID: patientId,
        response: response, // the entire text the patient sends
        value: value[0], // numerical measurement 
        alertType: classifyNumeric(value), // Color
        date: date
      });
      
      outcome.save().then(() => {
        console.log('saved outcome');
      }); 
      const classification = classifyNumeric(value)
      const typeUpperCase = classification.charAt(0).toUpperCase() + classification.slice(1);
      const upperLang = language.charAt(0).toUpperCase() + language.slice(1);
      MessageTemplate.find({language: upperLang, type: typeUpperCase}).then((messages) => {
        const randomVal =  Math.floor(Math.random() * ((messages.length - 1) - 0));
        const messageTemp = messages[randomVal];
        const outgoingMessage = new Message({
          sent: true,
          phoneNumber: req.body.To,
          patientID: patientId,
          message: messageTemp.text,
          sender: 'BOT',
          date: date
        });
  
        outgoingMessage.save().then(() => {
          console.log('saved');
        });
        message.body(messageTemp.text);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());

      }).catch((err) => {
        message.body(responseMap.get(classifyNumeric(value))[language]);
      });
      
    } else {
      const outgoingMessage = new Message({
        sent: true,
        phoneNumber: req.body.To,
        patientID: patientId,
        message: responseMap.get(classifyNumeric(value))[language],
        sender: 'BOT',
        date: date
      });

      outgoingMessage.save().then(() => {
        console.log('saved');
        message.body(responseMap.get(classifyNumeric(value))[language]);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      });
    }
    
    
  //Message is "no"
  } else if (response.toLowerCase() === ('no')) {
    const outgoingMessage = new Message({
      sent: true,
      phoneNumber: req.body.To,
      patientID: patientId, 
      message: responseMap.get('no')[language],
      sender: 'BOT',
      date: date
    });

    outgoingMessage.save().then(() => {
      console.log('saved');
      message.body(responseMap.get('no')[language]);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
   
  //catch all
  } else {
    const outgoingMessage = new Message({
      sent: true,
      phoneNumber: req.body.To,
      patientID: patientId, 
      message: responseMap.get('catch')[language],
      sender: 'BOT',
      date
    });

      outgoingMessage.save().then(() => {
        console.log('saved');
        message.body(responseMap.get('catch')[language]);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      }); 
  }
  
  });
});


export default router;