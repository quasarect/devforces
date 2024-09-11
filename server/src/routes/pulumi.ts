import { Router } from "express";
import { demoHandler } from "../controllers/pulumi";

const pulumiRouter = Router();

pulumiRouter.get("/demo", demoHandler);

export default pulumiRouter;
