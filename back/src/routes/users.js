const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// for creating a new user

usersRouter.post("/", async (request, response) => {
	const { email, name, password } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	console.log(passwordHash);
	const user = new User({
		email,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
	const users = await User.find({});
	response.json(users);


});

module.exports = usersRouter;