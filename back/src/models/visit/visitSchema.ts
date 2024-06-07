import Joi from "joi";
import { addressSchema } from "../address/addressSchema";

const schema = Joi.object({
	patient: Joi.string().hex().length(24),
	address: addressSchema.required(),
	encounterDate: Joi.date().required(),
	providerNotes: Joi.string(),
	provider: Joi.array().items(Joi.string().hex().length(24)),
});

export default schema;
