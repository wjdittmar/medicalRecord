const visitRouter = require("express").Router();
const Visit = require("../models/visit");

visitRouter.get("/", (request, response) => {
	Visit.find({}).populate("patient", { firstName: 1, lastName: 1 }).then(provider => {
		response.json(provider);
	});
});


module.exports = visitRouter;