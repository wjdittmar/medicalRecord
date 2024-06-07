import Joi from "joi";

import { AddressDocument } from "./address";

export const addressSchema = Joi.object<AddressDocument>({
	line: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	postalCode: Joi.string().required(),
	country: Joi.string(),
	_id: Joi.any()
});