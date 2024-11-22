"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGlobalError = exports.handleNotFound = void 0;
const HttpException_1 = __importDefault(require("../types/exceptions/HttpException"));
const status_codes_1 = __importDefault(require("../types/express/status_codes"));
const handleNotFound = (req, res, next) => {
    return next(new HttpException_1.default(status_codes_1.default.NOT_FOUND, "Not Found"));
};
exports.handleNotFound = handleNotFound;
const handleGlobalError = (error, req, res, next) => {
    var _a;
    const status = (_a = error.status) !== null && _a !== void 0 ? _a : status_codes_1.default.INTERNAL_SERVER_ERROR;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({ message, data });
};
exports.handleGlobalError = handleGlobalError;
//# sourceMappingURL=error.js.map