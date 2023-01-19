import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

// const LocalStrategy = passport("passport-local").Strategy;
import bcrypt from "bcrypt";
import User from "../models/User.js";




// const login = (req, res, next) => {
// 	if (req.session?.name) {
// 		next();
// 	} else {
// 		res.render('../views/login.handlebars');
// 	}
// }

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use('login', new LocalStrategy(
	(username, password, done) => {
		User.findOne({ username }, (error, user) => {
			if (error) return done(error);
			if (!user) return done(null, false, { message: 'Usuario y/o contraseña incorrectos' });
			if (!isValidPassword(user, password)) return done(null, false, { message: 'Usuario y/o contraseña incorrectos' });
			return done(null, user);
		})
	}
));

passport.use('signup', new LocalStrategy({
	passReqToCallback: true
},
	(req, username, password, done) => {
		User.findOne({ 'username': username }, (error, user) => {
			if (error) return done(error, user, { message: 'Error al intentar registrar el usuario' });
			if (user) return done(null, false, { message: 'El usuario ya existe' });
			const newUser = { username, password: createHash(password) }
			User.create(newUser, (error, userWithId) => {
				if (error) return done(error, user, { message: 'Error creando usuario' });
				return done(null, userWithId, { message: 'Usuario registrado' });
			})
		})
	}
));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect('/login');
}



export  {checkAuthentication}


