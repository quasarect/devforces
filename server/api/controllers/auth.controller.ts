import { RequestHandler } from 'express';
import { getGoogleAuthURL, getGoogleUser } from '../services/auth/index';
import { findUserByEmail } from '../services/user/index';
import { createToken, createAuthToken } from '../utils/token';

import HttpException from '../types/exceptions/HttpException'
import HttpStatusCode from '../types/express/status_codes';

export const googleLogin : RequestHandler = (_req, res): void => {
  const authUrl = getGoogleAuthURL();
  console.log(authUrl);
  res.redirect(authUrl);
};

export const googleCallback : RequestHandler = async (req, res): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Authorization code is missing');
    return;
  }

  try {
    const googleUser = await getGoogleUser(code);
    const user = await findUserByEmail(googleUser.email);

    if (!user) {
      // If user does not exist, redirect to username flow
      const tempToken = createToken(googleUser);
      return res.redirect(`/username?token=${tempToken}`);
    }

    // If user exists, create a JWT token and set it in a cookie
    const authToken = createAuthToken(user);
    res.cookie('auth_token', authToken, {
      httpOnly: true,
      secure: true, // Only use secure cookies in production
      maxAge: 3600000, // 1 hour
    });

    console.log("Auth token in cookie:" + authToken);

    res.redirect('/api/home');
  } catch (error) {
    console.error('Error during Google OAuth callback', error);
    res.status(500).send('Internal Server Error');
  }
};

// Logout function
export const logout : RequestHandler = (req, res): void => {
  res.clearCookie('auth_token');
  res.status(200).json({ message: 'Logged out successfully' });
};