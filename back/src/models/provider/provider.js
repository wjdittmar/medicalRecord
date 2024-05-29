/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
	license: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

});

module.exports = mongoose.model("Provider", providerSchema);
