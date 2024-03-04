import axios from "axios";
import { customLog } from "./log.mjs";

export const fetchPage = async (url) => {
	try{
	let responce = await axios({
		method: 'get',
		url: url,
		responseType: "text"
	});
	return responce.data;
}catch(err){
	throw err;
}
}
