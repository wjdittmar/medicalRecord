const patientRouter = require("express").Router();
const Patient = require("../../models/patient");
const schema = require("./patientSchema");
const { verifyToken } = require("../../utils/middleware");

// Endpoint to get the total number of patients
patientRouter.get("/total", verifyToken, async (request, response) => {
	try {
		const totalPatients = await Patient.countDocuments();
		response.json({ totalPatients });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to get the number of patients older than a specified age
patientRouter.get("/older-than", verifyToken, async (request, response) => {
	try {
		const ageThreshold = parseInt(request.query.age); // Extract age threshold from query parameter
		if (isNaN(ageThreshold)) {
			return response.status(400).json({ error: "Invalid age threshold" });
		}
		const currentDate = new Date();
		const thresholdDate = new Date(currentDate - 1000 * 60 * 60 * 24 * 365 * ageThreshold);
		const patientsOlderThanThreshold = await Patient.countDocuments({ dob: { $lte: thresholdDate } });
		response.json({ patientsOlderThanThreshold });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to get all patients
patientRouter.get("/", verifyToken, async (request, response) => {
	try {
		const patients = await Patient.find({}).populate("preExistingConditions", { icdcode: 1, disease: 1 });
		response.json(patients);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to find patients by demographic data
patientRouter.get('/search', (req, res) => {
	const { name, ssn, dob, zip } = req.query;
	console.log(name, ssn, dob, zip);
	// Implement the search logic here
	// Filter patients based on the provided query parameters
	// const filteredPatients = patients.filter(patient => {
	// 	return (
	// 		(!name || patient.name.toLowerCase().includes(name.toLowerCase())) &&
	// 		(!ssn || patient.ssn.includes(ssn)) &&
	// 		(!dob || patient.dob.includes(dob)) &&
	// 		(!zip || patient.zip.includes(zip))
	// 	);
	// });
	// res.json(filteredPatients);
});

// Endpoint to create a new patient
patientRouter.post("/", verifyToken, async (request, response) => {
	try {
		const body = request.body;
		const { error, value } = schema.validate(body);
		if (error) {
			return response.status(422).json({
				success: false,
				result: null,
				message: error.details[0]?.message,
			});
		}

		const patient = new Patient({
			firstName: body.name.split(" ")[0],
			lastName: body.name.split(" ")[1] || "",
			phone: body.phone,
			preferredLanguage: body.preferredLanguage,
			dob: body.dob,
			email: body.email,
			sex: body.sex
		});

		const savedPatient = await patient.save();
		response.status(201).json(savedPatient);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

module.exports = patientRouter;
