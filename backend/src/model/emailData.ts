import mongoose from 'mongoose';

const emailData = new mongoose.Schema(
  {    
    email_to: {
      type: String,
      required: [true, 'Email To is required'],      
    },
    subject:{
      type: String,
      required: [true, 'Subject is required'],
    },
    status:{
      type: String,
      default: 'pending',
    },
    send_date:{
      type: Date,
      default: Date.now(),
    },
    description:{
      type: String,      
    },
    createdAt:{
      type: Date,
      default: Date.now(),
    },
  }
);

export const EmailData = mongoose.model('EmailData', emailData);

