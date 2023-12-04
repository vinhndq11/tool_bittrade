import axios from "axios";
const env = use('Env');

const instance = axios.create({
	baseURL: env.get('BASE_API_SERVICE'),
	timeout: 30000,
});

instance.interceptors.request.use(config => {
	let userInfo = getItem(KEY.USER_INFORMATION);
	config.headers = {
		...config.headers,
		Authorization: userInfo ? userInfo['login_token'] : null,
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json',
	};
	return config;
});

instance.interceptors.response.use(response => {
	if (response.status !== 200) {
		return { message: 'Error ... ' + response.statusText, success: false };
	}
	return response.data;
}, error => {
	return { message: 'Error ...' + error.message, success: false };
});

export default instance;
