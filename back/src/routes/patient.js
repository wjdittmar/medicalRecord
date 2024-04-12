const patientRouter = require("express").Router();

const Patient = require("../models/patient");

patientRouter.get("/", async (request, response) => {
	Patient.find({}).populate("preExistingConditions", { icdcode: 1, disease: 1 }).then(patient => {
		response.json(patient);
	});
});

module.exports = patientRouter;