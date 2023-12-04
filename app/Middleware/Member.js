'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Member {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({request, response, auth}, next) {
		try{
			await auth.check();
			//console.log('auth', auth.user.member_transactions.fetch());
		} catch (e){
			return response.route('login.get')
		}
		await next();
	}
}

module.exports = Member
