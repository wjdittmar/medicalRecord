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



module.exports = patientRouter;