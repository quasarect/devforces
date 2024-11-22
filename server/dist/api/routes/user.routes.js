"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/check/username', user_controller_1.isUsernameAvailable);
userRouter.post('/create', user_controller_1.createUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map