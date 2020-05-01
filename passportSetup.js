const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

passport.use(new LocalStrategy({
    usernameField: username,
    passwordField: password
}, async (username,password,done) => {
    
}))