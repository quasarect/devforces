import jwt from 'jsonwebtoken';

import env from '../config/env';

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