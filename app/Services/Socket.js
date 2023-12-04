const { io } = require("socket.io-client");
const fs = require("fs");
require('dotenv').config({ path: '.env' });

let instance = null;
class Socket {
	constructor() {
		this._socket = null;
	}

	static getInstance(){
		if(!instance){
			instance = new Socket();
		}
		return instance;
	}

	getSocketClient = () => {
		return this._socket;
	}

	getSocketServer = () => {
		return this._socketServer;
	}

	start(){
		let settingPath = process.env.SITE_SETTING_PATH;
		if(settingPath && fs.existsSync(settingPath)){
			let { socket_link } = JSON.parse(fs.readFileSync(settingPath).toString());
			this._socket = io(socket_link);
		}

		this._socket.on('WE_PRICE', ({createDateTime, openPrice, closePrice, baseVolume, highPrice, lowPrice, second, psychological_indicators, is_bet}) => {
			console.log(createDateTime, second, is_bet);
		});

		return this;
	}
}

module.exports = Socket.getInstance();
