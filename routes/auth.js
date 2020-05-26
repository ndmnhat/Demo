const router = require('express').Router();
const { Validation } = require('../validation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', async (req, res) => {
	const user = await User.findOne({ where: { Username: req.body.username } });
	if (user) return res.send('Username not available');
	const { error } = Validation(req.body);
	if (error) return res.send(error.details[0].message);

	//Hash password
	const salt = await bcrypt.genSalt(10);
	hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Luu vao db
	const newuser = await User.create({
		Username: req.body.username,
		Password: hashedPassword,
		DisplayName: req.body.displayname,
		Email: req.body.email,
	});
	return res.send(newuser.UserID);
});

router.post('/login', async (req, res) => {
	passport.authenticate('local', { session: false }, (error, user) => {
		if (error || !user) {
			return res.status(400).send(error);
		}

		const payload = { userid: user.UserID, role: user.GroupName };

		req.login(payload, { session: false }, (error) => {
			if (error) {
				res.status(400).send({ error });
			}
		});
		const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
			expiresIn: '10m',
		});
		res.cookie('jwt', token);
		res.send(user);
	})(req, res);
});

router.post('/logout', (req, res) => {
	res.cookie('jwt', '');
	res.sendStatus(200);
});

module.exports = router;
