const Provider = require("../models/provider/provider");
const User = require("../models/user/user");
const { createUser } = require("./utils/userUtils");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");

// Get total number of providers
const getTotalProviders = async (request, response) => {
	try {
		const totalProviders = await Provider.countDocuments();
		response.json({ totalProviders });
	} catch (error) {
		handleError(response, error);
	}
};

// Get all providers
const getAllProviders = async (request, response) => {
	try {
		const providers = await Provider.find({})
			.populate("user", { email: 1, name: 1, phone: 1 });
		response.json(providers);
	} catch (error) {
		handleError(response, error);
	}
};

// Get total providers by state
const getProvidersByState = async (request, response) => {
	try {
		const stateProviders = await Provider.countDocuments({ "license": { $regex: request.query.state.toUpperCase() } });
		response.json({ stateProviders });
	} catch (error) {
		handleError(response, error);
	}
};

const createProviderHelper = async (body) => {
	const savedUser = await createUser({ ...body, role: "provider" });

	const provider = new Provider({
		user: savedUser._id,
		license: body.license,
	});

	const savedProvider = await provider.save();

	return {
		...savedProvider._doc,
		user: {
			...savedProvider.user,
			password: undefined,
		},
	};
};

const createProvider = async (request, response) => {
	const body = request.body;

	try {
		const savedProvider = await createProviderHelper(body);
		loggerService.logInfo("Created new provider", savedProvider);
		response.status(201).json(savedProvider);
	} catch (error) {
		handleError(response, error);
	}
};
// Update a provider
const updateProvider = async (request, response) => {
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
		handleError(response, error);
	}
};


module.exports = {
	getTotalProviders,
	getAllProviders,
	getProvidersByState,
	createProvider,
	updateProvider,
	createProviderHelper
};
