import TelegramBot from 'node-telegram-bot-api';
import {appendFileSync} from "node:fs";
import config from "../config/config.mjs";
import { tracer } from "../opentelemetry-tracing.mjs"

const logsfile = config.get('logsFile');
const logsChat = config.get('logsChat');
const token = config.get('botToken');


export const customLog = async (message) => {
  const span = tracer.startSpan("messages");
  span.addEvent("log", { message: message });
  span.end();
	const bot = new TelegramBot(token,{'polling': false});
	let date = new Date()
	let log = date + ' - ' + message + '\n';
	appendFileSync(logsfile, log);
	console.log(log);
	await bot.sendMessage(logsChat,log);
}