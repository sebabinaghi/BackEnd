// Index
const getIndex = (req, res) => res.render('form.handlebars')

// Login
const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let { username } = req.user;
		res.render('form.handlebars', { username });
	} else res.render('login.handlebars');
};

// Signup
const getSignup = (req, res) => res.render('signup.handlebars');

// Process login
const postLogin = (req, res) => {
	const { username } = req.user;
	res.render('form.handlebars', { username });
}

// Process signup
const postSignup = (req, res) => {
	const { username } = req.user;
	res.render('form.handlebars', { username });
}

const getFailLogin = (req, res) => res.render('faillogin.handlebars');
const getFailSignup = (req, res) => res.render('failsignup.handlebars');

// Logout
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('/login');
}

const failRoute = (req, res) => res.status(404).render('routing-error');


// export {form,home,destroy, logout};

export {getIndex,	getLogin,getSignup,postLogin,postSignup,getFailLogin,getLogout,getFailSignup,failRoute,}