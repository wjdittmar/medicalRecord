import { Schema } from "mongoose";
import { Address } from "../../../types/address"

const addressSchema = new Schema<Address>({
	street: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	postalCode: { type: String, required: true },
	country: { type: String, required: true },
});

export default addressSchema;