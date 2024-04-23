const patientRouter = require("express").Router();

const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

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
patientRouter.post("/", [
	check("name").not().isEmpty().isLength({ min: 5 }).withMessage("Name must have more than 5 characters"),
], async (request, response) => {
	const errors = validationResult(request);
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	const body = request.body;
	const patient = new Patient({
		firstName: body.name.split(" ")[0],
		lastName: body.name.split(" ")[1],
		phone: body.phone,
		preferredLanguage: body.preferredLanguage,
		dob: body.dob,
		email: body.email,
		sex: body.sex
	});

	if (!errors.isEmpty()) {
		return response.status(422).jsonp(errors.array());
	}
	else {

		const savedPatient = await patient.save();

		response.status(201).json(savedPatient);
	}

});

module.exports = patientRouter;