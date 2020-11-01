import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IMessage extends mongoose.Document {
  _id: string;
  patientID: number;
  message: string;
  image: {
    data: Buffer,
    contentType: String;
  };
  date: Date;
}

const MessageSchema = new Schema({
  patientID: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  image: { data: {type: mongoose.Schema.Types.Buffer, required: false}, 
           contentType: { type: String, required: false} },
  date: { type: mongoose.Schema.Types.Date, required: true },
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export { Message, IMessage };

