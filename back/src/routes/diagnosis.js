const diagnosisRouter = require("express").Router();
const Diagnosis = require("../models/diagnosis");

diagnosisRouter.get("/:id", (request, response) => {
	Diagnosis.find({ icdcode: request.params.id }).then(diagnosis => {
		response.json(diagnosis);
	});
});


module.exports = diagnosisRouter;