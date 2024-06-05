import mongoose, { Document, Schema, model } from "mongoose";
import { logError } from "../../services/loggerService";
import { Message } from "../../../../types/message"

// Define the message schema
const messageSchema = new Schema<Message>({
	sender: {
		type: Schema.Types.ObjectId, ref: "User", required: true
	},
	recipient: {
		type: Schema.Types.ObjectId, ref: "User", required: true
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

// Post-save middleware to populate sender and recipient fields
messageSchema.post("save", async function (doc, next) {
	try {
		await doc.populate("sender");
		await doc.populate("recipient");
	} catch (error) {
		logError("Error populating sender and recipient:", error);
	}
	next();
});

// Create and export the Message model
const MessageModel = model<Message>("Message", messageSchema);
export default MessageModel;
