const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { regVal, loginVal } = require('../validation');

router.post('/register', async (req, res) => {
	// VALIDATE
	const { error } = regVal(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Email exists?
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) return res.status(400).send('Email already exists!');

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	// Create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPass
	});
	try {
		const savedUser = await user.save();
		res.send({ user: savedUser._id });
		console.log(`Register at ${new Date().toLocaleTimeString()}`);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	// Validate
	const { error } = loginVal(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// User exists?
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('User not found.');

	// Is the password correct?
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(403).send('Invalid password.');

	// Create and assign and a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('bearer-token', token).send(token);
	console.log(`Logged in at ${new Date().toLocaleTimeString()}`);
});

module.exports = router;
