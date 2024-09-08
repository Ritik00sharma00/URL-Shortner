import express from 'express';
import { createShortUrl,createOnClick } from '../controller/urlController.js';
import  authenticate  from '../controller/UserController.js';
import {authenticateJWT} from '../middlewares/AuthMiddleware.js';
import { ipRateLimiter, userRateLimiter, shortCodeRateLimiter } from '../middlewares/Ratelimiter.js';
const router = express.Router();

router.get('/register',authenticate)
router.post('/short',authenticateJWT,ipRateLimiter,userRateLimiter,shortCodeRateLimiter, createShortUrl);
router.get('/:urlId',authenticateJWT,createOnClick);

export default router;
