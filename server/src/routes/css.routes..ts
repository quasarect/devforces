import { Router } from "express";
import { calculateScore } from "../controllers/css.contoller";

const cssRouter = Router();

cssRouter.post("/score", calculateScore);
cssRouter.get("/score", (_res, res) => {
	res.json({
		message: "36",
	});
});

export default cssRouter;
