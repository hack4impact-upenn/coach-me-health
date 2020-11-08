import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IMesssageTemplate extends mongoose.Document {
  _id: string;
  messageText: string;
  language: string;
  type: string;
}

const MessageTemplateSchema = new Schema({
  text: { type: String, required: true },
  language: { type: String, required: true },
  type: { type: String, required: true }
});

const User = mongoose.model<IMesssageTemplate>('MessageTemplate', MessageTemplateSchema);

export { User, IMesssageTemplate };
