import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },

  // Optional multiple time slots (time-only, stored as Date objects on dummy date)
  timeSlots: [{ type: Date }] // Optional field
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
