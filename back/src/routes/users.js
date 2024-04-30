const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../../utils/middleware");

// for creating a new user

usersRouter.post("/", verifyToken, async (request, response) => {
	const { email, name, password } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const user = new User({
		email,
		name,
		passwordHash,
	});

	try {
		const savedUser = await user.save();

		response.status(201).json(savedUser);
	}
	catch (exception) {
		console.log(exception);
		response.status(400).json({ error: "duplicate email" });
	}
});

usersRouter.get("/", verifyToken, async (request, response) => {
	const users = await User.find({});
	response.json(users);


});

module.exports = usersRouter;