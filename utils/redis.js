// Setting Redis server connections

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  // checks connection to the redis server
  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const result = await redisGet(key);
    return result;
  }

  async set(key, value, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value, 'EX', time);
  }

  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
