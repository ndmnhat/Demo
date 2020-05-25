const passport = require('passport');
const router = require('express').Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { user } = req;
	res.send({ user });
});

module.exports = router;
