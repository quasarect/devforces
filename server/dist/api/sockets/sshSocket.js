"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sshSocket = sshSocket;
function sshSocket(socket, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on("connect", () => {
            console.log("Connected to SSH server");
        });
        socket.on("disconnect", () => { });
        socket.on("forward", () => { });
        socket.on("data", (data) => {
            console.log("Data received from SSH server:", data);
        });
        socket.on("timeout", () => {
            console.log("SSH connection timeout");
            socket.disconnect();
        });
        socket.on("idle", () => { });
        socket.on("error", (err) => {
            console.error("Socket error:", err);
        });
    });
}
//# sourceMappingURL=sshSocket.js.map