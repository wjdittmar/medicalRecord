const Joi = require("joi");

const updatePatientSchema = Joi.object({
	dob: Joi.date().required(),
	ssn: Joi.string().required(),
	sex: Joi.string().required(),
	preferredLanguage: Joi.string().trim().required(),
	address: Joi.object({
		line: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		postalCode: Joi.string().required(),
		country: Joi.string().required(),
	}).required(),
});

module.exports = updatePatientSchema;
