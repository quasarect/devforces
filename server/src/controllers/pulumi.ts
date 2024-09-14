import { RequestHandler } from "express";
import { sshInstance } from "../services/pulumi/templates/ssh";
import env from "../config/env";
import { getStack } from "../utils/pulumi";

export const demoHandler: RequestHandler = async (req, res, next) => {
	try {
		const stack = await getStack(
			async () =>
				await sshInstance({
					stackName: env.STACK_NAME,
					projectName: env.PROJECT_NAME,
					organizationName: env.ORGANIZATION_NAME,
					userId: "",
					problemId: "",
				}),
		);
		const up = await stack.up();
		const publicIp = up.outputs.publicIp;
		res.status(200).json({ ssh: `ssh -i "test.pem" ubuntu@${publicIp}` });
	} catch (error) {
		next(error);
	}
};
