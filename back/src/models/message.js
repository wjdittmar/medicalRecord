const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

	sender: {
		type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
	},

	recipient: {
		type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
	},

	sendDate: {
		type: Date,
		required: true
	},

	subject: {
		type: String,
		required: true
	},

	body: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Message", messageSchema);
