import mongoose, { Document, Schema } from 'mongoose';

export interface IWilder {
  name: string;
  city: string;
}

interface WilderDoc extends IWilder, Document {}

const WilderSchema = new Schema<WilderDoc>(
  {
    name: { type: String, unique: true },
    city: String,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const jsonRet = {
          ...ret,
          // eslint-disable-next-line no-underscore-dangle
          id: ret._id,
        };
        // eslint-disable-next-line no-underscore-dangle
        delete jsonRet._id;
        // eslint-disable-next-line no-underscore-dangle
        delete jsonRet.__v;
        return jsonRet;
      },
    },
  }
);

const Wilder = mongoose.model<WilderDoc>('wilder', WilderSchema);

export default Wilder;
