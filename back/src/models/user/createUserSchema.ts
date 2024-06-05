import Joi from "joi";

const createUserSchema = Joi.object({
	email: Joi.string().email().required().lowercase().trim(),
	phone: Joi.string().trim().optional(),
	name: Joi.string().required(),
	password: Joi.string().required(),
	role: Joi.string().valid("admin", "provider", "patient").required()
});

export default createUserSchema;
