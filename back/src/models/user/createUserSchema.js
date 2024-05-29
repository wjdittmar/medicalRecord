const Joi = require("joi");

const createUserSchema = Joi.object({
	email: Joi.string().email().required().lowercase().trim(),
	phone: Joi.string().trim().optional(),
	name: Joi.string().required(),
	password: Joi.string().required(),
	role: Joi.string().valid("admin", "provider", "patient").required()
});

module.exports = createUserSchema;
