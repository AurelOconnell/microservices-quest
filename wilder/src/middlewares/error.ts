import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';

export default (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  if (error instanceof CustomError) {
    return res.status(error.status).json(error.serializeError());
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return res
    .status(500)
    .json({ status: 500, errors: ['Something went wrong'] });
};
