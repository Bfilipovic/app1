/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

new: function(req,res){
	req.session.authenticated = false;
	res.view('session/new');
	console.log(req.session);
},

create: function(req, res, next) {
console.log('CREATE');
if (!req.param('email') || !req.param('password')) {


	var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}]


		req.session.flash = {
			err: usernamePasswordRequiredError
	}

	res.redirect('/session/new');
	return;
}


User.findOneByEmail(req.param('email'), function foundUser (err, user) {
	if (err) return next(err);


	if (!user) {
		var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' does not exist in our user database.'}]
		req.session.flash = {
			err: noAccountError
		}
		res.redirect('/session/new');
		return;
	}


	bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
		if (err) return next(err);


		if (!valid) {
			var wrongPassword = [{name: 'wrongUsernameOrPassword', message: 'Invalid username and password combination.'}]
			req.session.flash = {
				err: wrongPassword
			}
			res.redirect('/session/new');
			return;
		}

	// Log user in
	console.log('sve ok');
		req.session.authenticated = true;
		req.session.User = user;
console.log('i dalje ok');
console.log(req.session.authenticated);
		res.redirect('/user/show/' + user.id);
	});
});
	},

	destroy: function(req, res, next) {

	// Wipe out the session (log out)
	req.session.destroy();

	// Redirect the browser to the sign-in screen
	res.redirect('/session/new');

	}

};
