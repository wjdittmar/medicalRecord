const patientRouter = require("express").Router();

const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

patientRouter.get("/", async (request, response) => {
	// make sure we are authorized to fetch
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	Patient.find({}).populate("preExistingConditions", { icdcode: 1, disease: 1 }).then(patient => {
		response.json(patient);
	});
});

// TODO: validate / sanitize input
patientRouter.post("/", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	const body = request.body;
	const patient = new Patient({
		firstName: body.name.split(" ")[0],
		lastName: body.name.split(" ")[1],
		phone: body.phone,
		preferredLanguage: body.language,
		dob: body.dob,
		email: body.email,

	});

	const savedPatient = await patient.save();

	response.status(201).json(savedPatient);
});

module.exports = patientRouter;