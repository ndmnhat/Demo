const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			const user = await User.findOne({ where: { username: username } });
			if (user === null) {
				return done('Invalid Username');
			}
			const validPass = await bcrypt.compare(password, user.Password);
			if (!validPass) return done(null, false, { message: 'Password incorrect' });
			return done(null, user);
			// , async (error, result) => {

			// if(!result) return done('Invalid Username');

			// const validPass = await bcrypt.compare(password,result.Password);
			// if(!validPass) return done(null,false,{message: 'Password incorrect'});

			// return done(null,result);
		})
	);
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: (req) => req.cookies.jwt,
				secretOrKey: process.env.TOKEN_SECRET,
			},
			(jwtPayload, done) => {
				return done(null, jwtPayload.userid);
			}
		)
	);
};
