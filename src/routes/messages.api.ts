/* eslint-disable no-shadow */
import express from 'express';
import { Message, IMessage } from '../models/message.model';
import { Outcome, IOutcome } from '../models/outcome.model';
import { Patient, IPatient } from '../models/patient.model';


import auth from '../middleware/auth';
import initializeScheduler from '../utils/scheduling';
import secureAxios from '../../glacial-falls-14734/src/client/src/api/core/apiClient';
import { update } from 'lodash';

const router = express.Router();
initializeScheduler();

const updatePatient = (patient: any) => {
  Patient.updateOne({_id: patient.patientID}, patient).then( () => {
      return true;
    });
};

router.post('/newMessage', async (req, res) => {
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
  const newMessage = new Message({
    phoneNumber: req.body.phoneNumber,
    patientID: req.body.patientID,
    message: req.body.messsage,
    sender: req.body.sender,
    image: req.body.image,
    date: req.body.date
  });
  return newMessage.save().then( () => {
    // TODO Increase message count for patient ID message sent to depending on user
    // done?
    secureAxios.get(`/api/patients/getPatient/${newMessage.patientID}`).then( (res) => {
      res.data.responseCount += 1;
      const patient = new Patient({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        language: res.data.language,
        phoneNumber: res.data.phoneNumber,
        reports: [],
        responseCount: res.data.responseCount,
        messagesSent: res.data.messagesSent,
      });
      updatePatient(patient);
    });
    res.status(200).json({
      success: true
    });
  });
    
});


router.post('/newOutcome', async (req, res) => {
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
  return newOutcome.save().then( () => {
    // TODO increase messages sent
    // done?
    secureAxios.get(`/api/patients/getPatient/${newOutcome.patientID}`).then( (res) => {
      res.data.messagesSent += 1;
      const patient = new Patient({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        language: res.data.language,
        phoneNumber: res.data.phoneNumber,
        reports: [],
        responseCount: res.data.responseCount,
        messagesSent: res.data.messagesSent,
      });
      updatePatient(patient);
    });
    res.status(200).json({
      success: true
    });
  });
});

export default router;