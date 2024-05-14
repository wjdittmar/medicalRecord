const providerRouter = require("express").Router();

const Provider = require("../../models/provider");
const schema = require("./providerSchema");
const { verifyToken } = require("../../utils/middleware");
const { createUser } = require("../users");

providerRouter.get("/total", verifyToken, async (request, response) => {
	try {
		const totalProviders = await Provider.countDocuments();
		response.json({ totalProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.get("/", verifyToken, (request, response) => {

	Provider.find({}).populate("user", { email: 1, name: 1, phone: 1 }).then(provider => {
		response.json(provider);
	});
});

providerRouter.get("/total", verifyToken, async (request, response) => {
	try {
		const totalProviders = await Provider.countDocuments();
		response.json({ totalProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.get("/state", verifyToken, async (request, response) => {
	try {
		const stateProviders = await Provider.countDocuments({ "license": { $regex: request.query.state.toUpperCase() } });
		response.json({ stateProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.post("/", verifyToken, async (request, response) => {

	const body = request.body;

	try {
		// when you create a new provider,
		// you must also create a new user

		const savedUser = await createUser({ ...body, password: body.password });

		const provider = new Provider({
			user: savedUser._id,
			license: body.license
		});
		const { error, value } = schema.validate(provider);
		const savedProvider = await provider.save();

		response.status(201).json(savedProvider);
	}
	catch (error) {
		console.log(error);
		response.status(500).json({ error: "Internal server error" });
	}

});

module.exports = providerRouter;