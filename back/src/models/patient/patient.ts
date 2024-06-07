import { Schema, Document, model } from "mongoose";
import addressSchema from "../address/address";
import { Patient } from "../../../../types/patient";
import { Types } from "mongoose";

export interface PatientDocument extends Patient, Document {
	_id?: Types.ObjectId;
}

const patientSchema = new Schema<PatientDocument>({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	preferredLanguage: {
		type: String,
		trim: true
	},
	preExistingConditions: [
		{ type: Schema.Types.ObjectId, ref: "Diagnosis" }
	],
	dob: Date,
	sex: String,
	ssn: {
		type: String,
		unique: true
	},
	address: { type: addressSchema, required: true }
});

patientSchema.set("toObject", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

// Create and export the Patient model
const PatientModel = model<PatientDocument>("Patient", patientSchema);
export default PatientModel;