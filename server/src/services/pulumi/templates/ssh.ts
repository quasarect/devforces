import { IResourceTags } from "../../../types/ILogResource";
import { ec2Instance } from "../resources/ec2";
import * as aws from "@pulumi/aws";

/**
 *
 * @param resource
 * @returns @param publicIp - The ip address for the instance through which we can ssh
 */
export async function sshInstance(resource: IResourceTags) {
	const ubuntu = await aws.ec2.getAmi({
		mostRecent: true,
		filters: [
			{ name: "image-id", values: ["ami-0a0e5d9c7acc336f1"] },
			{ name: "architecture", values: ["x86_64"] },
		],
	});
	const instance = await ec2Instance(
		{
			ami: ubuntu.id,
			instanceType: aws.ec2.InstanceType.T2_Micro,
			keyName: "test",
		},
		resource,
	);
	return { publicIp: instance.publicIp };
}
