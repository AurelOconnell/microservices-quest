import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import asyncHandler from 'express-async-handler';
import { asyncHincrby } from '../redisClient';

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

      const incrementedVote = await asyncHincrby(wilderId, skillId, 1);

      res.status(201).json({
        success: true,
        result: {
          wilderId,
          skillId,
          incrementedVote,
        },
      });
    }
  )
);
export default router;
