const Joi = require("joi");

// TODO: could maybe do additional validation

const schema = Joi.object({
	sender: Joi.string().hex().length(24),
	recipient: Joi.string().hex().length(24),
	sendDate: Joi.date().required(),
	subject: Joi.string().required(),
	body: Joi.string().required()
});

module.exports = schema;
