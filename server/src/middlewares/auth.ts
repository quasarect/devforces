import { RequestHandler } from 'express';
import { verifyAuthToken } from '../utils/token';

export const authenticateUser : RequestHandler = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const user = verifyAuthToken(token);
    req.user = user; // Add user info to request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.clearCookie('auth_token');
    return res.status(401).json({ message: 'Unauthorized: Token expired or invalid' });
  }
};