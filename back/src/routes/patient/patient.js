const patientRouter = require("express").Router();
const Patient = require("../../models/patient");
const jwt = require("jsonwebtoken");
const schema = require("./patientSchema");

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

patientRouter.post("/", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	const body = request.body;

	const { error, value } = schema.validate(body);
	const patient = new Patient({
		firstName: body.name.split(" ")[0],
		lastName: body.name.split(" ")[1],
		phone: body.phone,
		preferredLanguage: body.preferredLanguage,
		dob: body.dob,
		email: body.email,
		sex: body.sex
	});

	if (error) {
		const { details } = error;
		return response.status(422).json({
			success: false,
			result: null,
			message: details[0]?.message,
		});
	}

	const savedPatient = await patient.save();
	response.status(201).json(savedPatient);

});

module.exports = patientRouter;