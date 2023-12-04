'use strict'

const BaseController = use('App/Controllers/Http/Frontend/BaseController');
const Hacker = use('App/Models/Hacker');
const moment = use('moment');
const Hash = use('Hash');
const Helper = use('App/Helpers/Helper');

class AuthController extends BaseController {
	async getLogin({ auth, response, view }){
		try{
			await auth.check();
			return response.route('analytic.get');
		} catch (e){}
		return view.render('frontend.auth.login');
	}

	async postLogin({ request, response, session, auth }){
		let { email, password } = request.all();
		try{
			let hacker = await Hacker.findBy('email', email);
			if(!hacker){
				session.flash({ message: 'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại!', email });
				return response.redirect('back');
			}
			let ip = request.header('x-forwarded-for') || request.ip();
			if(await Hacker.query().where('ip', ip).where('email', '!=', email).first() && !parseInt(hacker['allow_duplicate_ip'])){
				session.flash({ message: 'Mỗi người chơi chỉ được đăng nhập bằng 1 tài khoản!', email });
				return response.redirect('back');
			}

			await auth.attempt(email, password);

			let user = await auth.user;
			user.last_login = moment().format('YYYY-MM-DD hh:mm:ss');
			user.ip = ip;
			user.user_agent = request.header('user-agent');
			await user.save();
			return response.route('analytic.get');
		} catch (e){
			session.flash({ message: 'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại!', email });
			return response.redirect('back');
		}
	}

	async getRegister({ auth, response, view }){
		try{
			await auth.check();
			return response.route('analytic.get');
		} catch (e){}
		return view.render('frontend.auth.register');
	}

	async postRegister({ request, response, session }){
		let { email, password, name } = request.all();
		let ip = request.header('x-forwarded-for') || request.ip();
		if(await Hacker.findBy('ip', ip)){
			session.flash({ message: 'Mỗi người chơi chỉ được tạo 1 tài khoản để sử dụng!', email, name });
			return response.redirect('back');
		}

		let hacker = await Hacker.findBy('email', email);
		if(hacker){
			session.flash({ message: 'Email này đã tồn tại, vui lòng thử email khác hoặc chọn đăng nhập!', email, name });
			return response.redirect('back');
		}

		let { trial_count, trial_expired_count } = Helper.getSetting();
		await Hacker.create({
			email,
			password: await Hash.make(password),
			name,
			trial_count,
			expired_tool_at: moment().add(parseInt(trial_expired_count) || 0, 'days').set({hour:23,minute:59,second:59}).format('YYYY-MM-DD hh:mm:ss')
		})
		session.flash({ message: 'Tạo tài khoản thành công, vui lòng đăng nhập để tiếp tục', email });
		return response.route('login.get');
	}

	async getLogout({ response, auth }){
		try{
			await auth.logout();
		} catch (e){}
		return response.route('login.get');
	}
}

module.exports = AuthController
