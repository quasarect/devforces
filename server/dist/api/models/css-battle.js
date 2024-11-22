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
exports.Tags = exports.cssBattleSchema = exports.CSSBattle = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Tags = {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard",
};
exports.Tags = Tags;
const cssBattleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().min(1).max(1000),
    isActive: zod_1.z.boolean(),
    colors: zod_1.z.array(zod_1.z.string()),
    code: zod_1.z.string(),
    image: zod_1.z.string(),
    competition: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
    tags: zod_1.z.array(zod_1.z.enum([Tags.Easy, Tags.Medium, Tags.Hard])),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.cssBattleSchema = cssBattleSchema;
const mongooseCSSBattleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    colors: [
        {
            type: String,
            validate: {
                validator: (v) => /^#[0-9A-Fa-f]{6}$/.test(v),
                message: "Invalid color format. Use hexadecimal format (e.g., #RRGGBB)",
            },
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
            enum: Object.values(Tags),
        },
    ],
}, {
    timestamps: true,
});
mongooseCSSBattleSchema.index({ title: 1, competition: 1 });
exports.CSSBattle = mongoose_1.default.model("CSSBattle", mongooseCSSBattleSchema);
//# sourceMappingURL=css-battle.js.map