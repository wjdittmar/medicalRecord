import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/user/user";
import userSchema from "../models/user/userSchema";
import { logInfo } from "../services/loggerService";
import handleError from "../utils/errorHandler";
import { User } from "../../../types/user";

// Create a new user
const createUser = async (userData: Omit<User, "passwordHash"> & { password: string }) => {
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(userData.password, saltRounds);
	const user = new UserModel({
		email: userData.email,
		name: userData.name,
		phone: userData.phone,
		passwordHash: passwordHash,
		role: userData.role,
	});
	return user.save();
};

// Handler for user registration
const registerUser = async (request: Request, response: Response) => {
	const { email, name, password } = request.body;

	// default as a provider for new user creation
	const { value, error } = userSchema.validate({ email, name, password, role: "provider" });
	if (error) {
		return handleError(response, error);
	}

	try {
		const savedUser = await createUser(value);
		logInfo("Created new user", { email, name });
		response.status(201).json(savedUser);
	} catch (error) {
		handleError(response, error);
	}
};

// Handler for getting all users
const getAllUsers = async (request: Request, response: Response) => {
	try {
		const users = await UserModel.find({});
		response.json(users);
	} catch (error) {
		handleError(response, error);
	}
};

export {
	registerUser,
	getAllUsers,
	createUser,
};
