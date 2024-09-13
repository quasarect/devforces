import { RequestHandler } from "express";
import { sshInstance } from "../pulumi/templates/ssh";
import resourceTags from "../config/pulumi";
import { getStack } from "../utils/pulumi";

export const demoHandler: RequestHandler = async (req, res, next) => {
	try {
		const stack = await getStack(
			async () =>
				await sshInstance({
					...resourceTags,
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
