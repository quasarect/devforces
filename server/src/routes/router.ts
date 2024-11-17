import Router, { Response } from "express";

import pulumiRouter from "./pulumi";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

import { authenticateUser } from "../middlewares/auth";
import { logout } from "../controllers/auth.controller";

const router = Router();

router.get("/ping", (_, res: Response) => {
	res.json({
		message: "pong",
	});
});

router.get('/home', authenticateUser, (req, res) => {
	if (!req.user) {
	  // If no user, respond with unauthorized
	  return res.status(401).json({ message: 'Unauthorized' });
	}
  
	// Check if user is of type JwtPayload and has a username
	if (typeof req.user !== 'string' && 'username' in req.user) {
	  const username = req.user.username;
	  return res.status(200).json({ message: `Welcome, ${username}` });
	} else {
	  // If the token is invalid or missing expected properties
	  return res.status(401).json({ message: 'Invalid token payload' });
	}
});

router.post('/logout', logout);

router.use("/pulumi", pulumiRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
