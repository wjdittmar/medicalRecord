import { Types } from "mongoose";
import { Address } from "./address";

export interface Patient {
	user: Types.ObjectId;
	preferredLanguage?: string;
	preExistingConditions?: Types.ObjectId[];
	dob?: Date;
	sex?: string;
	ssn?: string;
	address?: Address;
}