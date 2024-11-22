"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const io_1 = require("./sockets/io");
const playwright_1 = require("./services/playwright");
const env_1 = __importDefault(require("./config/env"));
require("./config/db");
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server);
server.listen(env_1.default.PORT, () => {
    console.log(`Server running at http://localhost:${env_1.default.PORT}`);
});
(0, io_1.ioConfig)(io);
(0, playwright_1.launchBrowser)().then(() => {
    console.log("Browser launched");
    (0, playwright_1.createBrowserContext)().then(() => {
        console.log("Browser context created");
    });
});
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception: ", error);
});
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection: ", error);
});
//# sourceMappingURL=index.js.map