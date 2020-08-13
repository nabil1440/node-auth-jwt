// VALIDATION CONFIG
const Joi = require('@hapi/joi');

const regVal = data => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);
};

const loginVal = data => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);
};

module.exports.regVal = regVal;
module.exports.loginVal = loginVal;
