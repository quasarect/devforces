"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const css_contoller_1 = require("../controllers/css.contoller");
const cssRouter = (0, express_1.Router)();
cssRouter.post("/score", css_contoller_1.calculateScore);
cssRouter.get("/score", (_res, res) => {
    res.json({
        message: "36",
    });
});
exports.default = cssRouter;
//# sourceMappingURL=css.routes..js.map