

import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String }, // Optional
  photoFileId: {type:String},
  aboutMe: { type: String }, // ✅ New field
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
});

const Expert = mongoose.model('Expert', expertSchema);
export default Expert;
