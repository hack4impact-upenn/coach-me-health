import express from 'express';
import { Patient, IPatient } from '../models/patient.model';

const router = express.Router();

router.post('/add', async (req, res) => {
  // validate phone number
  if (!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
    return res.status(400).json({
      msg: 'Unable to add patient: invalid phone number'
    });
  }

  if (req.body.firstName == ''){
    return res.status(400).json({
      msg: 'Unable to add patient: must include first name'
    });
  }

  if (req.body.lastName == ''){
    return res.status(400).json({
      msg: 'Unable to add patient: must include last name'
    });
  }

  if (req.body.language == ''){
    return res.status(400).json({
      msg: 'Unable to add patient: must include language'
    });
  }

  const newPatient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    language: req.body.language,
    phoneNumber: req.body.phoneNumber,
    reports: [],
    responseCount: 0,
    messagesSent: 0,
  });
  return newPatient.save().then( () => {
    res.status(200).json({
      success: true
    });
  });
});

export default router;