import express from 'express';
import { Message, IMessage } from '../models/message.model';
import { Outcome, IOutcome } from '../models/outcome.model';

import auth from "../middleware/auth";
import initializeScheduler from "../utils/messaging";
import initaializeScheduler from '../utils/messaging';

const router = express.Router();
initaializeScheduler();

router.post("/newMessage", async (req, res) => {
    // validate phone number
    if(!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
        return res.status(400).json({
            msg: "Unable to add message: invalid phone number"
        })
    }

    if(!req.body.patientID || req.body.patientID == ""){
        return res.status(400).json({
            msg: "Unable to add message: must include patient ID"
        })
    }

    if(!req.body.sender || req.body.sender == ""){
        return res.status(400).json({
            msg: "Unable to add message: must include sender"
        })
    }

    if(!req.body.date || req.body.date == ""){
        return res.status(400).json({
            msg: "Unable to add message: must include date"
        })
    }

    if (req.body.image == null) {
        const newMessage = new Message({
            phoneNumber: req.body.phoneNumber,
            patientID: req.body.patientID,
            message: req.body.message,
            sender: req.body.sender,
            date: req.body.date
        })
        return newMessage.save().then( () => {
            //TODO Increase patient ID message sent
            res.status(200).json({
                success: true
            });
        });
    } else {
        const newMessage = new Message({
            phoneNumber: req.body.phoneNumber,
            patientID: req.body.patientID,
            message: req.body.messsage,
            sender: req.body.sender,
            image: req.body.image,
            date: req.body.date
        })
        return newMessage.save().then( () => {
            //TODO Increase message count for patient ID message sent to depending on user
            res.status(200).json({
                success: true
            });
        });
    }
})


router.post("/newOutcome", async (req, res) => {
    // validate phone number
    if(!req.body.phoneNumber || req.body.phoneNumber.match(/\d/g) == null ||  req.body.phoneNumber.match(/\d/g).length !== 10){
        return res.status(400).json({
            msg: "Unable to add patient: invalid phone number"
        })
    }

    if(req.body.patientID == ""){
        return res.status(400).json({
            msg: "Unable to add message: must include patient ID"
        })
    }

    if(req.body.language == ""){
        return res.status(400).json({
            msg: "Unable to add patient: must include language"
        })
    }

    const newOutcome = new Outcome({
        patientID: req.body.patientID,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        response: req.body.response,
        value: req.body.value,
        alertType: req.body.alertType
    })
    return newOutcome.save().then( () => {
        res.status(200).json({
            success: true
        });
    });
})

export default router;