import process from "node:process";
import { customLog } from "./log.mjs";
export const doGracefulShutdown = async () => {
	try{
		await customLog('Worker is stopped');
	} catch (err) {
		await customLog(err);
		console.log(err);
		process.exit(2);
	}
	process.exit(0)
};