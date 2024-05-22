const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().required(),
	preferredLanguage: Joi.string().required(),
	dob: Joi.date().required(),
	sex: Joi.string().required(),
	ssn: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().email().required(),
	address: Joi.object({
		line: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		postalCode: Joi.number().required(),
		country: Joi.string()
	}).required(),
});

module.exports = schema;