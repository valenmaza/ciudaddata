import { Schema, model } from 'mongoose';

// Definimos qué datos tendrá un reporte según el proyecto
const reportSchema = new Schema({
  type: { 
    type: String, 
    enum: ['urban', 'transit'], // Solo permite estos dos tipos
    required: true 
  },
  description: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

export const Report = model('Report', reportSchema);
