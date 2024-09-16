
import process from "node:process";
import express from "express";


import config from "./config/config.mjs";
import { register as registerConsul } from "./consul/consul-connection.mjs";
import { Parser } from "./parser/parser.mjs";
import { customLog } from "./common/log.mjs";
import { doGracefulShutdown } from "./common/shutDown.mjs"




const TOKEN = config.get('botToken');
const PARSERS = config.get("parsers");
const PORT = config.get("port");
const app = express();
app.use(express.json());



try{
	if (!TOKEN || !PARSERS) {
		customLog('variables error');
		process.exit(2);
	}

	for(const parserSettings of PARSERS){
		let parser = null;
		try{
			parser =new Parser(parserSettings,TOKEN);
		}catch(err){
			console.log(err);
			continue;
		}
		parser.startCronJob();
	}

	process.on("SIGTERM", doGracefulShutdown);
	process.on("SIGINT", doGracefulShutdown);


	app.get("/health", (_req, res) => {
		res.sendStatus(200);
	});

	app.listen(PORT, () => {
		console.log(`listening on port ${PORT}`);
		// registerConsul();
	});

} catch (err) {
	customLog(err);
	console.log(err);
}