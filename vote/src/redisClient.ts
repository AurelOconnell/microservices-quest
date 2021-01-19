import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient();

// eslint-disable-next-line no-console
redisClient.on('error', (err) => console.error(err));

export const asyncHincrby = promisify(redisClient.hincrby).bind(redisClient);

export default redisClient;
