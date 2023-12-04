const { parse: cookieParse } = require('cookie');
const Encryption = use('Encryption')
const Hacker = use('App/Models/Hacker');
const env = use('Env');
const fs = use('fs');

function getSetting(){
	let settingPath = env.get('SITE_SETTING_PATH');
	if(settingPath && fs.existsSync(settingPath)){
		return JSON.parse(fs.readFileSync(settingPath).toString());
	}
	return {};
}

function formatNumber(value) {
	return (value || '0').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function randomInArray(items) {
	return items[Math.floor(Math.random() * items.length)];
}

async function getUserFromCookie(cookie) {
	if(!cookie){
		return false;
	}
	try{
		let regex = /"d":"([0-9]+)","t":"Number"/;
		let cookies = cookieParse(cookie);
		cookies = Encryption.decrypt(cookies['hnt-session-values']);
		let userId = parseInt(regex.exec(cookies)[1]);
		return Hacker.find(userId);
	} catch (e) {
		console.log('Error decode cookie', e.message);
		return false;
	}
}

function getValueFromPercent(percent, valueTrue, valueFalse){
	let array = [...Array(percent).fill(valueTrue), ...Array(100 - percent).fill(valueFalse)]
		.map((a) => ({sort: Math.random(), value: a}))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);

	return randomInArray(array);
}


module.exports = {
	formatNumber,
	randomInArray,
	getUserFromCookie,
	getValueFromPercent,
	getSetting
};
