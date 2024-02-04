import axios from "axios";


export const fetchPage = async (url) => {
	let responce = await axios({
		method: 'get',
		url: url,
		responseType: "text"
	});
	return responce.data;
}
