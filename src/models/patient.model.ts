import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IPatient extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  coachID: string;
  language: string;
  phoneNumber: string;
  messagesSent: number;
  responseCount: number;
  reports: [{
    data: Buffer,
    contentType: String;
  }];
};

const PatientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  coachID: { type: mongoose.Schema.Types.ObjectId },
  language: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  messagesSent: { type: Number, required: true },
  responseCount: { type: Number, required: true },
  reports: [{
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
  }]
});

const Patient = mongoose.model<IPatient>('Patient', PatientSchema);

export { Patient, IPatient };