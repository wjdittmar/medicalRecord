import Joi from "joi";
import { PatientDocument } from "./patient";
import { addressSchema } from "../address/addressSchema";

export const updatePatientSchema = Joi.object<PatientDocument>({
	user: Joi.string().hex().length(24).required(),
	dob: Joi.date().required(),
	ssn: Joi.string().required(),
	sex: Joi.string().required(),
	preferredLanguage: Joi.string().trim().required(),
	address: addressSchema.required(),
	_id: Joi.any()
});

export default updatePatientSchema;
