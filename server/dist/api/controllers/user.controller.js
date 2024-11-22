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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUsernameAvailable = exports.createUser = void 0;
const token_1 = require("../utils/token");
const user_1 = require("../services/user");
const HttpException_1 = __importDefault(require("../types/exceptions/HttpException"));
const status_codes_1 = __importDefault(require("../types/express/status_codes"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, token } = req.body;
    if (!token || !username) {
        throw new HttpException_1.default(status_codes_1.default.BAD_REQUEST, 'Username and token are required');
    }
    try {
        const isUsernameAvailable = yield (0, user_1.checkUsernameAvailibility)(username);
        if (!isUsernameAvailable)
            throw new HttpException_1.default(status_codes_1.default.CONFLICT, "Username already taken.");
        const userDetails = (0, token_1.verifyToken)(token);
        const userData = {
            name: userDetails.name,
            email: userDetails.email,
            pfp: userDetails.picture,
            username: username
        };
        const newUser = yield (0, user_1.saveUser)(userData);
        const authToken = (0, token_1.createAuthToken)(newUser);
        res.cookie('auth_token', authToken, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });
        res.status(status_codes_1.default.CREATED).json({ message: 'User created successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const isUsernameAvailable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (!username) {
        throw new HttpException_1.default(status_codes_1.default.BAD_REQUEST, "Username not provided.");
    }
    try {
        const isUsernameAvailable = yield (0, user_1.checkUsernameAvailibility)(username);
        res.status(status_codes_1.default.OK).json({
            isUsernameAvailable
        });
    }
    catch (error) {
        next(error);
    }
});
exports.isUsernameAvailable = isUsernameAvailable;
//# sourceMappingURL=user.controller.js.map