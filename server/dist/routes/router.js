"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pulumi_1 = __importDefault(require("./pulumi"));
const router = (0, express_1.default)();
router.get("/ping", (_, res) => {
    res.json({
        message: "pong",
    });
});
router.use("/pulumi", pulumi_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map