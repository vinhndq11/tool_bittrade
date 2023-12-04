const { ServiceProvider } = require('@adonisjs/fold');

const SocketService = use('App/Services/Socket');

class Socket extends ServiceProvider {
	register () {

	}

	boot () {
		SocketService.start();
	}
}

module.exports = Socket
