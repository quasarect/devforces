import * as aws from "@pulumi/aws";
import { IResourceTags } from "../../../types/";
import { Instance } from "@pulumi/aws/ec2";

export async function ec2Instance(
	args: aws.ec2.InstanceArgs,
	resource: IResourceTags,
): Promise<Instance> {
	const combinedTags = {
		...args.tags,
		...resource,
	};

	const web = new aws.ec2.Instance("test-pulumi", {
		...args,
		tags: combinedTags,
	});

	return web;
}
