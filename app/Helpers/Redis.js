const redis = use('redis');

const hostname = process.env.REDIS_HOST || '127.0.0.1';
const port = process.env.REDIS_PORT || '6379';
const password = process.env.REDIS_PASSWORD || null;
const db = process.env.REDIS_DB || null;

let instance = null;
class Redis{
	constructor() {
		this.client = null;
	}

	static getInstance(){
		if(!instance){
			instance = new Redis();
		}
		return instance;
	}

	init(){
		this.client = redis.createClient({ port, hostname, db });
		if(password && password !== 'null'){
			this.client.auth(password);
		}
		return this;
	}

	async get(key){
		return new Promise(resolve => {
			this.client.get(key, (error, value) => {
				if(error){
					return resolve(false);
				}
				return resolve(value);
			});
		})
	}

	async getMulti(keys = []){
		return Promise.all(keys.map(key => this.get(key).then(value => ({[key]: value})) ) ).then(arrObj => Object.assign({}, ...arrObj));
	}
}

module.exports = Redis.getInstance().init();


