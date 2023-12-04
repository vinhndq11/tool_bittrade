const {ServiceProvider} = require('@adonisjs/fold');

class GlobalVariable extends ServiceProvider {
  register() {

  }

  boot() {
    const env = use('Env');
    const View = this.app.use('Adonis/Src/View')
    View.global('weDomain',  env.get('WE_DOMAIN'))
    View.global('weName', env.get('WE_NAME'))
  }
}

module.exports = GlobalVariable
