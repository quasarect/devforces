import Router, { Response } from "express";

import pulumiRouter from "./pulumi";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = Router();

router.get("/ping", (_, res: Response) => {
	res.json({
		message: "pong",
	});
});

router.use("/pulumi", pulumiRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
