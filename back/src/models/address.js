const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
	line: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	state: {
		type: String,
		required: false
	},
	postalCode: {
		type: String,
		required: false
	},
	country: {
		type: String,
		required: false
	}
});

module.exports = addressSchema;
