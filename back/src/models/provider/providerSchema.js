const Joi = require("joi");

const schema = Joi.object({
	user: Joi.string().hex().length(24),
	license: Joi.string()
});

module.exports = schema;
