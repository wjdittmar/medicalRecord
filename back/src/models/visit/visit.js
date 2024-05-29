const mongoose = require("mongoose");
const addressSchema = require("../address");

const visitSchema = new mongoose.Schema({
	patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
	encounterDate: {
		type: Date,
		required: true
	},
	address: addressSchema,
	providerNotes: String
});

module.exports = mongoose.model("Visit", visitSchema);
