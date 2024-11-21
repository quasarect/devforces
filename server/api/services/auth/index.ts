import axios from 'axios';
import { google } from 'googleapis';

import env from '../../config/env';

const googleOAuth2Client = new google.auth.OAuth2({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_REDIRECT_URI,
});

export const getGoogleAuthURL = (): string => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return googleOAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
};

export const getGoogleUser = async (code: string) => {
  const { tokens } = await googleOAuth2Client.getToken(code);
  googleOAuth2Client.setCredentials(tokens);

  const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  return data;
};