import process from "node:process";
import { customLog } from "./log.mjs";
import { consul } from "../consul/consul-connection.mjs"
export const doGracefulShutdown = async () => {
	try{
		await customLog('Worker is stopped');
		await consul.agent.service.deregister({ id: CONSUL_ID });
	} catch (err) {
		await customLog(err);
		console.log(err);
		process.exit(2);
	}
	process.exit(0)
};