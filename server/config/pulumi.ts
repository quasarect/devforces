import { z } from "zod";
import env from "./env";

const stackName = env.STACK_NAME;
const projectName = env.PROJECT_NAME;
const organizationName = env.ORGANIZATION_NAME;

const resourceTags = {
	stackName,
	projectName,
	organizationName,
};

const resourceSchema = z.object({
	stackName: z
		.enum(["test", "development", "production"])
		.default("development"),
	projectName: z.string(),
	organizationName: z.string(),
});

export default resourceSchema.parse(resourceTags);
