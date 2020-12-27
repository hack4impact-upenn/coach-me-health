import express from 'express';
import { User, IMesssageTemplate } from '../models/messageTemplate.model';

const router = express.Router();

router.post("/newTemplate", async (req, res) => {
    if (req.body.image == null) {
        const newMessageTemplate = new User({
            language: req.body.language,
            text: req.body.text,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        });
    } else {
        const newMessageTemplate = new User({
            language: req.body.language,
            text: req.body.text,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        });
    }
})

export default router;