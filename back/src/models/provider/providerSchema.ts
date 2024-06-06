import Joi from "joi";

const schema = Joi.object({
	user: Joi.object({
		id: Joi.string().hex().length(24) // the reference to the user object
	}),
	license: Joi.string().required()
});

export default schema;
