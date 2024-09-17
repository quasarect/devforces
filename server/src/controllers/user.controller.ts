import { RequestHandler } from 'express';
import { verifyToken } from '../utils/token';
import { saveUser, checkUsernameAvailibility } from '../services/user';

import HttpException from '../types/exceptions/HttpException';
import HttpStatusCode from '../types/express/status_codes';

export const createUser : RequestHandler = async (req, res, next): Promise<void> => {
  const { username, token } = req.body;

  if (!token || !username) {
    throw new HttpException(HttpStatusCode.BAD_REQUEST, 'Username and token are required');
  }

  try {

    const isUsernameAvailable = await checkUsernameAvailibility(username);

    if (!isUsernameAvailable)
        throw new HttpException(HttpStatusCode.CONFLICT, "Username already taken.")

    // Verify the token and decrypt the user details
    const userDetails = verifyToken(token);

    // Prepare user data
    const userData = {
      name: userDetails.name,
      email: userDetails.email,
      pfp: userDetails.picture, // Assuming 'picture' is part of the Google OAuth response
      username: username
    };

    // Save the user to the database
    await saveUser(userData);

    // Send success response
    res.status(HttpStatusCode.CREATED).json({ message: 'User created successfully' });
  } catch (error) {
    next(error)
  }
};

export const isUsernameAvailable: RequestHandler = async (req, res, next ) => {
  const { username } = req.query;

  if (!username) {
    throw new HttpException(HttpStatusCode.BAD_REQUEST, "Username not provided.");
  }

  try {
    const isUsernameAvailable = await checkUsernameAvailibility(username as string);
    res.status(HttpStatusCode.OK).json({
      isUsernameAvailable
    })
  } catch (error) {
    next(error)
  }

}