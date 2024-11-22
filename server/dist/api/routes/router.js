"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pulumi_1 = __importDefault(require("./pulumi"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const css_routes_1 = __importDefault(require("./css.routes."));
const auth_1 = require("../middlewares/auth");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.default)();
router.get("/ping", (_, res) => {
    res.json({
        message: "pong",
    });
});
router.get("/home", auth_1.authenticateUser, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (typeof req.user !== "string" && "username" in req.user) {
        const username = req.user.username;
        return res.status(200).json({ message: `Welcome, ${username}` });
    }
    else {
        return res.status(401).json({ message: "Invalid token payload" });
    }
});
router.post("/logout", auth_controller_1.logout);
router.use("/pulumi", pulumi_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/css", css_routes_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map