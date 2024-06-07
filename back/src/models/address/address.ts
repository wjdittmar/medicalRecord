import { Schema } from "mongoose";
import { Address } from "../../../../types/address";
import { Types } from "mongoose";


const addressSchema = new Schema<AddressDocument>({
	line: { type: String, required: false },
	city: { type: String, required: false },
	state: { type: String, required: false },
	postalCode: { type: String, required: false },
	country: { type: String, required: false },
});


export interface AddressDocument extends Address, Document {
	_id?: Types.ObjectId;
}

export default addressSchema;