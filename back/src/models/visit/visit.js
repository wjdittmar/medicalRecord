const mongoose = require("mongoose");
const addressSchema = require("../address");

const visitSchema = new mongoose.Schema({
	patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
	encounterDate: {
		type: Date,
		required: true
	},
	address: addressSchema,
	providerNotes: String,
	provider: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }
	],
});

// index by provider to speed up this query, as it will be frequent

visitSchema.index({ provider: 1 });

module.exports = mongoose.model("Visit", visitSchema);
