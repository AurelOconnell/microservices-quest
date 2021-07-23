import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import asyncHandler from 'express-async-handler';
import nats from 'node-nats-streaming';
import { asyncHincrby } from '../redisClient';

const stan = nats.connect('wilder-vote', 'vote', {
  url: 'http://nats-srv:4222',
});
const router = Router();

router.route('/').post(
  asyncHandler(
    async (
      req: Request<
        ParamsDictionary,
        Record<string, never>,
        { wilderId: string; skillId: string }
      >,
      res: Response
    ): Promise<void> => {
      const { wilderId, skillId } = req.body;

      const count = await asyncHincrby(wilderId, skillId, 1);
      const result = {
        wilderId,
        skillId,
        count,
      };
      stan.publish('VOTE_CREATED', JSON.stringify(result));
      res.status(201).json({
        success: true,
        result,
      });
    }
  )
);
export default router;
