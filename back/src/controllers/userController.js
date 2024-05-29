const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const createUserSchema = require("../models/user/createUserSchema");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");

// Create a new user
const createUser = async (userData) => {
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(userData.password, saltRounds);
	const user = new User({
		email: userData.email,
		name: userData.name,
		phone: userData.phone,
		passwordHash: passwordHash,
		role: userData.role,
	});
	return user.save();
};

// Handler for user registration
const registerUser = async (request, response) => {
	const { email, name, password } = request.body;
	// default as a provider for new user creation
	const { value, error } = createUserSchema.validate({ email, name, password, role: "provider" });
	if (error) {
		return handleError(response, error);
	}

	try {
		const savedUser = await createUser(value);
		loggerService.logInfo("Created new user", { email, name });
		response.status(201).json(savedUser);
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
	createUser,
};
