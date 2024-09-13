import { Config, NodeSSH } from "node-ssh";

export async function connectSSH(ssh: NodeSSH, config: Config, metadata: any) {
	try {
		const connect = await ssh.connect({ config });
        connect
	} catch (error) {}
}

export async function disconnectSSH(ssh: NodeSSH) {
	try {
	} catch (error) {}
}
