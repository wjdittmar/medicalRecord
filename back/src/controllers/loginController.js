const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const Provider = require("../models/provider/provider");
const { generateAccessToken } = require("./authController");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);
		if (!(user && passwordCorrect)) {
			loggerService.logError({ email }, "Incorrect login attempt");
			return res.status(401).json({
				message: "Invalid username or password"
			});
		}
		let provider = null;
		if (user.role === "provider") {
			// Fetch provider details if the user is a provider
			provider = await Provider.findOne({ user: user._id });
		}

		const userForToken = {
			email: user.email,
			id: user._id,
			role: user.role,
			name: user.name,
			provider: provider ? {
				id: provider._id
			} : null
		};



		loggerService.logInfo(userForToken, `User from ${req.get("Referrer")} logged in successfully`);

		const accessToken = generateAccessToken(userForToken);

		res.status(200).json({ accessToken });
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = {
	login
};
