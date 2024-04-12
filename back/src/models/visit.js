const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
	patientID: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
	encounterDate: {
		type: Date,
		required: true
	},
	address: {
		address1: {
			type: String,
			required: true
		},
		address2: {
			type: String
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		zipCode: {
			type: Number,
			required: true
		}
	}
});

module.exports = mongoose.model("Visit", visitSchema);
