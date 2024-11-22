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
exports.getGoogleUser = exports.getGoogleAuthURL = void 0;
const axios_1 = __importDefault(require("axios"));
const googleapis_1 = require("googleapis");
const env_1 = __importDefault(require("../../config/env"));
const googleOAuth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: env_1.default.GOOGLE_CLIENT_ID,
    clientSecret: env_1.default.GOOGLE_CLIENT_SECRET,
    redirectUri: env_1.default.GOOGLE_REDIRECT_URI,
});
const getGoogleAuthURL = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];
    return googleOAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
};
exports.getGoogleAuthURL = getGoogleAuthURL;
const getGoogleUser = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield googleOAuth2Client.getToken(code);
    googleOAuth2Client.setCredentials(tokens);
    const { data } = yield axios_1.default.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    return data;
});
exports.getGoogleUser = getGoogleUser;
//# sourceMappingURL=index.js.map