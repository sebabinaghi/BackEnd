const form = (req, res) => {
	res.render('form', { name: req.session.name });
};

const home = (req, res) => {
	const { name } = req.body;
	req.session.name = name
	res.redirect('/');
}

const destroy = (req, res) => {
    const { name } = req.body;
	req.session.name = name
	try {
		req.session.destroy();
		res.redirect('/');
	} catch (err) {
		res.status(500).send('Error: ', err);
	}
}

const logout = (req, res) => {
	
	res.render('logout', { name: req.session.name });
	req.session.destroy();

	
}

export {form,home,destroy, logout};