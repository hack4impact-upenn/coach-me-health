import mongoose from 'mongoose';

const { Schema } = mongoose;

interface PatientModel extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  coachID: string;
  language: string;
  phoneNumber: string;
  messagesSent: number;
  responceCount: number;
  reports: [{
    data: Buffer,
    contentType: String;
  }];
};

const PatientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  coachID: { type: mongoose.Schema.Types.ObjectId, required: true },
  language: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  messagesSent: { type: Number, required: true },
  responceCount: { type: Number, required: true },
  reports: [{
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
  }]
});

const Patient = mongoose.model<PatientModel>('Patient', PatientSchema);

export { Patient, PatientModel };