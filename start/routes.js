'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'Frontend/HomeController.index').as('home.get');

Route.get('login', 'Frontend/AuthController.getLogin').as('login.get');
Route.post('login', 'Frontend/AuthController.postLogin').as('login.post');

Route.get('register', 'Frontend/AuthController.getRegister').as('register.get');
Route.post('register', 'Frontend/AuthController.postRegister').as('register.post');

Route.group('/', () => {
	Route.get('analytic', 'Frontend/AnalyticController.index').as('analytic.get');
	Route.get('get-account', 'Frontend/MemberController.getAccount').as('account.get');

	Route.get('logout', 'Frontend/AuthController.getLogout').as('logout.get');
}).middleware('member');
