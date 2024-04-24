const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	name: Joi.string().required(), // TODO: could be sent as firstName lastName to match the backend model
	phone: Joi.string().required(),
	email: Joi.string().email().required(),
	license: Joi.string().required(), // TODO: could make this into an object
});

module.exports = schema;
