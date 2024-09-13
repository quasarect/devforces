import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import jwt from "jsonwebtoken";
import { sshSocket } from "./sshSocket";
import env from "../config/env";

export const ioConfig = (
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
	io.on("connection", (socket: Socket) => {
		console.log("Connected to main room");
	});
	const sshNameSpace = io.of("/ssh");
	sshNameSpace.on("connection", (socket: Socket) => {
		console.log("Connected to chat room");
		const token = socket.handshake.auth.token as string;
		try {
			const decoded = jwt.verify(token, env.JWT_SECRET) as {
				id: string;
				type: string;
				_v: string;
			};
			sshSocket(socket, { ...decoded });
		} catch (err) {
			console.log("Unauthorized");
		}
	});

	io.on("disconnect", (socket: Socket) => {});
};
