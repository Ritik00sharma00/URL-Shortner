
import { getAsync, setAsync, redisClient } from '../utils/redisClient.js';

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; 
const IP_LIMIT = 100; 
const USER_LIMIT = 200; 
const SHORT_CODE_LIMIT = 10; 

const createRateLimiter = (limit, windowMs, keyPrefix) => {
  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}`; 

    try {
      if (!redisClient.isOpen) {
        console.error('Redis client is not connected');
      }

      const count = await getAsync(key);
      if (count && parseInt(count) >= limit) {
        return res.status(429).json({ message: 'Rate limit exceeded' });
      }

      await setAsync(key, (count ? parseInt(count) : 0) + 1, 'EX', windowMs / 1000); // Set expiration
      next();
    } catch (err) {
      console.error('Rate limiting error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

export const ipRateLimiter = createRateLimiter(IP_LIMIT, RATE_LIMIT_WINDOW, 'ip');
export const userRateLimiter = createRateLimiter(USER_LIMIT, RATE_LIMIT_WINDOW, 'user');
export const shortCodeRateLimiter = createRateLimiter(SHORT_CODE_LIMIT, RATE_LIMIT_WINDOW, 'shortCode');
