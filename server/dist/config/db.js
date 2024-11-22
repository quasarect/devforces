"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
mongoose_1.default.connect(env_1.default.MONGODB_URI);
const db = mongoose_1.default.connection;
exports.db = db;
db.once('open', () => console.log('Connected to MongoDB'));
//# sourceMappingURL=db.js.map