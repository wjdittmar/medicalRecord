import mongoose, { Schema } from "mongoose";
import { User } from "../../../../types/user";
const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	name: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "provider", "patient"],
		required: true,
	}
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;