"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const pixelmatch_1 = require("../api/services/pixelmatch");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const matcher = (image1, image2) => {
    return (0, pixelmatch_1.getPercentageMatch)(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "resources/images/" + image1)), path_1.default.resolve(__dirname, "resources/images/" + image2));
};
(0, vitest_1.test)("pixelmatch 0", () => {
    (0, vitest_1.expect)(matcher("user_response_1_image_1.png", "generated_image_1.png")).toBe("95.8");
});
(0, vitest_1.test)("pixelmatch 1", () => {
    (0, vitest_1.expect)(matcher("user_response_2_image_1.png", "generated_image_1.png")).toBe("97.6");
});
(0, vitest_1.test)("pixelmatch 2", () => {
    (0, vitest_1.expect)(matcher("user_response_3_image_1.png", "generated_image_1.png")).toBe("94.1");
});
(0, vitest_1.test)("pixelmatch 3", () => {
    (0, vitest_1.expect)(matcher("user_response_1_image_2.png", "generated_image_2.png")).toBe("83.2");
});
(0, vitest_1.test)("pixelmatch 4", () => {
    (0, vitest_1.expect)(matcher("user_response_2_image_2.png", "generated_image_2.png")).toBe("81.7");
});
(0, vitest_1.test)("pixelmatch 5", () => {
    (0, vitest_1.expect)(matcher("user_response_3_image_2.png", "generated_image_2.png")).toBe("89.1");
});
(0, vitest_1.test)("pixelmatch 6", () => {
    (0, vitest_1.expect)(matcher("user_response_1_image_3.png", "generated_image_3.png")).toBe("93.7");
});
(0, vitest_1.test)("pixelmatch 7", () => {
    (0, vitest_1.expect)(matcher("user_response_2_image_3.png", "generated_image_3.png")).toBe("70.8");
});
(0, vitest_1.test)("pixelmatch 8", () => {
    (0, vitest_1.expect)(matcher("user_response_3_image_3.png", "generated_image_3.png")).toBe("79.7");
});
//# sourceMappingURL=pixelmatch.test.js.map