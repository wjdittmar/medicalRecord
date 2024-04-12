/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
	preferredLanguage: {
		type: String,
		trim: true
	},
	preExistingConditions: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "diagnoses" }
	],
	dob: Date,
	email: {
		type: String,
		trim: true,
		lowercase: true,
	},
	sex: String
});

module.exports = mongoose.model("Patient", patientSchema);
