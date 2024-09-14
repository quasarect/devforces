import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router";
import { handleNotFound, handleGlobalError } from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use(handleNotFound, handleGlobalError);

export default app;
