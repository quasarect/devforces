"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.get('/google', auth_controller_1.googleLogin);
authRouter.get('/google/callback', auth_controller_1.googleCallback);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map