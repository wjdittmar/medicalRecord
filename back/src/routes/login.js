const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {

	try {
		const { email, password } = request.body;

		const user = await User.findOne({ email });
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);

		if (!(user && passwordCorrect)) {
			return response.status(401).json({
				error: "invalid username or password"
			});
		}

		const userForToken = {
			email: user.email,
			id: user._id,
		};

		const token = jwt.sign(userForToken, process.env.SECRET);

		response
			.status(200)
			.send({ token, email: user.email, name: user.name, id: user._id });
	}
	catch (error) {
		response.status(500).json({ error: error.message });
	}
});

module.exports = loginRouter;