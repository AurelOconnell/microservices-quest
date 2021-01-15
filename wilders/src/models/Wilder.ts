import mongoose from 'mongoose';

const { Schema } = mongoose;
const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
});

export default mongoose.model('wilder', WilderSchema);
