import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/env' });


export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

