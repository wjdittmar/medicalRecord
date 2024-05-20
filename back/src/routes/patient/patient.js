const patientRouter = require("express").Router();
const Patient = require("../../models/patient");
const User = require("../../models/user");
const schema = require("./patientSchema");
const { verifyToken } = require("../../utils/middleware");
const { createUser } = require("../users");

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
		const patients = await Patient.find({}).populate("preExistingConditions", { icdcode: 1, disease: 1 }).populate("user", { email: 1, name: 1, phone: 1 });
		response.json(patients);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to find patients by demographic data
patientRouter.get('/search', async (req, res) => {
	const { name, ssn, dob, zip } = req.query;
	const query = {};

	if (ssn) {
		query.ssn = ssn;
	}
	if (dob) {
		query.dob = dob;
	}
	if (zip) {
		query.zip = zip;
	}

	try {
		let userQuery = {};

		if (name) {
			userQuery.name = new RegExp(name, 'i'); // Case-insensitive regex search for name
		}

		// If name is provided, find matching users
		if (name) {
			const users = await User.find(userQuery, '_id').lean();
			const userIds = users.map(user => user._id);

			// Add user IDs to the patient query
			query.user = { $in: userIds };
		}
		const patients = await Patient.find(query)
			.populate('user', 'email name phone').populate("preExistingConditions", { icdcode: 1, disease: 1 })
			.lean(); // Use lean to get plain JavaScript objects instead of Mongoose documents

		res.json(patients);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});


// Endpoint to create a new patient
patientRouter.post("/", verifyToken, async (request, response) => {
	try {
		const body = request.body;
		const { name, phone, email, password } = request.body;
		const { preferredLanguage, dob, sex, ssn } = request.body;
		const { error, value } = schema.validate(body);
		if (error) {
			return response.status(422).json({
				success: false,
				result: null,
				message: error.details[0]?.message,
			});
		}

		// when you create a new patient,
		// you must also create a new user

		const savedUser = await createUser({ name, email, phone, password });

		const patient = new Patient({
			user: savedUser._id,
			preferredLanguage,
			dob,
			sex,
			ssn
		});

		const savedPatient = await patient.save();
		response.status(201).json(savedPatient);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

module.exports = patientRouter;
