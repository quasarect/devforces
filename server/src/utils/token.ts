import jwt from 'jsonwebtoken';

import env from '../config/env';

// Temp token just for username reception
export const createToken = (data: any, expiry: string = '10m'): string => {
  return jwt.sign(data, env.JWT_SECRET, { expiresIn: expiry });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token")
  }
};

// Create a JWT token for the user
export const createAuthToken = (user: any): string => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    env.JWT_SECRET,
    { expiresIn: '1h' } // Token valid for 1 hr
  );
};

// Verify the token
export const verifyAuthToken = (token: string): any => {
  return jwt.verify(token, env.JWT_SECRET);
};