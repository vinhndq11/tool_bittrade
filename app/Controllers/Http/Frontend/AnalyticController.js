'use strict'

const BaseController = use('App/Controllers/Http/Frontend/BaseController');
const moment = use('moment');

class AnalyticController extends BaseController {
	async index({ view, auth }){
		let trial_count = auth.user.trial_count;
		let user_mode = auth.user.user_mode;
		let expired_tool_at = moment(auth.user.expired_tool_at);
		let is_expired_tool = 0;
		if(expired_tool_at.isAfter(new Date())){
			expired_tool_at = expired_tool_at.format('H:m DD/MM/YYYY');
		} else {
			expired_tool_at = '[HẾT HẠN]';
			is_expired_tool = 1;
		}
		return view.render('frontend.analytic.index', { user_mode, expired_tool_at, trial_count, is_expired_tool });
	}
}

module.exports = AnalyticController
