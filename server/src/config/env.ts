import { config } from "dotenv";
import { z } from "zod";

config();

const NODE_ENVIRONMENT = z
	.enum(["test", "development", "production"])
	.default("development");

const environmentSchema = z.object({
	NODE_ENV: NODE_ENVIRONMENT,
	PORT: z.number({ coerce: true }).default(3000),
	MONGODB_URI: z.string(),
	STACK_NAME: NODE_ENVIRONMENT,
	PROJECT_NAME: z.string(),
	ORGANIZATION_NAME: z.string(),
	JWT_SECRET: z.string(),
});

export default environmentSchema.parse(process.env);
