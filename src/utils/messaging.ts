import express from 'express';
import { Message, IMessage } from '../models/message.model';
import { Outcome, IOutcome } from '../models/outcome.model';
import schedule from 'node-schedule';

// time in seconds between each run of scheduler
const schedulingInterval = 5;

// selects all messages which should be sent within the next __ seconds, and schedules them to be sent
const scheduleMessages = (interval : number) => {
    console.log("Scheduling messages to be sent...")
    const intervalStart = new Date();
    const intervalEnd = new Date(intervalStart.getTime());
    intervalEnd.setSeconds(intervalEnd.getSeconds() + interval);

    const messages = Message.find({
        date : {
            $lt: intervalEnd,
        },
        sent: false
    }, (err, docs) => {
        docs.forEach( (doc) => {
            console.log(`Scheduled to send message "${doc.message}" to ${doc.phoneNumber}`)
            schedule.scheduleJob(doc.date, () => {
                sendMessage(doc);
            })
        })
    })
};

// sends message, marks it as sent
const sendMessage = (msg : IMessage) => {
    console.log(`Sent message "${msg.message}" to ${msg.phoneNumber}`);
    // Twilio people do your thing here
 
    //         _    _                  _       
    //        | |  | |                | |      
    //        | |__| | _____      ____| |_   _ 
    //        |  __  |/ _ \ \ /\ / / _` | | | |
    //        | |  | | (_) \ V  V / (_| | |_| |
    //        |_|  |_|\___/ \_/\_/ \__,_|\__, |
    //                                    __/ |
    //                                   |___/ 

    // mark message as sent
    Message.findOneAndUpdate( { _id: msg.id }, {
        sent: true
    }, (err, res) => {
        if(err){
           console.log(err)
        }
    });
};

const initaializeScheduler = () => {
    scheduleMessages(schedulingInterval);
    setInterval(() => scheduleMessages(schedulingInterval), schedulingInterval * 1000);
}

export default initaializeScheduler;