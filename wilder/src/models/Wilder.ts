import mongoose, { Document, Schema } from 'mongoose';

export interface IWilder {
  name: string;
  city: string;
}

interface WilderDoc extends IWilder, Document {}

const WilderSchema = new Schema<WilderDoc>({
  name: { type: String, unique: true },
  city: String,
});

const Wilder = mongoose.model<WilderDoc>('wilder', WilderSchema);

export default Wilder;
