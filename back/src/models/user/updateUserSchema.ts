import Joi from "joi";

const updateUserSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().optional().allow(""),
	email: Joi.string().email().required(),
});

export default updateUserSchema;
