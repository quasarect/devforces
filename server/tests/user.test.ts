import { Request, Response, NextFunction } from 'express';
import { createUser, isUsernameAvailable } from '../src/controllers/user.controller';
import { verifyToken, createAuthToken } from '../src/utils/token';
import { saveUser, checkUsernameAvailibility } from '../src/services/user';
import HttpException from '../src/types/exceptions/HttpException';
import HttpStatusCode from '../src/types/express/status_codes';

// Mocking dependencies
jest.mock('../src/utils/token');
jest.mock('../src/services/user');

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      mockRequest.body = {
        username: 'testuser',
        token: 'valid_token',
      };

      (verifyToken as jest.Mock).mockReturnValue({
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://example.com/picture.jpg',
      });

      (checkUsernameAvailibility as jest.Mock).mockResolvedValue(true);
      (saveUser as jest.Mock).mockResolvedValue({
        _id: 'user_id',
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        pfp: 'https://example.com/picture.jpg',
      });

      (createAuthToken as jest.Mock).mockReturnValue('new_auth_token');

      await createUser(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(checkUsernameAvailibility).toHaveBeenCalledWith('testuser');
      expect(verifyToken).toHaveBeenCalledWith('valid_token');
      expect(saveUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        pfp: 'https://example.com/picture.jpg',
        username: 'testuser',
      });
      expect(createAuthToken).toHaveBeenCalled();
      expect(mockResponse.cookie).toHaveBeenCalledWith('auth_token', 'new_auth_token', expect.any(Object));
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should throw an error if username is taken', async () => {
      mockRequest.body = {
        username: 'existinguser',
        token: 'valid_token',
      };

      (checkUsernameAvailibility as jest.Mock).mockResolvedValue(false);

      await createUser(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          status: HttpStatusCode.CONFLICT,
          message: 'Username already taken.',
        })
      );
    });

    // it('should throw an error if token or username is missing', async () => {
    //   mockRequest.body = {};

    //   await createUser(mockRequest as Request, mockResponse as Response, nextFunction);

    //   expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
    //   expect(nextFunction).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       status: HttpStatusCode.BAD_REQUEST,
    //       message: 'Username and token are required',
    //     })
    //   );
    // });
  });

  describe('isUsernameAvailable', () => {
    it('should return true if username is available', async () => {
      mockRequest.query = { username: 'newuser' };

      (checkUsernameAvailibility as jest.Mock).mockResolvedValue(true);

      await isUsernameAvailable(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(checkUsernameAvailibility).toHaveBeenCalledWith('newuser');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ isUsernameAvailable: true });
    });

    it('should return false if username is not available', async () => {
      mockRequest.query = { username: 'existinguser' };

      (checkUsernameAvailibility as jest.Mock).mockResolvedValue(false);

      await isUsernameAvailable(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(checkUsernameAvailibility).toHaveBeenCalledWith('existinguser');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ isUsernameAvailable: false });
    });

    // it('should throw an error if username is not provided', async () => {
    //   mockRequest.query = {};

    //   await isUsernameAvailable(mockRequest as Request, mockResponse as Response, nextFunction);

    //   expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
    //   expect(nextFunction).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       status: HttpStatusCode.BAD_REQUEST,
    //       message: 'Username not provided.',
    //     })
    //   );
    // });
  });
});