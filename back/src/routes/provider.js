const providerRouter = require("express").Router();
const Provider = require("../models/provider");

providerRouter.get("/", (request, response) => {
	Provider.find({}).then(provider => {
		response.json(provider);
	});
});


module.exports = providerRouter;