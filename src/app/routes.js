module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/cursos', (req, res) => {
        res.render('cursos');
    });

    app.get('/precios', (req, res) => {
        res.render('precios');
    });

    app.get('/sobrenosotros', (req, res) => {
        res.render('sobrenosotros');
    });

    app.get('/loginosignup', (req, res) => {
        res.render('loginosignup');
    });

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
}

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/loginosignup')
}