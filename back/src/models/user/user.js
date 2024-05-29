const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true // this ensures the uniqueness of username
	},

	phone: {
		type: String,
		trim: true,
	},

	name: {
		type: String,
		required: true
	},

	passwordHash: {
		type: String,
		required: true
	},

	role: { type: String, enum: ["admin", "provider", "patient"], required: true } // Add role field
});

module.exports = mongoose.model("User", userSchema);

// TODO: create a reference to the provider type
// because all providers must be users?
