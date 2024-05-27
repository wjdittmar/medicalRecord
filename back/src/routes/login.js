const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

const loggerService = require("../services/loggerService");

loginRouter.post("/", async (request, response) => {

	try {
		const { email, password } = request.body;

		const user = await User.findOne({ email });

		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);
		if (!(user && passwordCorrect)) {
			loggerService.logError({ email }, "Incorrect login attempt");
			return response.status(401).json({
				message: "Invalid username or password"
			});
		}


		const userForToken = {
			email: user.email,
			id: user._id,
			role: user.role,
			name: user.name
		};

		loggerService.logInfo(userForToken, `User from ${request.get("Referrer")} logged in successfully`);

		const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: "1h" });

		response
			.status(200)
			.send(token);
	}
	catch (error) {
		loggerService.logError(error);
		response.status(500).json({ error: error.message });
	}
});

module.exports = loginRouter;