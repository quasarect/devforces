"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.createAuthToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const createToken = (data, expiry = '10m') => {
    return jsonwebtoken_1.default.sign(data, env_1.default.JWT_SECRET, { expiresIn: expiry });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
    }
    catch (err) {
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
const createAuthToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, username: user.username }, env_1.default.JWT_SECRET, { expiresIn: '1h' });
};
exports.createAuthToken = createAuthToken;
const verifyAuthToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
};
exports.verifyAuthToken = verifyAuthToken;
//# sourceMappingURL=token.js.map