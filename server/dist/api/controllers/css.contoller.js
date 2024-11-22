"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = void 0;
const playwright_1 = require("../services/playwright");
const pixelmatch_1 = require("../services/pixelmatch");
const actions_1 = require("../services/playwright/actions");
const path = __importStar(require("path"));
const calculateScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const page = yield (0, playwright_1.getPage)(10000);
    if (!(page === null || page === void 0 ? void 0 : page.page)) {
        throw new Error("No page available");
    }
    try {
        yield (0, actions_1.applyCSSToPage)(page, code);
        const screenshot = yield page.page.screenshot();
        const score = (0, pixelmatch_1.getPercentageMatch)(screenshot, path.resolve(__dirname, "../assets/test.png"));
        res.json({ score });
    }
    catch (error) {
        next(error);
    }
    finally {
        (0, playwright_1.releasePage)(page);
    }
});
exports.calculateScore = calculateScore;
//# sourceMappingURL=css.contoller.js.map