const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().required(),
	preferredLanguage: Joi.string().required(),
	dob: Joi.date().required(),
	sex: Joi.string().required(),
	email: Joi.string().email().required()
});

module.exports = schema;