const express = require('express');
const app = express();
const AuthRoute = require('./routes/auth');
const TestRoute = require('./routes/test');
const passport = require('passport');
const Initialize = require('./config/passport-config');
const cookieParser = require('cookie-parser');

Initialize(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/test', TestRoute);
app.use('/api/user',  AuthRoute);

app.listen(3000, () => console.log('Server Up and Running'));