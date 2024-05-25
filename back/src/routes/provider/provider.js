const providerRouter = require("express").Router();

const Provider = require("../../models/provider");
const User = require("../../models/user");
const schema = require("./providerSchema");
const { verifyTokenAndRole } = require("../../utils/middleware");
const { createUser } = require("../users");

providerRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	try {
		const totalProviders = await Provider.countDocuments();
		response.json({ totalProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.get("/", verifyTokenAndRole(["admin", "provider"]), (request, response) => {

	Provider.find({}).populate("user", { email: 1, name: 1, phone: 1 }).then(provider => {
		response.json(provider);
	});
});

providerRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	try {
		const totalProviders = await Provider.countDocuments();
		response.json({ totalProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.get("/state", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	try {
		const stateProviders = await Provider.countDocuments({ "license": { $regex: request.query.state.toUpperCase() } });
		response.json({ stateProviders });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

providerRouter.post("/", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {

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

providerRouter.put("/:id", verifyTokenAndRole(["admin", "provider"]), async (request, response) => {
	const id = request.params.id;
	const body = request.body;

	try {
		// Find the provider by id
		const provider = await Provider.findById(id);
		if (!provider) {
			return response.status(404).json({ error: "Provider not found" });
		}

		// Update the user associated with the provider
		const updatedUser = await User.findByIdAndUpdate(
			provider.user,
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

		// Update the provider's license
		provider.license = body.license;

		const updatedProvider = await provider.save();

		response.status(200).json(updatedProvider);
	} catch (error) {
		console.log(error);
		response.status(500).json({ error: "Internal server error" });
	}
});


module.exports = providerRouter;