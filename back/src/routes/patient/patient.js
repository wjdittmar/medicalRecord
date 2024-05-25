const patientRouter = require("express").Router();
const Patient = require("../../models/patient");
const User = require("../../models/user");
const schema = require("./patientSchema");
const { verifyToken, verifyTokenAndRole } = require("../../utils/middleware").default;
const { createUser } = require("../users");
const { getDayRange } = require("../../utils/date");

// Endpoint to get the total number of patients should only be visible to admins

patientRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	try {
		const totalPatients = await Patient.countDocuments();
		response.json({ totalPatients });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to get the number of patients older than a specified age should only be visible to admins

patientRouter.get("/older-than", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
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
patientRouter.get("/", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	try {
		const patients = await Patient.find({}).populate("preExistingConditions", { icdcode: 1, disease: 1 }).populate("user", { email: 1, name: 1, phone: 1 });
		response.json(patients);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to find patients by demographic data
patientRouter.get('/search', verifyToken, async (req, res) => {
	const { name, ssn, dob, postalCode } = req.query;
	const query = {};

	if (ssn) {
		query.ssn = ssn;
	}
	if (dob) {
		const { startOfDay, endOfDay } = getDayRange(dob);
		query.dob = { $gte: startOfDay, $lte: endOfDay };
	}
	if (postalCode) {
		query['address.postalCode'] = postalCode;
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
patientRouter.post("/", verifyTokenAndRole(["admin"]), async (request, response) => {
	try {
		const body = request.body;
		const { name, phone, email, password, address } = request.body;
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
			ssn,
			address
		});

		const savedPatient = await patient.save();
		response.status(201).json(savedPatient);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

patientRouter.put("/:id", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	const id = request.params.id;
	const body = request.body;

	try {
		// TODO: fix validation
		//const { error, value } = schema.validate(body);
		// if (error) {
		// 	return response.status(400).json({ error: error.details[0].message });
		// }

		// Find the patient by id
		const patient = await Patient.findById(id).populate('preExistingConditions');
		if (!patient) {
			return response.status(404).json({ error: "Patient not found" });
		}

		// Update the user associated with the patient
		const updatedUser = await User.findByIdAndUpdate(
			patient.user,
			{
				name: body.user.name,
				email: body.user.email,
				phone: body.user.phone,
			},
			{ new: true }
		);

		if (!updatedUser) {
			return response.status(404).json({ error: "User not found" });
		}

		// Update other patient fields
		patient.dob = body.dob;
		patient.ssn = body.ssn;
		patient.sex = body.sex;
		patient.preferredLanguage = body.preferredLanguage;
		patient.address = body.address; // Update address

		const updatedPatient = await patient.save();

		response.status(200).json(updatedPatient);
	} catch (error) {
		console.log(error);
		response.status(500).json({ error: "Internal server error" });
	}
});

module.exports = patientRouter;
