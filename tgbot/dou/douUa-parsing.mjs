import { JSDOM } from 'jsdom';
import { htmlToText } from 'html-to-text';

import { fetchPage } from "../common/fetching.mjs";




const scrapeAdds = async (document,url) => {
  let targetClass = '.l-vacancy a.vt';

  let anchors = [...document.querySelectorAll(targetClass)];
  let pages = [];
  for (const anchor of anchors) {
    let htmlContent = await fetchPage(anchor.href);
    if (htmlContent && htmlContent.length) pages.push({[anchor.href] : htmlContent})
  }

  // Scrape categories from djinny
  // const spans = document.querySelectorAll('span.filter-check');
  // let options = [];
  // spans.forEach(span =>{
  //   const input = span.querySelector('input[name="primary_keyword"]');
  //   if (input && input.value) options.push({[input.value.toString()] : input.value.toLowerCase().replace(/[\s-]/g,'_')});
  // })
  // config.set('djinnyTags',options);

	if (pages && pages.length) return pages;
}



const parseJobs = async (doms) => {
  let adds = []
  for (const item of doms){
    let jsonObj = {}
    for(const [key,value] of Object.entries(item)) {
      let dom = new JSDOM(value).window.document;

			if (key) jsonObj.url = key;

			if (dom.querySelector('h1') && dom.querySelector('h1').textContent) jsonObj.title = dom.querySelector('h1').childNodes[0].textContent.trim();

      if (dom.querySelector('.salary') && dom.querySelector('.salary').textContent) jsonObj.sallary = dom.querySelector('.salary').textContent.trim();

      if (dom.querySelector('.b-compinfo .l-n a') && dom.querySelector('.b-compinfo .l-n a').textContent) jsonObj.employer = dom.querySelector('.b-compinfo .l-n a').textContent.trim();

      const location = handleLocation(dom);
      if (location) jsonObj.address = location;

			let description = handleDescription(dom);
			if (description) jsonObj.description = description;

    }
    let data = parseFromJsonToText(jsonObj);
    if (data) adds.push(data);
  }
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
	if (json.employer) longText += '<b>' + json.employer + '</b>\n\n';
	if (json.sallary) longText += '🔹Зaрплатня:		' + json.sallary;
	if (json.address) longText += '\n🔹Локація:		' + json.address;
	if (json.description) longText += '\n\n\n' + json.description;
	obj.longText = longText;

  obj.url = json.url;

  return obj;
}

const handleDescription = (document) => {
  let div = document.querySelector('.b-typo,.vacancy-section');
  let text = null;

  if (div && div.textContent) text = htmlToText(div.innerHTML, {wordwrap:null});
  return text;
}


const handleLocation = (document) => {
  let element = document.querySelectorAll('.place,.bi,.bi-geo-alt-fill');
  let text = element.textContent || null;
  return text;
};



export {scrapeAdds, parseJobs}