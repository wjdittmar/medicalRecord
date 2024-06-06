import { Schema } from "mongoose";
import { Address } from "../../../types/address";

const addressSchema = new Schema<Address>({
	line: { type: String, required: false },
	city: { type: String, required: false },
	state: { type: String, required: false },
	postalCode: { type: String, required: false },
	country: { type: String, required: false },
});

export default addressSchema;