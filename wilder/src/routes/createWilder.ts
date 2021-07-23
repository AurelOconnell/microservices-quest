import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import nats from 'node-nats-streaming';

import InputError from '../errors/InputError';
import WilderModel, { IWilder } from '../models/Wilder';
import BadRequestError from '../errors/BadRequestError';

const router = Router();

const stan = nats.connect('wilder-vote', 'wilder', {
  url: 'nats://nats-srv:4222',
});

router.route('/').post(
  [
    body('name').notEmpty().withMessage('name must be provided'),
    body('name')
      .isLength({ min: 3 })
      .withMessage('name must be at least 3 characters long'),
    body('city').isString().withMessage('city must be a string'),
  ],
  asyncHandler(
    async (
      req: Request<ParamsDictionary, Record<string, never>, IWilder>,
      res: Response
    ): Promise<void> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new InputError(errors.array());
      }
      const { name, city } = req.body;
      await WilderModel.init();
      const wilderWithSameName = await WilderModel.findOne({
        name,
      });
      if (wilderWithSameName) {
        throw new BadRequestError(
          `A wilder with the name ${name} already exists`
        );
      }
      const wilder = new WilderModel({ name, city });
      const result = await wilder.save();
      stan.publish('WILDER_CREATED', JSON.stringify(result));
      res.status(201).json({ success: true, result });
    }
  )
);

export default router;
