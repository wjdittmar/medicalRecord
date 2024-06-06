import { Schema, Document, model } from "mongoose";
import addressSchema from "../address";
import { Patient } from "../../../../types/patient";


export interface PatientDocument extends Patient, Document { }
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

// Create and export the Patient model
const PatientModel = model<PatientDocument>("Patient", patientSchema);
export default PatientModel;