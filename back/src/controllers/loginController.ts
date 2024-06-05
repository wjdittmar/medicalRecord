import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/user/user";
import ProviderModel from "../models/provider/provider";
import { generateAccessToken } from "./authController";
import { logError, logInfo } from "../services/loggerService";
import { UserTokenPayload } from "../../../types/userTokenPayload";
import { Types } from "mongoose";

import handleError from "../utils/errorHandler";

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash);
		if (!user || !passwordCorrect) {
			logError("Incorrect login attempt", { email });
			res.status(401).json({
				message: "Invalid username or password"
			});
			return;
		}

		let provider = null;
		if (user.role === "provider") {
			// Fetch provider details if the user is a provider
			provider = await ProviderModel.findOne({ user: user._id });
		}

		const userForToken: UserTokenPayload = {
			email: user.email,
			id: user._id as Types.ObjectId, // cast it explciity because we know that user will be defined here and that it will contain the _id field
			role: user.role,
			name: user.name,
			provider: provider ? { id: provider._id } : null,
		};

		logInfo(`User from ${req.get("Referrer")} logged in successfully`, userForToken);

		const accessToken = generateAccessToken(userForToken);

		res.status(200).json({ accessToken });
	} catch (error) {
		handleError(res, error);
	}
};

export { login };
