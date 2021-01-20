import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import asyncHandler from 'express-async-handler';
import nats from 'node-nats-streaming';
import { asyncHincrby } from '../redisClient';

const stan = nats.connect('test-cluster', 'vote');
const router = Router();

router.route('/api/votes').post(
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
