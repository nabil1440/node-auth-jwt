const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		min: 6,
		max: 36
	},
	email: {
		type: String,
		min: 6,
		max: 80
	},
	password: {
		type: String,
		min: 6,
		max: 1024
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
