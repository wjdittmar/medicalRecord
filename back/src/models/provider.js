/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
	},
	lastName: {
		type: String,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
	},
	license: {
		license_id: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		}
	}
});

module.exports = mongoose.model("Provider", providerSchema);
