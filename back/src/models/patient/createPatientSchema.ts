import Joi from "joi";

export const createPatientSchema = Joi.object({
	user: Joi.string().hex().length(24).required(),
	preferredLanguage: Joi.string().trim().required(),
	preExistingConditions: Joi.array().items(Joi.string().hex().length(24)),
	dob: Joi.date().required(),
	sex: Joi.string().required(),
	ssn: Joi.string().required(),
	address: Joi.object({
		street: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		postalCode: Joi.string().required(),
		country: Joi.string().required(),
	}).required(),
});

export default createPatientSchema;
