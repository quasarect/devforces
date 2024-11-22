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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSBattle = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Tags;
(function (Tags) {
    Tags["Easy"] = "Easy";
    Tags["Medium"] = "Medium";
    Tags["Hard"] = "Hard";
})(Tags || (Tags = {}));
const cssBattleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    colors: [
        {
            type: String,
        },
    ],
    code: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    competition: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    tags: [
        {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
        },
    ],
}, {
    timestamps: true,
});
exports.CSSBattle = mongoose_1.default.model("CSSBattle", cssBattleSchema);
//# sourceMappingURL=css-battle.js.map