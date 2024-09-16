import {JSDOM} from "jsdom";
import { htmlToText } from "html-to-text";
import {fetchPage} from '../common/fetching.mjs'
import {customLog} from '../common/log.mjs'


const scrapeAdds = async (document,url) => {
	const urlPattern = /^\/jobs\/\d+\/$/;

	let anchors = [...document.querySelectorAll('a[href^="/jobs/"]')];
	anchors = new Set(anchors.map((anchor) => anchor.href));
	let pages = [];
	for (let anchor of anchors) {
		if (urlPattern.test(anchor)){
			let htmlContent = await fetchPage(url+anchor);
			if (htmlContent && htmlContent.length) pages.push({[url+anchor] : htmlContent});
		}
	}
	if (pages && pages.length) return pages;
	else {
		customLog("Failed scrapping job adds")
		process.exit(3);
	}
}


const parseJobs = async (doms) => {
	let adds = [];
	doms.forEach((item) => {
		let jsonObj = {}
		for (const [key, value] of Object.entries(item)) {
			let dom = new JSDOM(value).window.document;

			if (key) jsonObj.url = key;

			if (dom.querySelector('#h1-name').innerHTML) jsonObj.title = dom.querySelector('#h1-name').innerHTML;

			let sallary = handleSallary(dom);
			if (sallary) jsonObj.sallary = sallary;

			let employer = handleEmployer(dom);
			if (employer) jsonObj.employer = employer;

			let address = handleAddress(dom);
			if (address) jsonObj.address = address;

			let phone = handlePhone(dom);
			if (phone) jsonObj.phone = phone;

			let description = handleDescription(dom);
			if (description) jsonObj.description = description;

		}
		let data = parseFromJsonToText(jsonObj);
		adds.push(data);
	});
    return adds;
}


const parseFromJsonToText = (json) =>{
  let text = '';
  let obj = {};
	if (json.title) text += `<a href="${json.url}"><b>` + json.title + '</b></a>';
  if (json.employer) text += '<b>\n🏢Компанія:</b> ' + json.employer;
  if (json.address) text += '<b>\n📍Локація:</b> ' + json.address;
  if (json.sallary) text += '<b>\n💳ЗП:</b> ' + json.sallary;

  // if (json.description) text += '\n\n\n' + json.description;
  if (json.title) obj.title = json.title;
  obj.text= text;

	let longText = '';
	if (json.title) longText += `<a href="${json.url}"><b>` + json.title.toUpperCase() + '</b></a>\n\n';
	if (json.employer.name) longText += '<b>' + json.employer.name + '</b>\n\n';
	if (json.sallary) longText += '🔹Зaрплатня:		' + json.sallary;
	if (json.address) longText += '\n🔹Локація:		' + json.address;
	if (json.description) longText += '\n\n\n' + json.description;
	obj.longText = longText;

  obj.url = json.url;

  return obj;
}


const handleDescription = (dom) => {
    let description = null;
	const descriptionElement = dom.querySelector('#job-description');
    if (descriptionElement && descriptionElement.textContent) {
        description = htmlToText(descriptionElement.innerHTML,{wordwrap:null});
		description = description.replace(/Показати телефон/g,'').replace(/\[([^\]]+)\]/g,'').replace(/(\+380[\s\d(—)\-]+)/g, '\n$1');
    }
    return description;
}

const handlePhone = (dom) => {
	let phone = null;
	const parent = dom.querySelector('#contact-phone');
    if (parent) {
	    const phoneElement = dom.querySelector('a[href^="tel:"]');
        if (phoneElement && phoneElement.innerHTML) phone = phoneElement.innerHTML;
    }
	return phone;
}


const handleAddress = (dom) => {
	let address = null;
	const span = dom.querySelector('span.glyphicon[title="Адреса роботи"]');
	if (span) {
		let addressElement = span.nextSibling;
		if (addressElement && addressElement.textContent) address = addressElement.textContent.trim();
	}
	return address;
}


const handleEmployer = (dom) => {
    let employer = {};
    const span = dom.querySelector('span[title="Дані про компанію"]')
    const parrent = span ? span.parentElement : null;
    if (parrent) {
        let employerNameElement = parrent.querySelector('a b');
        if (employerNameElement) {
            employer.name = employerNameElement.innerHTML;
        }
        let emplyerTypeElement = parrent.querySelector('span[class="add-top-xs"]');
        if (emplyerTypeElement) {
			let type =  emplyerTypeElement.childNodes[0].textContent.trim();
			type = type.replace(';','');
			if (type.includes(',')) type = type.slice(0,type.indexOf(','));
			employer.type = type.replace(/[\s-]/g,'_');
        }
    }
	return employer;
}


const handleSallary = (dom) => {
	let sallary = null;
	const parrent = dom.querySelector('span[title="Зарплата"]');
	if (parrent && parrent.nextElementSibling) {
		let sallaryElement = parrent.nextElementSibling;
		if (sallaryElement && sallaryElement.innerHTML) sallary = sallaryElement.innerHTML;
	}
	return sallary;
}


export {scrapeAdds, parseJobs}