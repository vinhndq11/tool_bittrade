'use strict'

class HomeController {
	index({ request, response, view }){
		return view.render('frontend.home.index');
	}
}

module.exports = HomeController
