const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	patient: Joi.string().hex().length(24),
	address: Joi.object({
		line: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		postalCode: Joi.number().required(),
		country: Joi.string()
	}).required(),
	encounterDate: Joi.date().required(),
	providerNotes: Joi.string(),
	provider: Joi.array().items(Joi.string().hex().length(24)),
});

module.exports = schema;