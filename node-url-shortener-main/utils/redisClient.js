import { createClient } from 'redis';

const redisClient = createClient({
    host: '127.0.0.1', 
    port: 6379 
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('ready', () => {
  console.log('Redis client connected');
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

const getAsync = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};

const setAsync = (key, value, mode, duration) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, mode, duration, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};

export { redisClient, getAsync, setAsync };
