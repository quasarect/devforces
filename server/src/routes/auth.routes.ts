import { Router } from 'express';
import { googleLogin, googleCallback } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/google',googleLogin);
authRouter.get('/google/callback', googleCallback);

export default authRouter;