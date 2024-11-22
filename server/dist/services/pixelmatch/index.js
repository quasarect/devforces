"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentageMatch = getPercentageMatch;
const { compareImages } = require("../../../build/Release/pixelmatch");
function getPercentageMatch(buffer, path) {
    const { percentageDiff } = compareImages(buffer, path);
    return percentageDiff.toFixed(1);
}
//# sourceMappingURL=index.js.map