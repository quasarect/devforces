"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const token_1 = require("../utils/token");
const authenticateUser = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const user = (0, token_1.verifyAuthToken)(token);
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.clearCookie('auth_token');
        return res.status(401).json({ message: 'Unauthorized: Token expired or invalid' });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map