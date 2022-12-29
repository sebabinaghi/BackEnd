import express from 'express';
const router = express();
import passport from 'passport';
// import {destroy,form,home, logout} from "../controllers/controller.js"
import{getFailLogin,getFailSignup,getIndex,getLogin,getLogout,getSignup,postLogin,postSignup,failRoute}from   "../controllers/controller.js"
import { checkAuthentication } from '../middlewares/auth.js';
// import pkg from "../middlewares/auth.js" 


// Index
router.get('/', checkAuthentication, getIndex);

// Login
router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin);
router.get('/faillogin', getFailLogin);

// Signup
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignup);
router.get('/failsignup', getFailSignup);

// Redirect to login & signup
router.post('/redirect-signup', (req, res) => res.redirect('/signup'));
router.post('/redirect-login', (req, res) => res.redirect('/login'));

// Logout
router.post('/logout', getLogout);

// Fail route
router.get('*', failRoute);



// router.get('/', login, form)
// router.post("/home", home)
// router.post("/logout",destroy)
// router.post("/logout2",logout)

export default router;