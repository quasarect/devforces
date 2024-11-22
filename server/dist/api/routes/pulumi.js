"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pulumi_1 = require("../controllers/pulumi");
const pulumiRouter = (0, express_1.Router)();
pulumiRouter.get("/demo", pulumi_1.demoHandler);
exports.default = pulumiRouter;
//# sourceMappingURL=pulumi.js.map