import { User } from "./user";
import { Types } from "mongoose";

export type UserTokenPayload = Omit<User, 'passwordHash'> & {
	id: Types.ObjectId;
	provider: { id: Types.ObjectId } | null;
};