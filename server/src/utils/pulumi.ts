import * as pulumi from "@pulumi/pulumi";
import env from "../config/env";
import { PulumiFn } from "@pulumi/pulumi/automation";

const projectName = env.PROJECT_NAME;
const stackName = env.STACK_NAME;

export const getStack = async (
	program: PulumiFn,
): Promise<pulumi.automation.Stack> => {
	const stack = await pulumi.automation.LocalWorkspace.createOrSelectStack({
		projectName,
		stackName,
		program,
	});
	return stack;
};
