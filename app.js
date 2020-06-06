const express = require('express');
const app = express();
const AuthRoute = require('./routes/Users');
const ActivityRoute = require('./routes/Activities');
const TestRoute = require('./routes/test');
const passport = require('passport');
const Initialize = require('./config/passport-config');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;

const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

// const User = require('./models/User');
//const Group = require('./models/Group');
// const Activity = require('./models/Activity');
// const Action = require('./models/Action');
// const GroupAction = require('./models/GroupAction');
// const UserActivity = require('./models/UserActivity');
// const Product = require('./models/Product');
// const Order = require('./models/Order');
// const OrderDetail = require('./models/OrderDetail');
// const sequelize = require('./config/sequelize-config');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express session
redisClient.on('error', (err) => {
	console.log('Redis error: ', err);
});
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		store: new redisStore({ host: 'localhost', port: 6380, client: redisClient, ttl: 86400 }),
	})
);

// Passport middleware
Initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/test', TestRoute);
app.use('/api/user', AuthRoute);
app.use('/api/activity', ActivityRoute);

app.get('/', (req, res) => {
	res.render('index');
});
app.listen(port, () => console.log('Server Up and Running on Port: ' + port));
