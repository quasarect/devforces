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
exports.cssBattleSubmissionSchema = exports.CSSBattleSubmission = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const cssBattleSubmissionSchema = zod_1.z.object({
    user: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
    cssBattle: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
    score: zod_1.z.number().min(0).max(100),
    code: zod_1.z.string().min(1),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.cssBattleSubmissionSchema = cssBattleSubmissionSchema;
const mongooseCSSBattleSubmissionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cssBattle: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CSSBattle",
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    code: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
mongooseCSSBattleSubmissionSchema.index({ user: 1, cssBattle: 1 }, { unique: true });
exports.CSSBattleSubmission = mongoose_1.default.model("CSSBattleSubmission", mongooseCSSBattleSubmissionSchema);
//# sourceMappingURL=css-battle-submission.js.map