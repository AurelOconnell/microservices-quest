import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import nats from 'node-nats-streaming';

import InputError from '../errors/InputError';
import SkillModel, { ISkill } from '../models/Skill';
import BadRequestError from '../errors/BadRequestError';

const stan = nats.connect('test-cluster', 'skill');
const router = Router();

router.route('/api/skills').post(
  [body('title').notEmpty().withMessage('title must be provided')],
  asyncHandler(
    async (
      req: Request<ParamsDictionary, Record<string, never>, ISkill>,
      res: Response
    ): Promise<void> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new InputError(errors.array());
      }
      const { title } = req.body;
      await SkillModel.init();
      const skillWithSameName = await SkillModel.findOne({
        title,
      });
      if (skillWithSameName) {
        throw new BadRequestError(
          `A skill with the title ${title} already exists`
        );
      }
      const skill = new SkillModel({ title });
      const result = await skill.save();
      stan.publish('SKILL_CREATED', JSON.stringify(result));
      res.status(201).json({ success: true, result });
    }
  )
);

export default router;
