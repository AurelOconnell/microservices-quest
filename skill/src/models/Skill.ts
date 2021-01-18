import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill {
  title: string;
}

interface SkillDoc extends ISkill, Document {}

const SkillSchema = new Schema<SkillDoc>(
  {
    title: { type: String, unique: true },
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

const Skill = mongoose.model<SkillDoc>('skill', SkillSchema);

export default Skill;
