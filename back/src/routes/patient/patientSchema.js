const Joi = require("joi");

const schema = Joi.object({
	user: Joi.object({
		_id: Joi.string().hex().length(24), // the reference to the user object
		name: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().email().required(),
	}).required(),
	preferredLanguage: Joi.string().trim().required(),
	preExistingConditions: Joi.array().items(Joi.string().hex().length(24)),
	dob: Joi.date().required(),
	sex: Joi.string().required(),
	ssn: Joi.string().required(),
	address: Joi.object({
		line: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		postalCode: Joi.string().required(),
		country: Joi.string().required(),
	}).required(),
});

module.exports = schema;
