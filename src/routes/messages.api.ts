/* eslint-disable no-shadow */
import express from 'express';
import { ObjectId } from 'mongodb';
import auth from '../middleware/auth';
import { Message, IMessage } from '../models/message.model';
import { Outcome, IOutcome } from '../models/outcome.model';
import { Patient, IPatient } from '../models/patient.model';


import initializeScheduler from '../utils/scheduling';

const router = express.Router();
initializeScheduler();

router.post('/newMessage', auth, async (req, res) => {
  // validate phone number
  if (!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
    return res.status(400).json({
      msg: 'Unable to add message: invalid phone number'
    }); 
  }

  if (!req.body.patientID || req.body.patientID == ''){
    return res.status(400).json({
      msg: 'Unable to add message: must include patient ID'
    });
  }

  if (!req.body.sender || req.body.sender == ''){
    return res.status(400).json({
      msg: 'Unable to add message: must include sender'
    });
  }

  if (!req.body.date || req.body.date == ''){
    return res.status(400).json({
      msg: 'Unable to add message: must include date'
    });
  }

  if (req.body.image == null) {
    const newMessage = new Message({
      phoneNumber: req.body.phoneNumber,
      patientID: req.body.patientID,
      message: req.body.message,
      sender: req.body.sender,
      date: req.body.date
    });
    return newMessage.save().then( () => {
      
      res.status(200).json({
        success: true
      });
    });
  } 
    
});


router.post('/newOutcome', auth, async (req, res) => {
  // validate phone number
  if (!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
    return res.status(400).json({
      msg: 'Unable to add outcome: invalid phone number'
    });
  }

  if (req.body.patientID == ''){
    return res.status(400).json({
      msg: 'Unable to add outcome: must include patient ID'
    });
  }

  if (req.body.language == ''){
    return res.status(400).json({
      msg: 'Unable to add outcome: must include language'
    });
  }

  const newOutcome = new Outcome({
    patientID: req.body.patientID,
    phoneNumber: req.body.phoneNumber,
    date: req.body.date,
    response: req.body.response,
    value: req.body.value,
    alertType: req.body.alertType
  });
  Patient.findOneAndUpdate({_id : req.body.patientID}, {$inc: {responseCount: 1}});
  return newOutcome.save().then( () => {
    res.status(200).json({
      success: true
    });
  });
});

router.post('/scheduledMessage', auth, async (req, res) => {
  // validate phone number
  if (!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
    return res.status(400).json({
      msg: 'Unable to add outcome: invalid phone number'
    });
  }

  if (req.body.patientID == ''){
    return res.status(400).json({
      msg: 'Unable to add outcome: must include patient ID'
    });
  }

  if (req.body.language == ''){
    return res.status(400).json({
      msg: 'Unable to add outcome: must include language'
    });
  }

  const newMessage = new Message({
    patientID: req.body.patientID,
    phoneNumber: req.body.phoneNumber,
    date: req.body.date,
    response: req.body.response,
    value: req.body.value,
    alertType: req.body.alertType
  });
  return newMessage.save().then( () => {
    Patient.findByIdAndUpdate(new ObjectId(req.body.patientId), { $inc: { messagesSent : 1}});
    res.status(200).json({
      success: true
    });
  });
});

export default router;