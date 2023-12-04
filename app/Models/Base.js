'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const util = require('@adonisjs/lucid/lib/util')
const env = use('Env');

class Base extends Model {
	static get table(){
		return env.get('DB_PREFIX') + util.makeTableName(this.name);
	}
}

module.exports = Base
