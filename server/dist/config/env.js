"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const NODE_ENVIRONMENT = zod_1.z
    .enum(["test", "development", "production"])
    .default("development");
const environmentSchema = zod_1.z.object({
    NODE_ENV: NODE_ENVIRONMENT,
    PORT: zod_1.z.number({ coerce: true }).default(3000),
    MONGODB_URI: zod_1.z.string(),
    STACK_NAME: NODE_ENVIRONMENT,
    PROJECT_NAME: zod_1.z.string(),
    ORGANIZATION_NAME: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    MAX_BROWSER_CONTEXTS: zod_1.z.number({ coerce: true }).default(1),
    MAX_PAGES_PER_CONTEXT: zod_1.z.number({ coerce: true }).default(5),
    BROWSER_HEADLESS: zod_1.z.preprocess((val) => {
        if (typeof val === "string") {
            return val.toLowerCase() === "true";
        }
        return Boolean(val);
    }, zod_1.z.boolean().default(true)),
});
exports.default = environmentSchema.parse(process.env);
//# sourceMappingURL=env.js.map