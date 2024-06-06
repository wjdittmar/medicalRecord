// visit.ts
import mongoose, { Schema, Model } from "mongoose";
import { Visit } from "../../../../types/visit";
import addressSchema from "../address";

const visitSchema: Schema<Visit> = new mongoose.Schema({
	patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
	encounterDate: {
		type: Date,
		required: true
	},
	address: addressSchema,
	providerNotes: { type: String },
	provider: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }
	],
});

// Index by provider to speed up this query, as it will be frequent
visitSchema.index({ provider: 1 });

const VisitModel: Model<Visit> = mongoose.model<Visit>("Visit", visitSchema);

export default VisitModel;
