const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
	icdcode: String,
	disease: String,
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
