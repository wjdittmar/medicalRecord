const User = require("../models/user/user");

const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");
const { createProviderHelper } = require("./providerController");

// Handler for user registration
const registerUser = async (request, response) => {
	try {
		const savedProvider = await createProviderHelper({ ...request.body, license: "" });
		loggerService.logInfo("Created new provider", { email: savedProvider.email, name: savedProvider.name });
		response.status(201).json(savedProvider);
	} catch (error) {
		handleError(response, error);
	}
};

// Handler for getting all users
const getAllUsers = async (request, response) => {
	try {
		const users = await User.find({});
		response.json(users);
	} catch (error) {
		handleError(response, error);
	}
};

module.exports = {
	registerUser,
	getAllUsers,
};
