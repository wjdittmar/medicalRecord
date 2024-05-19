/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	preferredLanguage: {
		type: String,
		trim: true
	},
	preExistingConditions: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" }
	],
	dob: Date,
	sex: String,
	ssn: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model("Patient", patientSchema);
