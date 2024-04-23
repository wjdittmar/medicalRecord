const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	patient: Joi.object().required(),
	address: Joi.object({
		address1: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		zipCode: Joi.number().required()
	}).required(),
	phone: Joi.string().required(),
	preferredLanguage: Joi.string().required(),
	encounterDate: Joi.date().required(),
	sex: Joi.string().required()
});

module.exports = schema;