import { Router } from 'express';
import { createUser, isUsernameAvailable } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/check/username', isUsernameAvailable);
userRouter.post('/create', createUser);

export default userRouter;