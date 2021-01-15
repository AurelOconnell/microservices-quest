import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

import InputError from '../errors/InputError';
import WilderModel from '../models/Wilder';
import BadRequestError from '../errors/BadRequestError';

const controller = {
  create: async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InputError(errors.array());
    }
    await WilderModel.init();
    const wilderWithSameName = await WilderModel.findOne({
      name: req.body.name,
    });
    if (wilderWithSameName) {
      throw new BadRequestError(
        `A wilder with the name ${req.body.name} already exists`
      );
    }
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ success: true, result });
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.find();
    res.json({ success: true, result });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await WilderModel.updateOne({ _id: req.body._id }, req.body);
    res.json(result);
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await WilderModel.deleteOne({ _id: req.body._id });
    res.json({ success: true, result });
  },
};

const router = Router();

router
  .route('/api/wilders')
  .post(
    [
      body('name').notEmpty().withMessage('name must be provided'),
      body('name')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters long'),
      body('city').isString().withMessage('city must be a string'),
    ],
    asyncHandler(controller.create)
  )
  .get(asyncHandler(controller.read))
  .put(asyncHandler(controller.update))
  .delete(asyncHandler(controller.delete));

export default router;
