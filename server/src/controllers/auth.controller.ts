import { RequestHandler } from 'express';
import { getGoogleAuthURL, getGoogleUser } from '../services/auth/index';
import { findUserByEmail } from '../services/user/index';
import { createToken } from '../utils/token';

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

    if (user) {
      // If user exists, redirect to home
      res.redirect('/home');
    } else {
      // Encrypt user details and create a temporary token
      const tempToken = createToken(googleUser, '10m');
      
      // Redirect to frontend with the temp token for the username input
      res.redirect(`/username?token=${tempToken}`);
    }
  } catch (error) {
    console.error('Error during Google OAuth callback', error);
    res.status(500).send('Internal Server Error');
  }
};