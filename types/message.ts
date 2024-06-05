import mongoose from "mongoose";

export interface Message {
	sender: mongoose.Types.ObjectId;
	recipient: mongoose.Types.ObjectId;
	sendDate: Date;
	subject: string;
	body: string;
}
