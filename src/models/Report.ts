import { Schema, model } from 'mongoose';

const reportSchema = new Schema({
  type: { 
    type: String, 
    enum: ['urban', 'transit'],
    required: false 
  },
  city: { type: String, required: false },

  location: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'open' }
});

export const Report = model('Report', reportSchema);