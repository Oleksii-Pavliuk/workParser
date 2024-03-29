import {JSDOM} from 'jsdom';
import {CronJob} from "cron";


import config from "../config/config.mjs";
import { customLog } from "../common/log.mjs";
import { fetchPage } from '../common/fetching.mjs'
import { Database } from '../db/db.mjs';
import { tagAdd } from '../common/taggingService.mjs';



export class Parser {

		/**
	 * Create a new ```Parser```.
	 * @param schedule The time to fire off parsing cronJob. This can be in the form of cron syntax or a JS ```Date``` object.
	 * @param path is an object with url of the website's root and url of the adds page: {url: "www.djinny.co", uri: "/adds"}.
	 * @param channel string with the key to the channel in convict's config.
	 * @param bot TelegramBot.
	 * @param timeZone Specify the timezone for the execution. This will modify the actual time relative to your timezone. If the timezone is invalid, an error is thrown. Can be any string accepted by luxon's ```DateTime.setZone()``` (https://moment.github.io/luxon/api-docs/index.html#datetimesetzone).
	 * @param scrapeAdds Specify the function that scrapes adds.
	 * @param timeZone  Specify the function that parses adds.
	 */
	constructor(schedule,path,channel,bot,timeZone,scrapeAdds,parseJobs) {
		this.cronSchedule = schedule;
		this.timeZone = timeZone;
		this.path = path;
		this.channel = channel;
		this.#bot = bot;
		this.#db = new Database(this.channel);
		this.scrapeAdds = scrapeAdds;
		this.parseJobs = parseJobs;
	}
	cronSchedule
	timeZone
	path
	channel
	#bot
	#db

	#logToDB(path,addObj) {
		if (!this.#db.getListners[path]){
			this.#db.onUpdate(path,this.#checkFor10addsAndSendMessage(path))
		}
		this.#db.appendUniqly(`/${path}/`,{
			"title" : addObj.title,
			"tags" : addObj.tags ? addObj.tags : null,
			"url"	: addObj.url,
			"text" : addObj.text
		});
	}

	async #checkFor10addsAndSendMessage(path) {
		try{
			const adds = this.#db.get(path);
			if (adds && adds.length && adds.length > 9) {
				const heading = '<b>Список актуальних вакансій за посадою #' + path + '</b>\n\n'
				let text = heading;
				adds.forEach((add,index) => {
					if (add.text) {
						text += `${index+1}.${add.text}\n\n`
					}
				})
				if (text > heading){
					const chatId = config.get(this.channel);
					setTimeout(() => this.#bot.sendMessage(chatId, text, {'parse_mode': 'HTML'}),1000)
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
				jobAdds.forEach((addObj) => {
					addObj = tagAdd(addObj);
					if (addObj.tags) {
						tagged++;
						addObj.tags.forEach(tag => {
							this.#logToDB(tag,addObj);
						})
					}
				})
				customLog(`${this.path.url.slice(8)} parsing done, ${tagged} adds tagged and ${jobAdds.length - tagged} not`);
		}catch (err){
			customLog(err);
			console.log(err);
		}
	};


	startCronJob() {
		const job = new CronJob(this.cronSchedule,() => this.AddsJob(this.#bot),null,true,this.timeZone);
	}

}