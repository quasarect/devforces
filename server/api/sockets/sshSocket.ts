import { Socket } from "socket.io";

export async function sshSocket(socket: Socket, metadata: any) {
	//connect to the sockets
	socket.on("connect", () => {
		console.log("Connected to SSH server");
	});
	//disconnect both the ssh and the frontend
	socket.on("disconnect", () => {});
	//sending commands to the ssh server
	socket.on("forward", () => {});
	//send the data to the frontend
	socket.on("data", (data) => {
		console.log("Data received from SSH server:", data);
	});
	// no connection to the ssh instance for the user error
	socket.on("timeout", () => {
		console.log("SSH connection timeout");
		socket.disconnect();
	});
	// idle for 5 minutes diconnect the ssh
	socket.on("idle", () => {});
	//error
	socket.on("error", (err) => {
		console.error("Socket error:", err);
	});
}
