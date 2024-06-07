import Joi from "joi";
import { addressSchema } from "../address/addressSchema";

export const patientSchema = Joi.object({
	user: Joi.string().hex().length(24).required(),
	preferredLanguage: Joi.string().trim().required(),
	preExistingConditions: Joi.array().items(Joi.object({
		_id: Joi.any(),
		disease: Joi.string(),
		icdcode: Joi.string()
	})),
	dob: Joi.date().required(),
	sex: Joi.string().required(),
	ssn: Joi.string().required(),
	address: addressSchema.required(),
	_id: Joi.any()
});

export default patientSchema;