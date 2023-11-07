import process from "node:process";
import {JSDOM} from "jsdom";
import  _ from "lodash";

import config from '../config/config.mjs'
import {fetchPage} from '../common/fetching.mjs'
import { customLog } from "../common/log.mjs";
import shabashka_odesa from './workUa-parsing-shabashka.mjs';
import {Database} from "../db/db.mjs";

import target from './target.json' assert { type: "json" };

const functionsMap = {
	"shabashka_odesa": shabashka_odesa
}

export const workUaJobShabashaka = async (bot) => {
	customLog('work.ua job is started')
	try{
		const url = target.url;
		const paths = target.paths;
		for (const path of paths){
			const chatId = config.get(path.chat);
			let htmlContent = await fetchPage(url+path.path);
			const dom = new JSDOM(htmlContent).window.document;

			let jobsHtmls = await functionsMap[path.chat].scrapeAdds(dom,url);

			let jobAdds = await functionsMap[path.chat].parseJobs(jobsHtmls);
			let delay = 0;
			const db = new Database(path.chat);
			jobAdds.forEach((addObj) => {
				db.append('/dataMiner/',{
					"title" : addObj.title,
					"tags" : addObj.tags ? addObj.tags : null,
					"url"	: addObj.url
				});
				setTimeout(() =>{
					bot.sendMessage(chatId, addObj.text, {'parse_mode': 'HTML'});
				},delay);
				delay += 1000;
			})
		}
	}catch (err) {
    customLog(err);
		console.log(err);
		process.exit(2);
	}
};
