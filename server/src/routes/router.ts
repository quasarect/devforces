import Router, { Response } from "express";

import pulumiRouter from "./pulumi";

const router = Router();

router.get("/ping", (_, res: Response) => {
	res.json({
		message: "pong",
	});
});

router.use("/pulumi", pulumiRouter);

export default router;
