const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true // this ensures the uniqueness of username
	},
	name: String,
	passwordHash: String
});

module.exports = mongoose.model("User", userSchema);

// TODO: create a reference to the provider type
// because all providers must be users
