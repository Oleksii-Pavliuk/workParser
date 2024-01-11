import TelegramBot from 'node-telegram-bot-api';
import {CronJob} from "cron"
import process from "node:process";


import config from "./config/config.mjs";
import { workUaJobShabashaka } from './workUa-shabashka/index.mjs';
import { DjinnyParser } from "./djinnyCo/index.mjs";
import { WorkUaParser } from "./workUa/index.mjs";
import { customLog } from "./common/log.mjs";
import { doGracefulShutdown } from "./common/shutDown.mjs"
import { untaggedJob } from "./untagged/index.mjs"


const token = config.get('botToken');
const workUaSchedule = config.get('workUaSchedule');
const djinnyCoSchedule = config.get('djinnyCoSchedule');
const timeZone = config.get('workUaTimezone');
const targets = config.get('targets');


try{
	if (!token) {
		customLog('variables error');
		process.exit(2);
	}
	const bot = new TelegramBot(token,{'polling': false});
	bot.on("polling_error",customLog);

	// work.ua parser
	const workUaParser = new WorkUaParser(workUaSchedule,targets.workUa,'it',bot,timeZone);
	workUaParser.startCronJob();
	workUaParser.AddsJob();

	//djinny.co parser
	const djinnyParser = new DjinnyParser(djinnyCoSchedule,targets.djinnyCo,'it',bot,timeZone);
	djinnyParser.startCronJob();
	djinnyParser.AddsJob();

	// const untaggedCronJob = new CronJob(workUaSchedule,() => untaggedJob(bot,'it'),null,true,timeZone);
	const workUaCronJob = new CronJob(workUaSchedule,() => workUaJobShabashaka(bot),null,true,timeZone);

	process.on("SIGTERM", doGracefulShutdown);
	process.on("SIGINT", doGracefulShutdown);

} catch (err) {
	customLog(err);
	console.log(err);
	process.exit(1);
}