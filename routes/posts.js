const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
	res.status(200).json({
		posts: [
			{ id: 1, body: 'Data' },
			{ id: 2, body: 'You' },
			{ id: 3, body: 'Should' },
			{ id: 4, body: 'Not' },
			{ id: 5, body: 'Access' }
		]
	});
	console.log(`Got posts at ${new Date().toLocaleTimeString()}`);
});

module.exports = router;
