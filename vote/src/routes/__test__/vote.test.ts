import request from 'supertest';
import { asyncHincrby } from '../../redisClient';
import app from '../../app';

describe('Create a vote', () => {
  it('return 201 and the vote', async () => {
    const vote = { wilderId: 'wilder_1', skillId: 'skill_A' };
    const expected = { ...vote, count: 1 };
    const response = await request(app)
      .post('/api/votes')
      .send(vote)
      .expect(201);
    expect(response.body.result).toMatchObject(expected);
  });

  it('increments the vote count', async () => {
    const wilderId = 'wilder_1';
    const skillId = 'skill_A';
    await asyncHincrby(wilderId, skillId, 1);
    const expected = { wilderId, skillId, count: 2 };
    const response = await request(app)
      .post('/api/votes')
      .send({ wilderId, skillId })
      .expect(201);
    expect(response.body.result).toMatchObject(expected);
  });
});
