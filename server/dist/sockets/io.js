"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioConfig = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sshSocket_1 = require("./sshSocket");
const env_1 = __importDefault(require("../config/env"));
const ioConfig = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected to main room");
    });
    const sshNameSpace = io.of("/ssh");
    sshNameSpace.on("connection", (socket) => {
        console.log("Connected to chat room");
        const token = socket.handshake.auth.token;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
            (0, sshSocket_1.sshSocket)(socket, Object.assign({}, decoded));
        }
        catch (err) {
            console.log("Unauthorized");
        }
    });
    io.on("disconnect", (socket) => { });
};
exports.ioConfig = ioConfig;
//# sourceMappingURL=io.js.map