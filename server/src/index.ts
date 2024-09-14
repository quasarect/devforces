import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { ioConfig } from "./sockets/io";

import env from "./config/env";
import "./config/db";

const server = http.createServer(app);
const io = new Server(server);

server.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}`);
});

ioConfig(io);

process.on("uncaughtException", (error: Error) => {
	console.log("Uncaught Exception: ", error);
	// process.exit(1)
});

process.on("unhandledRejection", (error: Error) => {
	console.log("Unhandled Rejection: ", error);
	// process.exit(1)
});
