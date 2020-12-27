import express from 'express';
import { User, IMesssageTemplate } from '../models/messageTemplate.model';
import errorHandler from './error';

const router = express.Router();

router.post("/newTemplate", async (req, res) => {

    if (!req.body.messageTxt || req.body.messageTxt === '') {
        res.status(400).send("Please Enter Message Text!");
    } else if (req.body.image == null) {
        const newMessageTemplate = new User({
            language: req.body.language,
            text: req.body.messageTxt,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        }).catch((err) => {console.log(err.message) });
    } else {
        const newMessageTemplate = new User({
            language: req.body.language,
            text: req.body.messageTxt,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        }).catch((err)  => {console.log(err.message)});
    }
})

export default router;