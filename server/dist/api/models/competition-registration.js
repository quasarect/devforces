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
exports.CompetitionRegistrationStatus = exports.competitionRegistrationSchema = exports.CompetitionRegistration = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const CompetitionRegistrationStatus = {
    pending: "pending",
    confirmed: "confirmed",
    cancelled: "cancelled",
};
exports.CompetitionRegistrationStatus = CompetitionRegistrationStatus;
const competitionRegistrationSchema = zod_1.z.object({
    user: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
    competition: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
    status: zod_1.z.enum([
        CompetitionRegistrationStatus.pending,
        CompetitionRegistrationStatus.confirmed,
        CompetitionRegistrationStatus.cancelled,
    ]),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.competitionRegistrationSchema = competitionRegistrationSchema;
const mongooseCompetitionRegistrationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    competition: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(CompetitionRegistrationStatus),
        default: CompetitionRegistrationStatus.pending,
    },
}, {
    timestamps: true,
});
mongooseCompetitionRegistrationSchema.index({ user: 1, competition: 1 }, { unique: true });
exports.CompetitionRegistration = mongoose_1.default.model("CompetitionRegistration", mongooseCompetitionRegistrationSchema);
//# sourceMappingURL=competition-registration.js.map