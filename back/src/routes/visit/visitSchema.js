const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	patient: Joi.string().hex().length(24),
	address: Joi.object({
		address1: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		zipCode: Joi.number().required()
	}).required(),
	encounterDate: Joi.date().required(),
	providerNotes: Joi.string()
});

module.exports = schema;