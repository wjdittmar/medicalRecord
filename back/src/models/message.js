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
messageSchema.post("save", async function (doc) {
	try {
		// Populate sender field with user data
		await this.populate("sender");
		// Populate recipient field with user data
		await this.populate("recipient");
	} catch (error) {
		console.error("Error populating sender and recipient:", error);
	}
});

module.exports = mongoose.model("Message", messageSchema);
