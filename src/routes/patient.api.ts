import express from 'express';
import { Outcome } from '../models/outcome.model';
import { Patient, IPatient } from '../models/patient.model';
var faker = require('faker');
import auth from '../middleware/auth';
import errorHandler from './error';
const ObjectId = require('mongoose').Types.ObjectId; 

const router = express.Router();

router.post("/add", async (req, res) => {
    // validate phone number
    if(!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
        return res.status(400).json({
            msg: "Unable to add patient: invalid phone number"
        })
    }

    if(req.body.firstName == ""){
        return res.status(400).json({
            msg: "Unable to add patient: must include first name"
        })
    }

    if(req.body.lastName == ""){
        return res.status(400).json({
            msg: "Unable to add patient: must include last name"
        })
    }

    if(req.body.language == ""){
        return res.status(400).json({
            msg: "Unable to add patient: must include language"
        })
    }

    const newPatient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        language: req.body.language,
        phoneNumber: req.body.phoneNumber,
        reports: [],
        responseCount: 0,
        messagesSent: 0,
    })
    return newPatient.save().then( () => {
        res.status(200).json({
            success: true
        });
    });
})

router.post("/addTestPatients", async (req, res) => {
    var iter = req.body.iter;
    
    for(var i = 0; i < iter; i++) {
        var sent = Math.floor(Math.random() * Math.floor(100));
        var resp = Math.floor(Math.random() * Math.floor(sent));
        const newPatient = new Patient({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            coachID: "5fe6a6d73b73c7551c945f64",
            coachName: "Ben Demers",
            language: "English",
            phoneNumber: faker.phone.phoneNumberFormat(),
            prefTime: "9 am PST",
            reports: [],
            responseCount: resp,
            messagesSent: sent,
            enabled: true,
        });
        await newPatient.save();
    }
    
    return res.status(200).json({
        success: true
    });
})

router.post("/addTestRecords", async (req, res) => {
    var iter = req.body.iter;
    
    for(var i = 0; i < iter; i++) {
        const newOutcome = new Outcome({
            patientID: "5fe6a6d73b73c7551c945f64",
            phoneNumber: faker.phone.phoneNumberFormat(),
            date: faker.date.recent(10),
            response: false,
            value: Math.ceil(Math.random() * 200),
            alertType: "test",
        });
        await newOutcome.save();
    }
    
    return res.status(200).json({
        success: true
    });
})

router.get('/getPatientOutcomes/:patientID', (req, res) => {
    const id = req.params.patientID;
    return Outcome.find( {patientID: new ObjectId(id)})
    .then((outcomeList) => {
      if (!outcomeList || outcomeList.length == 0 ) return errorHandler(res, 'No outcomes found!');

      return res.status(200).json(outcomeList);
    })
    .catch((err) => errorHandler(res, err.message));
});

router.get('/getPatient/:patientID', (req, res) => {
    const id = req.params.patientID;
    return Patient.findById(new ObjectId(id))
    .then((patient) => {
      if (!patient) return errorHandler(res, 'No patient found!');
      return res.status(200).json(patient);
    })
    .catch((err) => errorHandler(res, err.message));
});

export default router;