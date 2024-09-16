import {JSDOM} from 'jsdom';
import {CronJob} from "cron";


import TelegramBot from "../tgbot-class/tgbot.mjs"
import { customLog } from "../common/log.mjs";
import { fetchPage } from '../common/fetching.mjs'
import { Database } from '../db/db.mjs';
import { tagAdd } from '../common/taggingService.mjs';

import { parseJobs as workUaParse,scrapeAdds as workUaScrape } from "../workUa/workUa-parsing.mjs";
import { parseJobs as djinnyCoParse,scrapeAdds as djinnyCoScrape } from "../djinnyCo/djinnyCo-parsing.mjs";
import { parseJobs as douUaParse,scrapeAdds as douUaScrape } from "../dou/douUa-parsing.mjs";
const helperFunctions = {workUaParse,workUaScrape,djinnyCoParse,djinnyCoScrape,douUaParse,douUaScrape};

export class Parser {

		/**
	 * Create a new ```Parser```.
	 * @param settings Parser settings.
	 * @param bot TelegramBot.
	 */
	constructor(settings,token) {
		if(!settings || typeof settings != "object"){
			throw new Error ("No valid settings provided")
		}
		if(!settings.schedule || typeof settings.schedule != "string"){
			throw new Error ("No valid schedule provided")
		}
		if(!settings.timezone || typeof settings.timezone != "string"){
			throw new Error ("No valid timezone provided")
		}
		if(!settings.channelId || typeof settings.channelId != "string"){
			throw new Error ("No valid channelId provided")
		}
		if(!settings.url || typeof settings.url != "string"){
			throw new Error ("No valid url provided")
		}
		if(!settings.parser || !helperFunctions[settings.parser]){
			throw new Error ("No valid parser provided")
		}
		if(!settings.scraper || !helperFunctions[settings.scraper]){
			throw new Error ("No valid scraper provided")
		}

		this.schedule = settings.schedule;
		this.timezone = settings.timezone;
		this.channelId = settings.channelId
		this.path = {url: settings.url,uri: settings.uri};
		this.#bot = new TelegramBot(token);
		this.#db = new Database(settings.dbName);
		this.scrapeAdds = helperFunctions[settings.scraper];
		this.parseJobs = helperFunctions[settings.parser]
		this.customTag = settings.customTag || null
		this.displayImage = settings.displayImage || null
	}
	schedule
	timezone
	path
	channelId
	#bot
	#db

	#logToDB(path,addObj) {
		if (!this.#db.getListners[path]){
			this.#db.onUpdate(path,this.#checkFor5addsAndSendMessage(path))
		}
		this.#db.appendUniqly(`/${path}/`,{
			"title" : addObj.title,
			"tags" : addObj.tags ? addObj.tags : null,
			"url"	: addObj.url,
			"text" : addObj.text
		});
	}

	async #checkFor5addsAndSendMessage(path) {
		try{
			const adds = this.#db.get(path);
			if (adds && adds.length && adds.length > 4) {
				const heading = '<b>#' + path + '</b>\n\n'
				let text = heading;
				for(const i in adds){
					if (adds[i].text) {
						const number = parseInt(i)+1
						text += `${number}.${adds[i].text}\n\n`
					}
					if(i == 5)break
				}
				if (text > heading){
					if(this.displayImage) setTimeout(() => this.#bot.sendPicture(this.channelId,this.displayImage, text),1000)
					else setTimeout(() => this.#bot.sendMessage(this.channelId, text),1000)
				}
				this.#db.clear(path);
			}
		}catch(err){
			customLog(err);
		}
	}



	async AddsJob() {
		try{
				let htmlContent = await fetchPage(this.path.url+this.path.uri);
				const dom = new JSDOM(htmlContent).window.document;

				let jobsHtmls = await this.scrapeAdds(dom,this.path.url);

				let jobAdds = await this.parseJobs(jobsHtmls);
				let tagged = 0;
				jobAdds?.forEach((addObj) => {
					if(this.customTag) addObj.tags = [this.customTag];
					else addObj = tagAdd(addObj);
					if (addObj.tags) {
						tagged++;
						addObj.tags.forEach(tag => {
							this.#logToDB(tag,addObj);
						})
					}
				})
				customLog(`${this.path.url + this.path.uri} parsing done, ${tagged} adds tagged and ${jobAdds.length - tagged} not`);
		}catch (err){
			customLog(err);
			console.log(err);
		}
	};


	startCronJob() {
		try{
			const job = new CronJob(this.schedule,() => this.AddsJob(this.#bot),null,true,this.timezone);
		}catch(err){
			console.log(this)
		}
	}

}