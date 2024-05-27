const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { verifyToken } = require("../utils/middleware");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");

// for creating a new user

const createUser = async (userData) => {
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(userData.password, saltRounds);
	const user = new User({
		email: userData.email,
		name: userData.name,
		phone: userData.phone,
		passwordHash: passwordHash,
		role: userData.role
	});
	return user.save();
};

// don't need to be logged-in in order to register as a new user

userRouter.post("/", async (request, response) => {
	const { email, name, password } = request.body;
	try {
		// default as a provider for new user creation
		const savedUser = await createUser({ email, name, password, role: "provider" });
		loggerService.logInfo("Created new visit", { email, name });
		response.status(201).json(savedUser);
	}
	catch (error) {
		handleError(response, error);
	}
});

userRouter.get("/", verifyToken, async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

module.exports = { userRouter, createUser };