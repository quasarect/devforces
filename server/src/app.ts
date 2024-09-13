import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router";
import { handleNotFound, handleGlobalError } from "./middlewares/error";
import { Server } from "socket.io";
import http from "http";
import { ioConfig } from "./sockets/io";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use(handleNotFound, handleGlobalError);

ioConfig(io);

export default app;
