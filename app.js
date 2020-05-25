const express = require('express');
const app = express();
const AuthRoute = require('./routes/auth');
const TestRoute = require('./routes/test');
const passport = require('passport');
const Initialize = require('./config/passport-config');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;

const User = require('./models/User');
const Group = require('./models/Group');
const Activity = require('./models/Activity');
const Action = require('./models/Action');
const GroupAction = require('./models/GroupAction');
const UserActivity = require('./models/UserActivity');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderDetail = require('./models/OrderDetail');
const sequelize = require('./config/sequelize-config');

//(async () => {
//    await Group.create({GroupName: 'Mod'});
//    await User.create({Username: 'abcd', Password: '123', DisplayName: '1235', Email:'1234@abc.com', GroupName: 'Mod'});
//})();

app.set('view engine', 'ejs');
Initialize(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/test', TestRoute);
app.use('/api/user', AuthRoute);

app.get('/', (req, res) => {
	res.render('index');
});
app.listen(port, () => console.log('Server Up and Running on Port: ' + port));
