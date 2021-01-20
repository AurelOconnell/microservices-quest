import redisClient from '../redisClient';

jest.mock('redis', () => jest.requireActual('redis-mock'));

beforeEach((done) => {
  redisClient.flushall(done);
});
