import axios from "axios";
import fs from "fs";
import FormData from "form-data"

export default class TelegramBot {

		/**
	 * Create a new ```TelegramBot```.
	 * @param token.
	 */
	constructor(token) {
		if(!token || typeof token != "string"){
			throw new Error ("No valid token provided")
		}
		this.baseUrl = `https://api.telegram.org/bot${token}`
	}
	url

	async sendMessage(chatId, text, options = {}){
		const body = {
			chat_id: chatId,
			text,
			parse_mode: "HTML"
		};

		const url = `${this.baseUrl}/sendMessage`
		try {
			const {data} = await axios.post(url,body,{headers:{"Content-Type":"application/json"}});
			if (data.ok) {
				return data.result;
			}
		} catch (err) {
			throw new Error(`Error parsing response: ${err}`);
		}


		return false;
	}


	async sendPicture(chatId, photo,caption, options = {}){

		const form = new FormData()

		form.append("chat_id",chatId)
		if(caption?.length) {
			form.append("caption",caption);
			form.append("parse_mode","HTML");
		}

		if(Buffer.isBuffer(photo)) form.append("photo",photo);
		else if(typeof photo == "string"){
			const filePath = `./config/assets/${photo}`;
			if(fs.existsSync(filePath)){
				form.append("photo",fs.createReadStream(filePath));
			}
		}


		const url = `${this.baseUrl}/sendPhoto`
		try {
			const {data} = await axios.post(url,form,{headers:{...form.getHeaders()}});
			if (data.ok) {
				return data.result;
			}
		} catch (err) {
			throw new Error(`Error parsing response: ${err}`);
		}


		return false;
	}

}