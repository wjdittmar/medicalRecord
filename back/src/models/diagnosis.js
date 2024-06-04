import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
	icdcode: String,
	disease: String,
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export default Diagnosis;
