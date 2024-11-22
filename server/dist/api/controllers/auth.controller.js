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
exports.logout = exports.googleCallback = exports.googleLogin = void 0;
const index_1 = require("../services/auth/index");
const index_2 = require("../services/user/index");
const token_1 = require("../utils/token");
const HttpException_1 = __importDefault(require("../types/exceptions/HttpException"));
const status_codes_1 = __importDefault(require("../types/express/status_codes"));
const googleLogin = (_req, res) => {
    const authUrl = (0, index_1.getGoogleAuthURL)();
    console.log(authUrl);
    res.redirect(authUrl);
};
exports.googleLogin = googleLogin;
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        throw new HttpException_1.default(status_codes_1.default.UNAUTHORIZED, 'Authorization code is missing');
        return;
    }
    try {
        const googleUser = yield (0, index_1.getGoogleUser)(code);
        const user = yield (0, index_2.findUserByEmail)(googleUser.email);
        if (!user) {
            const tempToken = (0, token_1.createToken)(googleUser);
            return res.redirect(`/username?token=${tempToken}`);
        }
        const authToken = (0, token_1.createAuthToken)(user);
        res.cookie('auth_token', authToken, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });
        console.log("Auth token in cookie:" + authToken);
        res.redirect('/api/home');
    }
    catch (error) {
        console.error('Error during Google OAuth callback', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.googleCallback = googleCallback;
const logout = (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map