'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Base = use('App/Models/Base');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const env = use('Env');

class Hacker extends Base {
	avatar;

	static boot () {
		super.boot()
		this.addHook('beforeSave', async (userInstance) => {
			console.log('Creating....',userInstance);
			if (userInstance.dirty.password) {
				userInstance.password = await Hash.make(userInstance.password)
			}
		});
	}

	getAvatar(){
		return this.avatar ? env.get('BASE_URL_SERVICE') + '/' + this.avatar : 'img/undraw_profile.svg';
	}

}

module.exports = Hacker
