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
	MAX_BROWSER_CONTEXTS: z.number({ coerce: true }).default(1),
	MAX_PAGES_PER_CONTEXT: z.number({ coerce: true }).default(5),
	BROWSER_HEADLESS: z.preprocess((val) => {
		if (typeof val === "string") {
			return val.toLowerCase() === "true";
		}
		return Boolean(val);
	}, z.boolean().default(true)),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_REDIRECT_URI: z.string()
});

export default environmentSchema.parse(process.env);
