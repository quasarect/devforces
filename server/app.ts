import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import pulumiRouter from "./routes/pulumi";

const app = express();
const port = process.env.PORT || 3000;

config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/test", async (req, res) => {
	try {
		res.status(200).json({ message: "Recieved" });
	} catch (e) {
		res.status(200).json({ message: "Error" });
	}
});

app.use("/pulumi", pulumiRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log("Error");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
