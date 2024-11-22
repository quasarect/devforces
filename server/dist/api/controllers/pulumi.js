"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoHandler = void 0;
const ssh_1 = require("../services/pulumi/templates/ssh");
const env_1 = __importDefault(require("../config/env"));
const pulumi_1 = require("../utils/pulumi");
const demoHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stack = yield (0, pulumi_1.getStack)(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, ssh_1.sshInstance)({
                stackName: env_1.default.STACK_NAME,
                projectName: env_1.default.PROJECT_NAME,
                organizationName: env_1.default.ORGANIZATION_NAME,
                userId: "",
                problemId: "",
            });
        }));
        const up = yield stack.up();
        const publicIp = up.outputs.publicIp;
        res.status(200).json({ ssh: `ssh -i "test.pem" ubuntu@${publicIp}` });
    }
    catch (error) {
        next(error);
    }
});
exports.demoHandler = demoHandler;
//# sourceMappingURL=pulumi.js.map