import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
    meetingLink: { type: String, required: true },
    startTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
